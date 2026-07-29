import { Clock, ChevronRight, Eye } from 'lucide-react'
import { GUIDES } from '../../data/guides'

const levelLabel = { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' }
const levelColor = { beginner: 'bg-brand-red/10 text-brand-red border-brand-red', intermediate: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', advanced: 'bg-red-500/10 text-red-600 border-red-500/30' }
const defaultImg = 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=600&q=70'

function guideThumb(g) {
  return g.thumbnail || g.referenceImages?.[0]?.url || defaultImg
}

export default function RelatedContent({ currentId, style, level, limit = 4, title = 'Veja também' }) {
  const pool = GUIDES.filter(g => g.id !== currentId)
  // sort: same style first, then same level
  const scored = pool.map(g => ({
    g,
    score: (g.style === style ? 3 : 0) + (g.level === level ? 2 : 0) + (g.category ? 1 : 0)
  })).sort((a, b) => b.score - a.score)
  const related = scored.slice(0, limit).map(s => s.g)

  if (related.length === 0) return null

  return (
    <section data-testid="related-content" className="mt-16 pt-12 border-t-2 border-brand-black">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-brand-red text-xs font-mono uppercase tracking-widest mb-2">Continue sua jornada</p>
          <h2 className="font-display text-3xl md:text-4xl text-brand-black tracking-wider uppercase">{title}</h2>
        </div>
        <a href="/guias" className="hidden sm:inline-flex items-center gap-1.5 text-brand-red text-sm font-semibold hover:gap-2.5 transition-all">
          Ver todos <ChevronRight size={15} />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map(g => (
          <a key={g.id} href={`/guias/${g.slug}`} className="group bg-white border-2 border-brand-black overflow-hidden hover:border-brand-red hover:shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-1 transition-all duration-300 flex flex-col" data-testid={`related-card-${g.id}`}>
            <div className="relative h-36 overflow-hidden bg-brand-beige">
              <img src={guideThumb(g)} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <span className={`absolute top-2.5 left-2.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-brand-black ${levelColor[g.level]}`}>{levelLabel[g.level]}</span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-red mb-1.5">{g.category || 'Guia'}</p>
              <h3 className="text-sm font-semibold text-brand-black leading-snug mb-3 group-hover:text-brand-red transition-colors line-clamp-2">{g.title}</h3>
              <div className="mt-auto flex items-center justify-between text-[11px] text-brand-gray">
                <span className="inline-flex items-center gap-1"><Clock size={11} /> {g.readTime}</span>
                <span className="inline-flex items-center gap-1"><Eye size={11} /> {Math.floor(800 + (g.id.length * 137) % 9000)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
