// netlify/functions/sitemap.js
//
// Gera o sitemap.xml em tempo real, sempre que alguém (ou o Googlebot)
// acessar /sitemap.xml. Não depende de build nem de deploy: cada artigo
// novo publicado no banco aparece no sitemap na próxima vez que a URL
// for acessada, sem gastar minuto de build da Netlify.
//
// A rota /sitemap.xml é redirecionada pra esta função via netlify.toml.

import { createClient } from '@libsql/client'

const SITE_URL = 'https://www.skateset.com.br'

const STATIC_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/sobre', changefreq: 'monthly', priority: '0.8' },
  { path: '/contato', changefreq: 'monthly', priority: '0.7' },
  { path: '/login', changefreq: 'monthly', priority: '0.5' },
  { path: '/cadastro', changefreq: 'monthly', priority: '0.5' },
  { path: '/termos-de-uso', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacidade', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
]

function xmlEscape(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export default async (request, context) => {
  const today = new Date().toISOString().split('T')[0]
  let articles = []

  const tursoUrl = process.env.VITE_TURSO_URL
  const tursoAuthToken = process.env.VITE_TURSO_AUTH_TOKEN

  if (tursoUrl && tursoAuthToken) {
    try {
      const client = createClient({ url: tursoUrl, authToken: tursoAuthToken })
      const result = await client.execute(
        `SELECT id, updated_at FROM articles WHERE published = 1 ORDER BY updated_at DESC`
      )
      articles = result.rows
      client.close?.()
    } catch (err) {
      console.error('[sitemap function] Erro ao buscar artigos no Turso:', err.message)
    }
  } else {
    console.warn('[sitemap function] VITE_TURSO_URL / VITE_TURSO_AUTH_TOKEN não configurados nas env vars da Netlify.')
  }

  const staticEntries = STATIC_PAGES.map((p) =>
    urlEntry({ loc: `${SITE_URL}${p.path}`, lastmod: today, changefreq: p.changefreq, priority: p.priority })
  )

  const articleEntries = articles.map((a) => {
    const lastmod = a.updated_at ? String(a.updated_at).split(' ')[0].split('T')[0] : today
    return urlEntry({ loc: `${SITE_URL}/artigo/${a.id}`, lastmod, changefreq: 'monthly', priority: '0.9' })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<!-- Gerado dinamicamente por netlify/functions/sitemap.js -->

<!-- Paginas -->
${staticEntries.join('\n\n')}

<!-- Artigos Publicados -->
${articleEntries.join('\n\n')}

</urlset>
`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache de 1h no edge da Netlify: o Google não bate no banco a cada
      // acesso, mas artigos novos aparecem em no máximo 1h sem precisar
      // de nenhum deploy.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const config = {
  path: '/sitemap.xml',
}
