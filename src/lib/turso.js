// src/lib/turso.js
//
// O navegador NUNCA mais se conecta direto no Turso. Toda consulta passa
// pela Netlify Function /api/db, que valida a consulta contra uma lista
// permitida e confere a sessão antes de executar. Isso mantém a mesma
// interface db.execute(...) usada em todo o resto do app — nada mais
// precisou mudar nos componentes.

const SESSION_KEY = 'skateset_session'

function getSessionToken() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    return session.token || null
  } catch {
    return null
  }
}

export const db = {
  async execute(query) {
    const { sql, args } = typeof query === 'string' ? { sql: query, args: [] } : query

    const response = await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql, args, token: getSessionToken() }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao acessar o banco de dados')
    }

    return { rows: data.rows || [], columns: data.columns || [], rowsAffected: data.rowsAffected || 0 }
  },
}

// As tabelas agora são garantidas pelo servidor (netlify/functions/_lib/turso.js)
// na primeira chamada de function — não precisa mais rodar nada no navegador.
export async function initDatabase() {
  return { success: true }
}
