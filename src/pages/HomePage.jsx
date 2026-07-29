import { useState, useEffect } from 'react'
import { db } from '../lib/turso'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import SearchBar from '../components/home/SearchBar'
import CategoryFilter from '../components/home/CategoryFilter'
import ArticleGrid from '../components/home/ArticleGrid'

export default function HomePage() {
  const [artigos, setArtigos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    try {
      const result = await db.execute(
        'SELECT * FROM articles WHERE published = 1 ORDER BY created_at DESC'
      )
      setArtigos(result.rows)
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categorias = [...new Set(artigos.map((a) => a.category))].filter(Boolean).sort()

  const featuredArticle = artigos[0] || null

  const filteredArtigos = artigos
    .filter((artigo) => {
      const matchesSearch =
        !searchTerm ||
        artigo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !activeCategory || artigo.category === activeCategory

      return matchesSearch && matchesCategory
    })
    .slice(0, 7)

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-brand-gray font-body text-sm">Carregando...</p>
            </div>
          </div>
        ) : artigos.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <img src="/nova_logo_skateset.ico" alt="SkateSet" className="w-48 h-48 mx-auto mb-4" />
              <div className="editorial-divider mx-auto mb-6"></div>
              <p className="text-brand-gray font-body text-lg mb-2">
                Blog de skate, cultura e história.
              </p>
              <p className="text-brand-gray-light font-body text-sm">
                Nenhum artigo publicado ainda. Volte em breve!
              </p>
            </div>
          </div>
        ) : (
          <>
            <Hero article={featuredArticle} />

            <section className="max-w-6xl mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-display text-3xl text-brand-black">
                    {activeCategory ? activeCategory.toUpperCase() : 'ÚLTIMAS PUBLICAÇÕES'}
                  </h2>
                  <p className="text-brand-gray font-body text-sm mt-1">
                    {filteredArtigos.length} {filteredArtigos.length === 1 ? 'artigo' : 'artigos'}
                    {activeCategory ? ` nesta categoria` : ' publicados'}
                  </p>
                </div>
                <SearchBar onSearch={setSearchTerm} />
              </div>

              <div className="mb-8">
                <CategoryFilter
                  categorias={categorias}
                  active={activeCategory}
                  onSelect={setActiveCategory}
                />
              </div>

              <ArticleGrid artigos={filteredArtigos} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
