import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProxiedImage from './ProxiedImage'

export default function ArticleCard({ article }) {
  const { id, title, category, image_url, excerpt, created_at } = article
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      to={`/artigo/${id}`}
      className="group block bg-brand-white border-2 border-brand-black overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A]"
    >
      <div className="aspect-[4/3] overflow-hidden border-b-2 border-brand-black relative">
        {!imageError ? (
          <ProxiedImage
            src={image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-brand-gray-light flex items-center justify-center">
            <span className="font-display text-xl text-brand-gray">SKATESET</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block px-2 py-0.5 bg-brand-yellow text-brand-black font-body text-xs font-bold uppercase border border-brand-black">
            {category}
          </span>
          <span className="font-body text-xs text-brand-gray">
            {new Date(created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>

        <h3 className="font-display text-xl leading-tight mb-2 group-hover:text-brand-red transition-colors">
          {title}
        </h3>

        <p className="font-body text-sm text-brand-gray leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  )
}
