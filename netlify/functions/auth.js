// netlify/functions/auth.js
//
// Login e cadastro passam a acontecer inteiramente no servidor.
// Antes, o navegador buscava a senha com hash direto do banco e
// comparava ali mesmo — o que significa que, com o token do Turso
// exposto (como estava até agora), qualquer pessoa podia ler o hash
// de senha de qualquer usuário. Agora o navegador nunca vê hash,
// salt nem token de banco nenhum: só manda email/senha e recebe de
// volta um usuário + uma sessão assinada.

import { randomUUID } from 'crypto'
import { getTursoClient, ensureTables } from './_lib/turso.js'
import { hashPassword, verifyPassword, createSessionToken } from './_lib/session.js'

function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    avatar_url: row.avatar_url,
    bio: row.bio,
    created_at: row.created_at,
  }
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Método não permitido' }), { status: 405 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'JSON inválido' }), { status: 400 })
  }

  const { action } = body

  try {
    await ensureTables()
    const client = getTursoClient()

    if (action === 'login') {
      const email = String(body.email || '').toLowerCase().trim()
      const password = String(body.password || '')

      const result = await client.execute({
        sql: 'SELECT * FROM users WHERE email = ?',
        args: [email],
      })

      if (result.rows.length === 0 || !verifyPassword(password, result.rows[0].password_salt, result.rows[0].password_hash)) {
        return new Response(JSON.stringify({ success: false, error: 'Email ou senha incorretos' }), { status: 401 })
      }

      const user = result.rows[0]
      const token = createSessionToken({ uid: user.id, role: user.role })

      return new Response(JSON.stringify({ success: true, user: publicUser(user), token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'signup') {
      const email = String(body.email || '').toLowerCase().trim()
      const password = String(body.password || '')
      const name = String(body.name || '').trim()

      if (!email || !password || !name) {
        return new Response(JSON.stringify({ success: false, error: 'Campos obrigatórios' }), { status: 400 })
      }
      if (password.length < 8) {
        return new Response(JSON.stringify({ success: false, error: 'Senha deve ter 8+ caracteres' }), { status: 400 })
      }

      const existing = await client.execute({
        sql: 'SELECT id FROM users WHERE email = ?',
        args: [email],
      })
      if (existing.rows.length > 0) {
        return new Response(JSON.stringify({ success: false, error: 'Email já cadastrado' }), { status: 409 })
      }

      const id = randomUUID()
      const { hash, salt } = hashPassword(password)

      await client.execute({
        sql: 'INSERT INTO users (id, email, name, password_hash, password_salt) VALUES (?, ?, ?, ?, ?)',
        args: [id, email, name, hash, salt],
      })

      const token = createSessionToken({ uid: id, role: 'user' })

      return new Response(
        JSON.stringify({ success: true, user: { id, email, name, role: 'user' }, token }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ success: false, error: 'Ação desconhecida' }), { status: 400 })
  } catch (err) {
    console.error('[auth function] erro:', err)
    return new Response(JSON.stringify({ success: false, error: 'Erro interno' }), { status: 500 })
  }
}

export const config = {
  path: '/api/auth',
}
