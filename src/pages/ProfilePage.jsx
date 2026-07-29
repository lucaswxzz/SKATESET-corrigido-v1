import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { db } from '../lib/turso'
import ImageUpload from '../components/admin/ImageUpload'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { User, Calendar, Mail, Save, Loader2, Shield, ArrowLeft, BookOpen, MessageCircle, LogOut, Trash2, AlertTriangle, X } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateProfile, signOut } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    avatar_url: '',
    bio: ''
  })
  const [stats, setStats] = useState({ articles: 0, comments: 0 })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadProfile()
  }, [user, navigate])

  async function loadProfile() {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM users WHERE id = ?',
        args: [user.id]
      })

      if (result.rows.length > 0) {
        const userData = result.rows[0]
        setForm({
          name: userData.name || '',
          avatar_url: userData.avatar_url || '',
          bio: userData.bio || ''
        })
      }

      const articlesResult = await db.execute({
        sql: 'SELECT COUNT(*) as count FROM articles WHERE author_id = ?',
        args: [user.id]
      })

      const commentsResult = await db.execute({
        sql: 'SELECT COUNT(*) as count FROM comments WHERE user_id = ?',
        args: [user.id]
      })

      setStats({
        articles: articlesResult.rows[0]?.count || 0,
        comments: commentsResult.rows[0]?.count || 0
      })
    } catch (err) {
      console.error('Error loading profile:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile(form)
      setSuccess('Perfil atualizado com sucesso!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    try {
      // Delete user's comments
      await db.execute({
        sql: 'DELETE FROM comments WHERE user_id = ?',
        args: [user.id]
      })

      // Delete user account
      await db.execute({
        sql: 'DELETE FROM users WHERE id = ?',
        args: [user.id]
      })

      // Sign out and redirect
      signOut()
      navigate('/')
    } catch (err) {
      console.error('Error deleting account:', err)
      setError('Erro ao excluir conta. Tente novamente.')
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'Não informado'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[150px] text-white leading-none select-none rotate-[-12deg]">
              PERFIL
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
          }}></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-gray-light hover:text-brand-red transition-colors mb-4 font-mono text-xs tracking-widest uppercase group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-brand-red flex items-center justify-center border-4 border-white/20 overflow-hidden">
                {form.avatar_url ? (
                  <img src={form.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">
                  {user.name}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  {user.role === 'admin' && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-brand-red text-white text-xs font-mono">
                      <Shield size={12} />
                      ADMIN
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-brand-gray-light font-mono text-xs">
                    <Calendar size={12} />
                    Membro desde {formatDate(user.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Stats Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Stats Card */}
                <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-4">
                    ESTATÍSTICAS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-brand-red" />
                        <span className="font-body text-sm text-brand-gray">Artigos</span>
                      </div>
                      <span className="font-display text-xl text-brand-black">{stats.articles}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-brand-red" />
                        <span className="font-body text-sm text-brand-gray">Comentários</span>
                      </div>
                      <span className="font-display text-xl text-brand-black">{stats.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-4">
                    INFORMAÇÕES
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-brand-gray" />
                      <span className="text-brand-gray font-body">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-brand-gray" />
                      <span className="text-brand-gray font-body">{formatDate(user.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield size={14} className="text-brand-gray" />
                      <span className="text-brand-gray font-body capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-4">
                    AÇÕES
                  </h3>
                  <div className="space-y-2">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block w-full text-center py-2 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors"
                      >
                        PAINEL ADMIN
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut(); navigate('/') }}
                      className="w-full py-2 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut size={14} />
                      SAIR DA CONTA
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full py-2 border-2 border-red-500 text-red-500 font-display text-xs tracking-wider hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} />
                      EXCLUIR CONTA
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white border-2 border-brand-black p-8 shadow-[4px_4px_0px_#1A1A1A]">
                  <h2 className="font-display text-2xl text-brand-black tracking-wider mb-6">
                    EDITAR PERFIL
                  </h2>

                  {success && (
                    <div className="mb-6 px-4 py-3 bg-green-100 border-2 border-green-200 text-green-700 text-sm font-body">
                      {success}
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 px-4 py-3 bg-brand-red/10 border-2 border-brand-red/30 text-brand-red text-sm font-body">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar */}
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                        FOTO DE PERFIL
                      </label>
                      <ImageUpload
                        value={form.avatar_url}
                        onChange={(url) => setForm(p => ({ ...p, avatar_url: url }))}
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                        NOME DE USUÁRIO
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-brand-cream border-2 border-brand-black text-brand-black font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                        required
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                        BIO
                      </label>
                      <textarea
                        value={form.bio}
                        onChange={(e) => setForm(p => ({ ...p, bio: e.target.value }))}
                        rows={4}
                        placeholder="Conte um pouco sobre você..."
                        className="w-full px-4 py-3 bg-brand-cream border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                      />
                      <p className="mt-1 text-brand-gray-light font-mono text-[10px]">
                        {form.bio.length}/200 caracteres
                      </p>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 border-t-2 border-brand-black/10">
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-3 px-8 flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
                      >
                        {saving ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Save size={16} />
                        )}
                        SALVAR ALTERAÇÕES
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[200] bg-brand-black/90 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-brand-cream border-2 border-brand-black shadow-[8px_8px_0px_#DC2626]">
            <div className="flex items-center justify-between p-4 border-b-2 border-brand-black">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-brand-red" />
                <h3 className="font-display text-xl text-brand-black tracking-wider">
                  EXCLUIR CONTA
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-brand-gray hover:text-brand-red transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200">
                <p className="text-red-700 font-body text-sm leading-relaxed">
                  <strong>Atenção:</strong> Esta ação é irreversível. 100% dos seus dados serão
                  excluídos permanentemente e não poderão ser recuperados.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-brand-black-soft font-body text-sm">
                  Ao confirmar, os seguintes dados serão excluídos:
                </p>
                <ul className="list-disc ml-6 space-y-1 text-brand-gray font-body text-sm">
                  <li>Sua conta e perfil</li>
                  <li>Todos os seus comentários</li>
                </ul>
              </div>

              <p className="text-brand-black font-body text-sm font-medium mb-6">
                Você confirma a exclusão da sua conta?
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors"
                >
                  VOLTAR
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 py-3 bg-red-500 text-white border-2 border-red-600 font-display text-xs tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  EXCLUIR CONTA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
