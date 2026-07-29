import { useState, useEffect, createContext, useContext } from 'react'
import { initDatabase } from '../lib/turso'
import { authLogin, authSignup, authLogout, dbQuery } from '../lib/api'
import { validateEmail, sanitizeInput, logSecurityEvent } from '../lib/security'

const AuthContext = createContext(null)
const SESSION_KEY = 'skateset_session'
const SESSION_EXPIRY = 24 * 60 * 60 * 1000

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initDatabase()
    const storedSession = localStorage.getItem(SESSION_KEY)
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession)
        if (session.expiresAt && Date.now() < session.expiresAt) {
          setUser(session.user)
        } else {
          localStorage.removeItem(SESSION_KEY)
        }
      } catch (e) { localStorage.removeItem(SESSION_KEY) }
    }
    setLoading(false)
  }, [])

  async function signIn(email, password) {
    if (!validateEmail(email)) throw new Error('Email inválido')
    const result = await authLogin(email, password)
    if (!result.success) throw new Error(result.error)

    const session = { token: result.token, user: result.user, expiresAt: Date.now() + SESSION_EXPIRY, createdAt: Date.now() }
    setUser(result.user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    logSecurityEvent('LOGIN_SUCCESS', { userId: result.user.id })
    return result.user
  }

  async function signUp(email, password, name) {
    if (!validateEmail(email)) throw new Error('Email inválido')
    if (password.length < 8) throw new Error('Senha deve ter 8+ caracteres')

    const sanitizedEmail = sanitizeInput(email.toLowerCase().trim())
    const sanitizedName = sanitizeInput(name.trim())
    if (sanitizedName.length < 2) throw new Error('Nome deve ter 2+ caracteres')

    const result = await authSignup(sanitizedEmail, password, sanitizedName)
    if (!result.success) throw new Error(result.error)

    const session = { token: result.token, user: result.user, expiresAt: Date.now() + SESSION_EXPIRY, createdAt: Date.now() }
    setUser(result.user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    logSecurityEvent('SIGNUP_SUCCESS', { userId: result.user.id })
    return result.user
  }

  async function updateProfile(updates) {
    if (updates.name) updates.name = sanitizeInput(updates.name.trim())
    if (updates.bio) updates.bio = sanitizeInput(updates.bio.trim())

    await dbQuery('UPDATE users SET name = ?, avatar_url = ?, bio = ? WHERE id = ? RETURNING *', [updates.name, updates.avatar_url || '', updates.bio || '', user.id])

    const userData = { ...user, ...updates }
    setUser(userData)
    const storedSession = localStorage.getItem(SESSION_KEY)
    if (storedSession) {
      const session = JSON.parse(storedSession)
      session.user = userData
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    }
    return userData
  }

  async function signOut() {
    try { await authLogout() } catch (e) {}
    logSecurityEvent('LOGOUT', { userId: user?.id })
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  function isSessionValid() {
    const storedSession = localStorage.getItem(SESSION_KEY)
    if (!storedSession) return false
    try { const session = JSON.parse(storedSession); return session.expiresAt && Date.now() < session.expiresAt } catch { return false }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile, isSessionValid }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
