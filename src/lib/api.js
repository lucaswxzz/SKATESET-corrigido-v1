import { db } from './turso'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || ''
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload'

// Database queries — via Netlify Function /api/db (nunca direto no banco)
export async function dbQuery(sql, args = []) {
  return db.execute({ sql, args })
}

// Auth — login e cadastro rodam inteiramente no servidor (netlify/functions/auth.js).
// O navegador nunca vê hash de senha, salt nem token de banco: só manda
// email/senha e recebe de volta o usuário + uma sessão assinada pelo servidor.
async function callAuth(action, payload) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload }),
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Erro de autenticação')
  }
  return data
}

export async function authLogin(email, password) {
  const data = await callAuth('login', { email, password })
  return { success: true, user: data.user, token: data.token }
}

export async function authSignup(email, password, name) {
  const data = await callAuth('signup', { email, password, name })
  return { success: true, user: data.user, token: data.token }
}

export async function authLogout() {
  return { success: true }
}

// Groq AI — chamada direto da API (uso só no painel admin, chave não é segredo crítico de banco)
export async function groqGenerate(prompt) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 8000
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || 'Erro na API de IA')
  }

  const data = await response.json()
  return { success: true, content: data.choices?.[0]?.message?.content || '' }
}

// Image Upload — chamada direto a ImgBB
export async function uploadImage(imageBase64) {
  const formData = new FormData()
  formData.append('image', imageBase64)
  formData.append('key', IMGBB_API_KEY)

  const response = await fetch(IMGBB_API_URL, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error?.message || 'Falha no upload')
  }

  return {
    success: true,
    url: data.data.url,
    delete_url: data.data.delete_url
  }
}
