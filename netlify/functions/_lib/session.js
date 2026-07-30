// netlify/functions/_lib/session.js
//
// Sessão assinada: em vez de confiar num "crachá" que o próprio navegador
// inventa (era assim antes: crypto.randomUUID() sem verificação nenhuma),
// o servidor agora emite um token assinado com HMAC-SHA256 usando um
// segredo (SESSION_SECRET) que só existe nas Environment Variables da
// Netlify. Qualquer tentativa de forjar {role: 'admin'} no token é
// detectada, porque a assinatura não vai bater.

import { createHmac, timingSafeEqual, randomBytes, pbkdf2Sync } from 'crypto'

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24h, igual ao front-end antigo

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET não configurado nas Environment Variables da Netlify.')
  }
  return secret
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64url')
}

export function createSessionToken({ uid, role }) {
  const payload = { uid, role, exp: Date.now() + SESSION_DURATION_MS }
  const payloadB64 = b64url(JSON.stringify(payload))
  const sig = createHmac('sha256', getSecret()).update(payloadB64).digest('base64url')
  return `${payloadB64}.${sig}`
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return null

  const expectedSig = createHmac('sha256', getSecret()).update(payloadB64).digest('base64url')

  const a = Buffer.from(sig)
  const b = Buffer.from(expectedSig)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'))
    if (!payload.exp || Date.now() > payload.exp) return null
    return payload // { uid, role, exp }
  } catch {
    return null
  }
}

// Mesmo esquema de hash que o código antigo usava no navegador (PBKDF2,
// 100000 iterações, SHA-256, salt usado como texto) — reproduzido aqui
// no servidor pra manter compatibilidade com as senhas já cadastradas.
export function hashPassword(password, existingSalt) {
  const salt = existingSalt || randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex')
  return { hash, salt }
}

export function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt)
  const a = Buffer.from(hash)
  const b = Buffer.from(expectedHash)
  return a.length === b.length && timingSafeEqual(a, b)
}
