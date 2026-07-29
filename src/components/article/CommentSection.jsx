import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../lib/turso'
import { useAuth } from '../../hooks/useAuth'
import { MessageCircle, Send, Loader2, User, Clock, Trash2, Shield, Reply, X } from 'lucide-react'

export default function CommentSection({ articleId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    loadComments()
  }, [articleId])

  async function loadComments() {
    try {
      const result = await db.execute({
        sql: `SELECT c.*, u.name as user_name, u.role as user_role, u.avatar_url as user_avatar,
              (SELECT COUNT(*) FROM comments WHERE parent_id = c.id) as reply_count
              FROM comments c
              LEFT JOIN users u ON c.user_id = u.id
              WHERE c.article_id = ? AND c.parent_id IS NULL
              ORDER BY c.created_at DESC`,
        args: [articleId]
      })

      // Load replies for each comment
      const commentsWithReplies = await Promise.all(
        result.rows.map(async (comment) => {
          const repliesResult = await db.execute({
            sql: `SELECT c.*, u.name as user_name, u.role as user_role, u.avatar_url as user_avatar
                  FROM comments c
                  LEFT JOIN users u ON c.user_id = u.id
                  WHERE c.parent_id = ?
                  ORDER BY c.created_at ASC`,
            args: [comment.id]
          })
          return { ...comment, replies: repliesResult.rows }
        })
      )

      setComments(commentsWithReplies)
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const commentId = 'comment-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)

      await db.execute({
        sql: 'INSERT INTO comments (id, article_id, user_id, content) VALUES (?, ?, ?, ?)',
        args: [commentId, articleId, user.id, newComment.trim()]
      })

      setNewComment('')
      loadComments()
    } catch (err) {
      console.error('Error posting comment:', err)
      setError('Erro ao enviar comentário. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleReply(parentId) {
    if (!replyContent.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const replyId = 'reply-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)

      await db.execute({
        sql: 'INSERT INTO comments (id, article_id, user_id, content, parent_id) VALUES (?, ?, ?, ?, ?)',
        args: [replyId, articleId, user.id, replyContent.trim(), parentId]
      })

      setReplyContent('')
      setReplyingTo(null)
      loadComments()
    } catch (err) {
      console.error('Error posting reply:', err)
      setError('Erro ao enviar resposta. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(commentId) {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return

    try {
      if (user.role === 'admin') {
        // Delete replies first
        await db.execute({
          sql: 'DELETE FROM comments WHERE parent_id = ?',
          args: [commentId]
        })
        // Delete comment
        await db.execute({
          sql: 'DELETE FROM comments WHERE id = ?',
          args: [commentId]
        })
      } else {
        await db.execute({
          sql: 'DELETE FROM comments WHERE id = ? AND user_id = ?',
          args: [commentId, user.id]
        })
      }
      loadComments()
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }

  function canDelete(comment) {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.id === comment.user_id
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora mesmo'
    if (diffMins < 60) return `${diffMins}min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    if (diffDays < 7) return `${diffDays}d atrás`

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  function renderAvatar(avatarUrl, size = 'small') {
    const sizeClasses = size === 'small' ? 'w-8 h-8' : 'w-10 h-10'

    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt="Avatar"
          className={`${sizeClasses} object-cover border-2 border-brand-black shrink-0`}
        />
      )
    }

    return (
      <div className={`${sizeClasses} bg-brand-cream border-2 border-brand-black flex items-center justify-center shrink-0`}>
        <User size={size === 'small' ? 14 : 18} className="text-brand-gray" />
      </div>
    )
  }

  return (
    <section className="mt-12 pt-8 border-t-2 border-brand-black">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle size={24} className="text-brand-red" />
        <h3 className="font-display text-2xl text-brand-black tracking-wider">
          COMENTÁRIOS
        </h3>
        <span className="px-2 py-0.5 bg-brand-cream border border-brand-black font-mono text-xs text-brand-gray">
          {comments.length}
        </span>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            {renderAvatar(user.avatar_url, 'medium')}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva seu comentário..."
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <p className="text-brand-gray-light font-mono text-xs">
                    Comentando como <span className="text-brand-red">{user.name}</span>
                  </p>
                  {user.role === 'admin' && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-brand-red text-white text-[10px] font-mono">
                      <Shield size={10} />
                      ADMIN
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="btn-retro bg-brand-red text-white font-display text-xs tracking-wider py-2 px-4 flex items-center gap-2 hover:bg-brand-red-dark transition-colors disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  ENVIAR
                </button>
              </div>
            </div>
          </div>
          {error && (
            <p className="mt-2 text-brand-red font-body text-xs ml-14">{error}</p>
          )}
        </form>
      ) : (
        <div className="mb-8 p-4 bg-brand-cream border-2 border-brand-black text-center">
          <p className="text-brand-gray font-body text-sm mb-3">
            Faça login para comentar
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/login"
              className="btn-retro bg-white text-brand-black font-display text-xs tracking-wider py-2 px-4 hover:bg-brand-cream transition-colors"
            >
              ENTRAR
            </Link>
            <Link
              to="/cadastro"
              className="btn-retro bg-brand-red text-white font-display text-xs tracking-wider py-2 px-4 hover:bg-brand-red-dark transition-colors"
            >
              CADASTRAR
            </Link>
          </div>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <Loader2 size={24} className="animate-spin mx-auto text-brand-red" />
          <p className="text-brand-gray font-body text-sm mt-2">Carregando comentários...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 bg-brand-cream border-2 border-brand-black">
          <MessageCircle size={32} className="text-brand-gray-light mx-auto mb-3" />
          <p className="text-brand-gray font-body text-sm">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Main Comment */}
              <div className="bg-white border-2 border-brand-black p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {renderAvatar(comment.user_avatar)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-sm text-brand-black tracking-wider">
                          {comment.user_name || 'Anônimo'}
                        </span>
                        {comment.user_role === 'admin' && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-brand-red text-white text-[10px] font-mono">
                            <Shield size={10} />
                            ADMIN
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-brand-gray-light font-mono text-[10px]">
                          <Clock size={10} />
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-brand-black-soft font-body text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {user && user.role === 'admin' && (
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-brand-gray-light hover:text-brand-red transition-colors"
                        title="Responder"
                      >
                        <Reply size={14} />
                      </button>
                    )}
                    {canDelete(comment) && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-brand-gray-light hover:text-red-500 transition-colors"
                        title={user.role === 'admin' ? 'Excluir comentário (Admin)' : 'Excluir comentário'}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-brand-cream border-2 border-brand-black p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {renderAvatar(reply.user_avatar)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-display text-sm text-brand-black tracking-wider">
                                {reply.user_name || 'Anônimo'}
                              </span>
                              {reply.user_role === 'admin' && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-brand-red text-white text-[10px] font-mono">
                                  <Shield size={10} />
                                  ADMIN
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-brand-gray-light font-mono text-[10px]">
                                <Clock size={10} />
                                {formatDate(reply.created_at)}
                              </span>
                            </div>
                            <p className="text-brand-black-soft font-body text-sm leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>

                        {canDelete(reply) && (
                          <button
                            onClick={() => handleDelete(reply.id)}
                            className="text-brand-gray-light hover:text-red-500 transition-colors shrink-0"
                            title="Excluir resposta"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="ml-8 bg-white border-2 border-brand-red p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-xs text-brand-red">
                      Respondendo a <span className="font-bold">{comment.user_name}</span>
                    </p>
                    <button
                      onClick={() => { setReplyingTo(null); setReplyContent('') }}
                      className="text-brand-gray hover:text-brand-red transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex gap-3">
                    {renderAvatar(user?.avatar_url)}
                    <div className="flex-1">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Escreva sua resposta..."
                        rows={2}
                        className="w-full px-3 py-2 bg-brand-cream border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleReply(comment.id)}
                          disabled={submitting || !replyContent.trim()}
                          className="btn-retro bg-brand-red text-white font-display text-xs tracking-wider py-1.5 px-3 flex items-center gap-1 hover:bg-brand-red-dark transition-colors disabled:opacity-50"
                        >
                          {submitting ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Send size={12} />
                          )}
                          ENVIAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
