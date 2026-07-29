import ArticleCard from '../ui/ArticleCard'

export default function ArticleGrid({ artigos }) {
  if (artigos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-brand-gray text-lg">
          Nenhum artigo encontrado.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artigos.map((artigo) => (
        <ArticleCard key={artigo.id} article={artigo} />
      ))}
    </div>
  )
}
