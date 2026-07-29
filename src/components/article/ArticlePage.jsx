import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../../lib/turso'
import { sanitizeHTML } from '../../lib/security'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProxiedImage from '../ui/ProxiedImage'
import ShareModal from '../ui/ShareModal'
import CommentSection from './CommentSection'
import { ArrowLeft, Calendar, Tag, Clock, Share2, ChevronUp } from 'lucide-react'

export default function ArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    loadArticle()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  function handleScroll() {
    setShowScrollTop(window.scrollY > 500)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function loadArticle() {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM articles WHERE id = ?',
        args: [id]
      })
      if (result.rows.length > 0) {
        setArticle(result.rows[0])
      }
    } catch (error) {
      console.error('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  function estimateReadingTime(content) {
    if (!content) return '3 min'
    const text = content.replace(/<[^>]*>/g, '')
    const words = text.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min`
  }

  function handleShare() {
    setShowShareModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-brand-gray font-mono text-xs tracking-widest">CARREGANDO...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-black">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-8xl text-white mb-4">404</h1>
            <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
            <p className="text-brand-gray-light font-body text-lg mb-8">
              Artigo não encontrado.
            </p>
            <Link
              to="/"
              className="btn-retro bg-brand-red text-white font-display text-lg tracking-wider py-3 px-8 inline-flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
            >
              <ArrowLeft size={18} />
              VOLTAR
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[70vh] flex items-end">
          {/* Background Image */}
          <div className="absolute inset-0">
            {!imageError ? (
              <ProxiedImage
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-black via-brand-black-soft to-brand-black flex items-center justify-center">
                <img src="/favicon.ico" alt="SkateSet" className="w-32 h-32 opacity-20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-16 pt-32">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-gray-light hover:text-brand-red transition-colors mb-8 font-mono text-xs tracking-widest uppercase group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>

            {/* Category Badge */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-brand-red text-white font-display text-sm tracking-widest uppercase">
                {article.category}
              </span>
              <span className="flex items-center gap-2 text-brand-gray-light font-mono text-xs">
                <Calendar size={14} />
                {new Date(article.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 text-brand-gray-light font-mono text-xs">
                <Clock size={14} />
                {estimateReadingTime(article.content)} de leitura
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-white leading-none mb-6 tracking-wide">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-brand-gray-light font-body text-xl max-w-3xl leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Decorative Element */}
            <div className="mt-8 flex items-center gap-2">
              <div className="w-12 h-1 bg-brand-red"></div>
              <div className="w-3 h-1 bg-brand-red"></div>
              <div className="w-1 h-1 bg-brand-red"></div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-brand-cream relative">
          {/* Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red"></div>

          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article
                  className="prose prose-lg max-w-none font-body text-brand-black
                    [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-brand-black [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:tracking-wider [&_h2]:relative [&_h2]:pl-6 [&_h2]:before:content-[''] [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-1 [&_h2]:before:w-1 [&_h2]:before:h-full [&_h2]:before:bg-brand-red
                    [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-brand-black [&_h3]:mt-8 [&_h3]:mb-4
                    [&_p]:leading-[1.9] [&_p]:mb-6 [&_p]:text-brand-black-soft [&_p]:text-base
                    [&_strong]:font-bold [&_strong]:text-brand-black [&_strong]:border-b-2 [&_strong]:border-brand-red [&_strong]:pb-0.5
                    [&_em]:italic [&_em]:text-brand-gray
                    [&_ul]:list-none [&_ul]:ml-0 [&_ul]:mb-8 [&_ul]:space-y-4
                    [&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:before:content-['→'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-brand-red [&_ul>li]:before:font-bold
                    [&_ol]:ml-6 [&_ol]:mb-8 [&_ol]:space-y-4 [&_ol]:list-decimal [&_ol]:marker:text-brand-red [&_ol]:marker:font-display
                    [&_li]:text-brand-black-soft [&_li]:leading-relaxed
                    [&_blockquote]:border-l-4 [&_blockquote]:border-brand-red [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-brand-gray [&_blockquote]:bg-white [&_blockquote]:py-4 [&_blockquote]:my-8 [&_blockquote]:pr-4
                    [&_a]:text-brand-red [&_a]:underline [&_a]:decoration-2 [&_a]:hover:text-brand-red-dark [&_a]:transition-colors
                    [&_img]:w-full [&_img]:border-2 [&_img]:border-brand-black [&_img]:my-10 [&_img]:hover:border-brand-red [&_img]:transition-colors
                    [&_pre]:bg-brand-black [&_pre]:text-white [&_pre]:p-6 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:border-2 [&_pre]:border-brand-black
                    [&_code]:font-mono [&_code]:text-sm [&_code]:bg-brand-black/5 [&_code]:px-2 [&_code]:py-1"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(article.content || '') }}
                />

                {/* Tags Section */}
                {article.tags && (
                  <div className="mt-12 pt-8 border-t-2 border-brand-black/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag size={16} className="text-brand-red" />
                      <span className="font-display text-sm text-brand-black tracking-wider">TAGS</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.split(',').map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white border-2 border-brand-black font-mono text-xs text-brand-black hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Section */}
                <div className="mt-16 pt-8 border-t-2 border-brand-black">
                  <div className="flex items-center gap-6">
                    <Link to="/" className="shrink-0">
                      <img
                        src="/favicon.ico"
                        alt="SkateSet"
                        className="w-20 h-20 border-2 border-brand-black hover:border-brand-red transition-colors"
                      />
                    </Link>
                    <div>
                      <Link to="/" className="font-display text-2xl text-brand-black tracking-wider hover:text-brand-red transition-colors">
                        SKATESET
                      </Link>
                      <p className="font-body text-sm text-brand-gray mt-1">
                        Blog de skate, cultura e história. Artigos aprofundados sobre o mundo do skateboarding.
                      </p>
                      <Link
                        to="/"
                        className="inline-block mt-3 font-mono text-xs text-brand-red hover:text-brand-red-dark tracking-widest uppercase"
                      >
                        Ver mais artigos →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-brand-gray hover:text-brand-red transition-colors font-mono text-sm"
                  >
                    <ArrowLeft size={16} />
                    Voltar para Home
                  </Link>
                </div>

                {/* Comments Section */}
                <CommentSection articleId={article.id} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents (simplified) */}
                  <div className="bg-white border-2 border-brand-black p-6">
                    <h3 className="font-display text-sm text-brand-black tracking-wider mb-4 flex items-center gap-2">
                      NESTE ARTIGO
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-red"></div>
                        <span className="font-body text-xs text-brand-gray">Início</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-red"></div>
                        <span className="font-body text-xs text-brand-gray">Conteúdo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-red"></div>
                        <span className="font-body text-xs text-brand-gray">Conclusão</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Newsletter */}
                  <div className="bg-white border-2 border-brand-black p-6">
                    <h3 className="font-display text-xl text-brand-black tracking-wider mb-2">
                      SKATESET
                    </h3>
                    <p className="font-body text-sm text-brand-gray mb-4">
                      Não perca nenhum artigo. Acompanhe o SkateSet.
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Seu email"
                        className="w-full px-4 py-3 bg-brand-cream border-2 border-brand-black text-brand-black placeholder-brand-gray font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                      />
                      <button className="w-full py-3 bg-brand-red text-white border-2 border-brand-black font-display text-sm tracking-wider hover:bg-brand-red-dark transition-colors shadow-[2px_2px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                        INSCREVER-SE
                      </button>
                    </div>
                  </div>

                  {/* Social Share */}
                  <div className="bg-white border-2 border-brand-black p-6">
                    <h3 className="font-display text-sm text-brand-black tracking-wider mb-4">
                      COMPARTILHAR
                    </h3>
                    <button
                      onClick={handleShare}
                      className="w-full py-3 bg-brand-red text-white border-2 border-brand-black font-display text-sm tracking-wider hover:bg-brand-red-dark shadow-[2px_2px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 size={16} />
                      COMPARTILHAR ARTIGO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand-red text-white flex items-center justify-center border-2 border-brand-black shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={article?.title}
        url={window.location.href}
      />
    </div>
  )
}
