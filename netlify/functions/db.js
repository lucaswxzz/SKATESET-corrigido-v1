// netlify/functions/db.js
//
// Em vez de o navegador se conectar direto no Turso (o que expunha o
// token de banco no JavaScript público), toda consulta passa por aqui.
// Só rodam as consultas que o site realmente usa (lista fechada abaixo)
// — nada arbitrário. Consultas de escrita ou que tocam dados de um
// usuário exigem uma sessão válida (assinada pelo servidor, não confiada
// pelo navegador) e, quando aplicável, que a sessão seja "dona" daquele
// registro ou seja admin.

import { getTursoClient, ensureTables } from './_lib/turso.js'
import { verifySessionToken } from './_lib/session.js'

function norm(sql) {
  return sql.replace(/\s+/g, ' ').trim().toLowerCase()
}

// policy: 'public' | 'admin' | { own: <índice do arg que deve ser o uid da sessão> }
const ALLOWLIST = [
  // --- Artigos: leitura pública ---
  { match: s => s === 'select * from articles where published = 1 order by created_at desc', policy: 'public' },
  { match: s => s === 'select * from articles where id = ?', policy: 'public' },

  // --- Artigos: admin ---
  { match: s => s === 'select * from articles order by created_at desc', policy: 'admin' },
  { match: s => /^insert into articles \(id, title, slug, excerpt, category, tags, image_url, content, meta_description, keywords, author_id, published\)/.test(s), policy: 'admin' },
  { match: s => /^update articles set title = \?, slug = \?, excerpt = \?/.test(s), policy: 'admin' },
  { match: s => s === 'update articles set published = ? where id = ?', policy: 'admin' },
  { match: s => s === 'delete from articles where id = ?', policy: 'admin' },

  // --- Comentários: leitura pública (só colunas públicas de users via JOIN) ---
  { match: s => /^select c\.\*, u\.name as user_name, u\.role as user_role, u\.avatar_url as user_avatar,\s*\(select count\(\*\) from comments where parent_id = c\.id\) as reply_count/.test(s), policy: 'public' },
  { match: s => /^select c\.\*, u\.name as user_name, u\.role as user_role, u\.avatar_url as user_avatar\s*from comments c/.test(s), policy: 'public' },

  // --- Comentários: escrita (usuário logado, dono do comentário) ---
  { match: s => s === 'insert into comments (id, article_id, user_id, content) values (?, ?, ?, ?)', policy: { own: 2 } },
  { match: s => s === 'insert into comments (id, article_id, user_id, content, parent_id) values (?, ?, ?, ?, ?)', policy: { own: 2 } },
  { match: s => s === 'delete from comments where id = ? and user_id = ?', policy: { own: 1 } },
  // Exclusão de comentário/respostas por admin (moderação)
  { match: s => s === 'delete from comments where parent_id = ?', policy: 'admin' },
  { match: s => s === 'delete from comments where id = ?', policy: 'admin' },
  { match: s => s === 'delete from comments where user_id = ?', policy: { own: 0 } },

  // --- Usuário: só o próprio dado ---
  { match: s => s === 'select * from users where id = ?', policy: { own: 0 } },
  { match: s => s === 'select count(*) as count from articles where author_id = ?', policy: { own: 0 } },
  { match: s => s === 'select count(*) as count from comments where user_id = ?', policy: { own: 0 } },
  { match: s => /^update users set name = \?, avatar_url = \?, bio = \? where id = \?/.test(s), policy: { own: 3 } },
  { match: s => s === 'delete from users where id = ?', policy: { own: 0 } },
  { match: s => s === 'select two_factor_enabled from users where id = ?', policy: { own: 0 } },
  { match: s => /^update users set two_factor_secret = \?, two_factor_enabled = 1, backup_codes = \? where id = \?/.test(s), policy: { own: 2 } },
  { match: s => s === 'update users set backup_codes = ? where id = ?', policy: { own: 1 } },
]

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), { status: 405 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 })
  }

  const { sql, args, token } = body
  if (!sql || typeof sql !== 'string') {
    return new Response(JSON.stringify({ error: 'Consulta ausente' }), { status: 400 })
  }

  const normalized = norm(sql)
  const rule = ALLOWLIST.find(r => r.match(normalized))

  if (!rule) {
    console.warn('[db function] Consulta bloqueada (fora da allowlist):', normalized.slice(0, 120))
    return new Response(JSON.stringify({ error: 'Consulta não permitida' }), { status: 403 })
  }

  let session
  try {
    session = verifySessionToken(token)
  } catch (err) {
    console.error('[db function] erro ao verificar sessão:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', debug: err.message }), { status: 500 })
  }

  if (rule.policy === 'admin') {
    if (!session || session.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Acesso restrito a administradores' }), { status: 403 })
    }
  } else if (typeof rule.policy === 'object' && rule.policy !== null) {
    const argIndex = rule.policy.own
    const ownerId = Array.isArray(args) ? args[argIndex] : undefined
    const isAdmin = session && session.role === 'admin'
    const isOwner = session && ownerId !== undefined && session.uid === ownerId
    if (!isOwner && !isAdmin) {
      return new Response(JSON.stringify({ error: 'Acesso negado' }), { status: 403 })
    }
  }
  // policy === 'public' → sempre permitido

  try {
    await ensureTables()
    const client = getTursoClient()
    const result = await client.execute({ sql, args: args || [] })
    return new Response(
      JSON.stringify({
        rows: result.rows || [],
        columns: result.columns || [],
        rowsAffected: result.rowsAffected || 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('[db function] erro ao executar consulta:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', debug: err.message }), { status: 500 })
  }
}

export const config = {
  path: '/api/db',
}
