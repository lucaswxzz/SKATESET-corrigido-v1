import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProxiedImage from '../ui/ProxiedImage'

export default function Hero({ article }) {
  const [imageError, setImageError] = useState(false)

  if (!article) return null

  return (
    <section className="relative w-full bg-brand-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 min-h-[400px]">
          <div className="relative aspect-square md:aspect-auto">
            {!imageError ? (
              <ProxiedImage
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-brand-gray flex items-center justify-center">
                <span className="font-display text-4xl text-white/20">SKATESET</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="inline-block w-fit px-3 py-1 bg-brand-red text-brand-white font-body text-xs font-bold uppercase border border-brand-red mb-4">
              Destaque
            </span>

            <span className="inline-block w-fit px-2 py-0.5 bg-brand-yellow text-brand-black font-body text-xs font-bold uppercase border border-brand-black mb-4">
              {article.category}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-white leading-none mb-4">
              {article.title}
            </h1>

            <p className="font-body text-brand-gray-light text-base md:text-lg mb-6 max-w-lg">
              {article.excerpt}
            </p>

            <Link
              to={`/artigo/${article.id}`}
              className="inline-block w-fit px-6 py-3 bg-brand-red text-brand-white font-body text-sm font-bold uppercase border-2 border-brand-white shadow-[3px_3px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_#FFFFFF] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Ler Artigo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
