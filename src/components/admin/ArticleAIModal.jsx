import { useState } from 'react'
import { X, Sparkles, Loader2, RefreshCw } from 'lucide-react'
import { generateArticle } from '../../lib/groq'

export default function ArticleAIModal({ onClose, onApply }) {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generated, setGenerated] = useState(null)

  async function handleGenerate() {
    if (!idea.trim()) {
      setError('Digite uma ideia para o artigo')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await generateArticle(idea)
      setGenerated(result)
    } catch (err) {
      setError(err.message || 'Erro ao gerar artigo')
    } finally {
      setLoading(false)
    }
  }

  function handleApply() {
    if (generated) {
      onApply(generated)
      onClose()
    }
  }

  function handleRegenerate() {
    setGenerated(null)
    handleGenerate()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-brand-black/90 flex items-start justify-center px-4 pt-20 overflow-y-auto">
      <div className="w-full max-w-2xl bg-brand-cream border-2 border-brand-black shadow-[8px_8px_0px_#DC2626] p-6 mb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-red text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-display text-2xl text-brand-black tracking-wider">
                GERAR COM IA
              </h2>
              <p className="text-brand-gray font-body text-xs">
                Powered by Groq AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-brand-gray hover:text-brand-red transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Idea Input */}
        {!generated && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                Ideia do Artigo
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Ex: Um artigo sobre as melhores manobras para iniciantes, com dicas práticas e fotos..."
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
              />
              <p className="mt-2 text-brand-gray-light font-mono text-[10px]">
                Seja específico para melhores resultados. A IA vai gerar título, conteúdo, imagem e tags automaticamente.
              </p>
            </div>

            {error && (
              <div className="px-4 py-3 bg-brand-red/10 border-2 border-brand-red/30 text-brand-red text-sm font-body">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !idea.trim()}
              className="w-full btn-retro bg-brand-red text-white font-display text-lg tracking-wider py-3 px-6 flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Gerando artigo...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  GERAR ARTIGO
                </>
              )}
            </button>
          </div>
        )}

        {/* Generated Result */}
        {generated && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded">
              <p className="text-green-700 font-body text-sm font-medium">
                Artigo gerado com sucesso!
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                  Título
                </label>
                <p className="text-brand-black font-body text-sm bg-white p-3 border-2 border-brand-black">
                  {generated.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                    Categoria
                  </label>
                  <p className="text-brand-black font-body text-sm bg-white p-3 border-2 border-brand-black">
                    {generated.category}
                  </p>
                </div>
                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                    Tags
                  </label>
                  <p className="text-brand-black font-body text-sm bg-white p-3 border-2 border-brand-black">
                    {generated.tags}
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                  Excerpt
                </label>
                <p className="text-brand-black font-body text-sm bg-white p-3 border-2 border-brand-black">
                  {generated.excerpt}
                </p>
              </div>

              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                  Imagem
                </label>
                {generated.image_url && (
                  <img
                    src={generated.image_url}
                    alt="Preview"
                    className="w-full h-40 object-cover border-2 border-brand-black mb-2"
                  />
                )}
              </div>

              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                  Conteúdo (preview)
                </label>
                <div className="text-brand-black font-body text-sm bg-white p-3 border-2 border-brand-black max-h-40 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: generated.content?.substring(0, 500) + '...' }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t-2 border-brand-black/10">
              <button
                onClick={handleApply}
                className="flex-1 btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-3 px-6 flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-colors"
              >
                APLICAR AO ARTIGO
              </button>
              <button
                onClick={handleRegenerate}
                disabled={loading}
                className="btn-retro bg-white text-brand-black font-display text-sm tracking-wider py-3 px-6 flex items-center justify-center gap-2 hover:bg-brand-cream transition-colors"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                REGERAR
              </button>
              <button
                onClick={() => setGenerated(null)}
                className="btn-retro bg-white text-brand-black font-display text-sm tracking-wider py-3 px-6 hover:bg-brand-cream transition-colors"
              >
                EDITAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
