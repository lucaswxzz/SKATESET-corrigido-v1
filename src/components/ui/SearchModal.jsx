import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { GUIDES } from '../../data/guides'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const results = query.trim().length > 1
    ? GUIDES.filter(g =>
        g.title.toLowerCase().includes(query.toLowerCase()) ||
        g.description.toLowerCase().includes(query.toLowerCase()) ||
        g.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (!isOpen) return null

  const levelLabel = { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' }
  const levelClass = { beginner: 'badge-beginner', intermediate: 'badge-intermediate', advanced: 'badge-advanced' }

  return (
    <div
      className="fixed inset-0 z-[100] bg-brand-black/80  flex items-start justify-center pt-20 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-brand-black border-2 border-brand-black overflow-hidden animate-slide-up shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-brand-black">
          <Search size={20} className="text-brand-gray flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar guias, peças, técnicas..."
            className="flex-1 bg-transparent text-white placeholder-brand-gray text-sm focus:outline-none"
          />
          <button onClick={onClose} className="text-brand-gray hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length > 1 && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-brand-gray text-sm">Nenhum guia encontrado para "{query}"</p>
              <p className="text-brand-gray/50 text-xs mt-1">Tente termos como "trucks", "street", "iniciante"</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-brand-black">
              {results.map((guide) => (
                <li key={guide.id}>
                  <a href={`/guias/${guide.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-4 hover:bg-brand-black-soft transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium group-hover:text-brand-red transition-colors truncate">
                        {guide.title}
                      </p>
                      <p className="text-brand-gray text-xs mt-0.5 truncate">{guide.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className={levelClass[guide.level]}>{levelLabel[guide.level]}</span>
                      <ArrowRight size={14} className="text-brand-gray group-hover:text-brand-red transition-colors" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length <= 1 && (
            <div className="px-5 py-6">
              <p className="text-brand-gray text-xs uppercase tracking-wider mb-3">Sugestões</p>
              <div className="flex flex-wrap gap-2">
                {['Trucks', 'Rodas', 'Street', 'Cruiser', 'Iniciante', 'Rolamentos', 'Manutenção'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-brand-black-soft border-2 border-brand-black text-xs text-brand-gray hover:text-brand-red hover:border-brand-red/30 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
