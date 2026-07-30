// netlify/functions/_lib/turso.js
//
// Cliente Turso que roda SÓ no servidor (dentro das Netlify Functions).
// As variáveis TURSO_URL / TURSO_AUTH_TOKEN (sem prefixo VITE_) nunca
// são embutidas no JavaScript público do site — só existem aqui.

import { createClient } from '@libsql/client'

let _client = null

export function getTursoClient() {
  if (_client) return _client

  const url = process.env.TURSO_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    throw new Error('TURSO_URL / TURSO_AUTH_TOKEN não configurados nas Environment Variables da Netlify.')
  }

  _client = createClient({ url, authToken })
  return _client
}

let _initialized = false

export async function ensureTables() {
  if (_initialized) return
  const client = getTursoClient()

  await client.execute(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
    password_hash TEXT NOT NULL, password_salt TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar_url TEXT, bio TEXT, two_factor_secret TEXT,
    two_factor_enabled INTEGER DEFAULT 0, backup_codes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  await client.execute(`CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL,
    content TEXT, excerpt TEXT, category TEXT, tags TEXT DEFAULT '[]',
    image_url TEXT, meta_description TEXT, keywords TEXT, author_id TEXT,
    published INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
  )`)

  await client.execute(`CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY, article_id TEXT NOT NULL, user_id TEXT NOT NULL,
    content TEXT NOT NULL, parent_id TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES comments(id)
  )`)

  _initialized = true
}
