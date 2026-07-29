import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight, BookOpen, Newspaper } from 'lucide-react'
import { GUIDES } from '../../data/guides'
import { BLOG_POSTS } from '../../data/blog'

export default function GlobalSearchBar({ variant = 'default', placeholder = 'Buscar guias, manobras, setups, artigos...' }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const term = q.trim().toLowerCase()
  const guideHits = term ? GUIDES.filter(g =>
    g.title.toLowerCase().includes(term) ||
    g.description?.toLowerCase().includes(term) ||
    g.category?.toLowerCase().includes(term) ||
    g.style?.toLowerCase().includes(term)
  ).slice(0, 5) : []
  const blogHits = term ? BLOG_POSTS.filter(p =>
    p.title.toLowerCase().includes(term) || p.excerpt?.toLowerCase().includes(term)
  ).slice(0, 4) : []

  const isHero = variant === 'hero'

  function onSubmit(e) {
    e.preventDefault()
    if (term) window.location.href = `/guias?q=${encodeURIComponent(q)}`
  }

  return (
    <div ref={ref} className={`relative w-full ${isHero ? 'max-w-2xl mx-auto' : 'max-w-xl'}`} data-testid="global-search-wrapper">
      <form onSubmit={onSubmit} className="relative">
        <Search size={isHero ? 22 : 18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" />
        <input
          data-testid="global-search-input"
          type="text"
          value={q}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          placeholder={placeholder}
          className={`w-full bg-white border-2 border-brand-black pl-12 pr-28 ${isHero ? 'py-5 text-base md:text-lg' : 'py-3 text-sm'} text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-red transition-all`}
        />
        {q && (
          <button type="button" onClick={() => { setQ(''); setOpen(false) }} className="absolute right-24 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-black" aria-label="Limpar">
            <X size={16} />
          </button>
        )}
        <button type="submit" data-testid="global-search-submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs uppercase tracking-wider px-4 py-2 transition-colors flex items-center gap-1.5 border-2 border-brand-black">
          Buscar <ArrowRight size={13} />
        </button>
      </form>

      {open && term && (guideHits.length > 0 || blogHits.length > 0) && (
        <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-brand-black shadow-2xl max-h-96 overflow-y-auto z-[60]" data-testid="global-search-results">
          {guideHits.length > 0 && (
            <div className="p-3">
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-red px-2 mb-2 flex items-center gap-1.5"><BookOpen size={11} /> Guias</p>
              {guideHits.map(g => (
                <a key={g.id} href={`/guias/${g.slug}`} className="flex items-center gap-3 px-2 py-2 hover:bg-brand-beige transition-colors group">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${g.level === 'beginner' ? 'bg-brand-red' : g.level === 'intermediate' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                  <span className="flex-1 text-sm text-brand-black group-hover:text-brand-red transition-colors truncate">{g.title}</span>
                  <span className="text-[10px] font-mono uppercase text-brand-gray">{g.category}</span>
                </a>
              ))}
            </div>
          )}
          {blogHits.length > 0 && (
            <div className="p-3 border-t border-brand-black/20">
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-red px-2 mb-2 flex items-center gap-1.5"><Newspaper size={11} /> Blog</p>
              {blogHits.map(p => (
                <a key={p.id} href={`/blog/${p.id}`} className="flex items-center gap-3 px-2 py-2 hover:bg-brand-beige transition-colors group">
                  <span className="flex-1 text-sm text-brand-black group-hover:text-brand-red transition-colors truncate">{p.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
