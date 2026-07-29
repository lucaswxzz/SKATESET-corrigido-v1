import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { db } from '../lib/turso'
import RichTextEditor from '../components/admin/RichTextEditor'
import ArticleAIModal from '../components/admin/ArticleAIModal'
import ImageUpload from '../components/admin/ImageUpload'
import SecurityDashboard from '../components/admin/SecurityDashboard'

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    tags: '',
    image_url: '',
    content: '',
    meta_description: '',
    keywords: '',
    published: 0
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/')
      return
    }
    loadArticles()
  }, [user, navigate])

  async function loadArticles() {
    try {
      const result = await db.execute('SELECT * FROM articles ORDER BY created_at DESC')
      setArticles(result.rows)
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(p => ({
      ...p,
      title,
      slug: generateSlug(title)
    }))
  }

  function handleEdit(article) {
    setEditingArticle(article)
    setForm({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      category: article.category || '',
      tags: article.tags || '',
      image_url: article.image_url || '',
      content: article.content || '',
      meta_description: article.meta_description || '',
      keywords: article.keywords || '',
      published: article.published || 0
    })
    setShowForm(true)
  }

  function handleNew() {
    setEditingArticle(null)
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      category: '',
      tags: '',
      image_url: '',
      content: '',
      meta_description: '',
      keywords: '',
      published: 0
    })
    setShowForm(true)
  }

  function handleAIGenerated(articleData) {
    setForm({
      title: articleData.title || '',
      slug: articleData.slug || '',
      excerpt: articleData.excerpt || '',
      category: articleData.category || '',
      tags: articleData.tags || '',
      image_url: articleData.image_url || '',
      content: articleData.content || '',
      meta_description: articleData.meta_description || '',
      keywords: articleData.keywords || '',
      published: 0
    })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingArticle) {
        await db.execute({
          sql: `UPDATE articles SET
            title = ?,
            slug = ?,
            excerpt = ?,
            category = ?,
            tags = ?,
            image_url = ?,
            content = ?,
            meta_description = ?,
            keywords = ?,
            published = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
          args: [
            form.title,
            form.slug,
            form.excerpt,
            form.category,
            form.tags,
            form.image_url,
            form.content,
            form.meta_description,
            form.keywords,
            form.published,
            editingArticle.id
          ]
        })
      } else {
        const id = generateSlug(form.title) + '-' + Date.now()
        await db.execute({
          sql: `INSERT INTO articles (id, title, slug, excerpt, category, tags, image_url, content, meta_description, keywords, author_id, published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            id,
            form.title,
            form.slug,
            form.excerpt,
            form.category,
            form.tags,
            form.image_url,
            form.content,
            form.meta_description,
            form.keywords,
            user.id,
            form.published
          ]
        })
      }

      setShowForm(false)
      loadArticles()
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Erro ao salvar artigo')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return

    try {
      await db.execute({
        sql: 'DELETE FROM articles WHERE id = ?',
        args: [id]
      })
      loadArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Erro ao excluir artigo')
    }
  }

  async function togglePublished(article) {
    try {
      await db.execute({
        sql: 'UPDATE articles SET published = ? WHERE id = ?',
        args: [article.published ? 0 : 1, article.id]
      })
      loadArticles()
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  if (user?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-brand-black tracking-wider">
              PAINEL ADMIN
            </h1>
            <p className="text-brand-gray font-body text-sm mt-1">
              Gerenciar artigos do SkateSet
            </p>
          </div>
          <button
            onClick={handleNew}
            className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-4 flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
          >
            <Plus size={16} />
            NOVO ARTIGO
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-brand-black/90 flex items-start justify-center px-4 pt-20 overflow-y-auto">
            <div className="w-full max-w-4xl bg-brand-cream border-2 border-brand-black shadow-[8px_8px_0px_#DC2626] p-6 mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-brand-black tracking-wider">
                  {editingArticle ? 'EDITAR ARTIGO' : 'NOVO ARTIGO'}
                </h2>
                <div className="flex items-center gap-2">
                  {!editingArticle && (
                    <button
                      type="button"
                      onClick={() => setShowAIModal(true)}
                      className="btn-retro bg-purple-600 text-white font-display text-xs tracking-wider py-2 px-3 flex items-center gap-2 hover:bg-purple-700 transition-colors"
                    >
                      <Sparkles size={14} />
                      GERAR COM IA
                    </button>
                  )}
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-brand-gray hover:text-brand-red transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={handleTitleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm(p => ({ ...p, excerpt: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                      placeholder="Ex: Manobras, Cultura, Equipamento"
                      className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm(p => ({ ...p, tags: e.target.value }))}
                      placeholder="Ex: skate, ollie, tutorial"
                      className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                    Imagem
                  </label>
                  <ImageUpload
                    value={form.image_url}
                    onChange={(url) => setForm(p => ({ ...p, image_url: url }))}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                    Conteúdo
                  </label>
                  <RichTextEditor
                    value={form.content}
                    onChange={(content) => setForm(p => ({ ...p, content }))}
                  />
                </div>

                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded">
                  <h3 className="font-display text-sm text-purple-800 tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles size={14} />
                    SEO SETTINGS
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                        Meta Description
                      </label>
                      <textarea
                        value={form.meta_description}
                        onChange={(e) => setForm(p => ({ ...p, meta_description: e.target.value }))}
                        rows={2}
                        placeholder="Descrição para buscadores (até 160 caracteres)"
                        className="w-full px-3 py-2 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                      />
                      <p className="mt-1 text-brand-gray-light font-mono text-[10px]">
                        {form.meta_description.length}/160 caracteres
                      </p>
                    </div>
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-1">
                        Palavras-chave (separadas por vírgula)
                      </label>
                      <input
                        type="text"
                        value={form.keywords}
                        onChange={(e) => setForm(p => ({ ...p, keywords: e.target.value }))}
                        placeholder="Ex: manobras skate, como fazer ollie, skate para iniciantes"
                        className="w-full px-3 py-2 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(p => ({ ...p, published: e.target.checked ? 1 : 0 }))}
                      className="w-4 h-4 accent-brand-red"
                    />
                    <span className="font-body text-sm text-brand-black">Publicar artigo</span>
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t-2 border-brand-black/10">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-6 flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
                  >
                    {saving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        {editingArticle ? 'SALVAR ALTERAÇÕES' : 'CRIAR ARTIGO'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-retro bg-white text-brand-black font-display text-sm tracking-wider py-2 px-6 hover:bg-brand-cream transition-colors"
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 size={32} className="animate-spin mx-auto text-brand-red" />
            <p className="text-brand-gray font-body text-sm mt-4">Carregando artigos...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-brand-black">
            <p className="text-brand-gray font-body">Nenhum artigo encontrado.</p>
            <button
              onClick={handleNew}
              className="mt-4 btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-4 hover:bg-brand-red-dark transition-colors"
            >
              CRIAR PRIMEIRO ARTIGO
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white border-2 border-brand-black p-4 flex items-center gap-4 hover:border-brand-red transition-colors"
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-20 h-20 object-cover border-2 border-brand-black"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg text-brand-black tracking-wider truncate">
                      {article.title}
                    </h3>
                    {article.published ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-mono uppercase">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-mono uppercase">
                        Rascunho
                      </span>
                    )}
                  </div>
                  <p className="text-brand-gray font-body text-sm truncate">
                    {article.excerpt || 'Sem excerpt'}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {article.category && (
                      <span className="text-brand-red font-mono text-xs uppercase">
                        {article.category}
                      </span>
                    )}
                    <span className="text-brand-gray-light font-mono text-xs">
                      {new Date(article.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublished(article)}
                    className="p-2 text-brand-gray hover:text-brand-red transition-colors"
                    title={article.published ? 'Despublicar' : 'Publicar'}
                  >
                    {article.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 text-brand-gray hover:text-brand-red transition-colors"
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-brand-gray hover:text-red-500 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Dashboard */}
      <div className="mt-8">
        <SecurityDashboard />
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <ArticleAIModal
          onClose={() => setShowAIModal(false)}
          onApply={handleAIGenerated}
        />
      )}
    </div>
  )
}
