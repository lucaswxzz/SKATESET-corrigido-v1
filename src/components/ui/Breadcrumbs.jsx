import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm mb-6 text-brand-gray">
      <a href="/" className="inline-flex items-center gap-1 hover:text-brand-red transition-colors">
        <Home size={13} /> Início
      </a>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <ChevronRight size={13} className="text-brand-gray" />
          {it.to && i < items.length - 1 ? (
            <a href={it.to} className="hover:text-brand-red transition-colors">{it.label}</a>
          ) : (
            <span className="text-brand-black font-medium line-clamp-1 max-w-[240px] sm:max-w-md">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
