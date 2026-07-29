import { groqGenerate } from './api'

export async function generateArticle(idea) {
  const prompt = `Você é um escritor profissional de blog especializado em skate.
Gere um artigo COMPLETO baseado na ideia: "${idea}"

Retorne APENAS um JSON válido:
{
  "title": "Título chamativo com palavra-chave",
  "slug": "titulo-em-snake-case",
  "excerpt": "Resumo para SEO (máx 150 chars)",
  "category": "Manobras|Cultura|Equipamento|Perfis|História|Dicas",
  "tags": "tag1, tag2, tag3, tag4, tag5",
  "image_url": "URL do PIXABAY (https://cdn.pixabay.com/photo/...)",
  "content": "Artigo completo em HTML, MÍNIMO 1000 palavras, tom informal",
  "meta_description": "Meta description SEO (máx 160 chars)",
  "keywords": "palavra-chave-1, palavra-chave-2, palavra-chave-3"
}

REGRAS: PRIORIZE PIXABAY, imagem sobre SKATE, JSON válido`

  const result = await groqGenerate(prompt)
  if (!result.success) throw new Error(result.error)

  let cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (match) cleaned = match[0]

  // Sanitiza JSON: substitui novas linhas literais por espaço (HTML já usa <p>/<br>)
  // e remove caracteres de controle inválidos em strings JSON
  cleaned = cleaned
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .replace(/  +/g, ' ')

  return JSON.parse(cleaned)
}
