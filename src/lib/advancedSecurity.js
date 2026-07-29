// Advanced Security Module for SkateSet

import { logSecurityEvent } from './security'

// ============================================
// 1. CONTENT SECURITY POLICY (CSP)
// ============================================

export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'connect-src': ["'self'", 'https://api.imgbb.com', 'https://api.groq.com', 'https://*.turso.io', 'wss://*.turso.io', 'https://api.qrserver.com'],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
}

export function buildCSPHeader() {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
}

// ============================================
// 2. CORS CONFIGURATION
// ============================================

export const CORS_CONFIG = {
  origin: ['https://www.skateset.com.br', 'https://skateset.com.br'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,
  maxAge: 86400
}

// ============================================
// 3. INPUT VALIDATION & SANITIZATION
// ============================================

// Advanced SQL injection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|FETCH|DECLARE|TRUNCATE|GRANT|REVOKE)\b)/i,
  /(-{2}|\/\*|\*\/|;)/,
  /('.*OR.*'.*=.*')/i,
  /(CHAR\(|CONCAT\(|0x[0-9a-f]+)/i,
  /(SLEEP\(|BENCHMARK\(|WAITFOR|DELAY)/i,
  /(LOAD_FILE\(|INTO\s+(OUTFILE|DUMPFILE))/i,
  /(INFORMATION_SCHEMA|SYSOBJECTS|SYSCOLUMNS)/i,
  /(CHAR\(|CHR\(|MID\(|SUBSTRING\()/i,
  /(CONVERT\(|CAST\(|BINARY\()/i
]

// Advanced XSS patterns
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<applet/gi,
  /<form/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
  /document\.(cookie|write|location|domain)/gi,
  /window\.(location|open|eval)/gi,
  /\.innerHTML/gi,
  /\.outerHTML/gi,
  /document\.getElementById/gi,
  /document\.createElement/gi
]

// Path traversal patterns
const PATH_TRAVERSAL_PATTERNS = [
  /\.\.\//g,
  /\.\.\\$/g,
  /%2e%2e/i,
  /%252e%252e/i,
  /\.\.%2f/i,
  /\.\.%5c/i
]

// Command injection patterns
const COMMAND_INJECTION_PATTERNS = [
  /[;&|`$]/g,
  /\$\(/g,
  /\$\{/g,
  /`[^`]*`/g
]

export function detectThreats(input) {
  if (typeof input !== 'string') return { safe: true, threats: [] }

  const threats = []

  if (SQL_INJECTION_PATTERNS.some(p => p.test(input))) {
    threats.push('SQL_INJECTION')
  }
  if (XSS_PATTERNS.some(p => p.test(input))) {
    threats.push('XSS')
  }
  if (PATH_TRAVERSAL_PATTERNS.some(p => p.test(input))) {
    threats.push('PATH_TRAVERSAL')
  }
  if (COMMAND_INJECTION_PATTERNS.some(p => p.test(input))) {
    threats.push('COMMAND_INJECTION')
  }

  return {
    safe: threats.length === 0,
    threats
  }
}

export function sanitizeAdvanced(input) {
  if (typeof input !== 'string') return input

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
    .replace(/`/g, '&#x60;')
}

// ============================================
// 4. SESSION MANAGEMENT
// ============================================

const SESSION_STORE = new Map()
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const MAX_SESSIONS_PER_USER = 3

export function createSession(userId, metadata = {}) {
  const sessionId = generateSecureToken(32)
  const now = Date.now()

  // Check max sessions per user
  const userSessions = Array.from(SESSION_STORE.values())
    .filter(s => s.userId === userId && s.expiresAt > now)

  if (userSessions.length >= MAX_SESSIONS_PER_USER) {
    // Remove oldest session
    const oldest = userSessions.sort((a, b) => a.createdAt - b.createdAt)[0]
    SESSION_STORE.delete(oldest.id)
  }

  const session = {
    id: sessionId,
    userId,
    createdAt: now,
    expiresAt: now + SESSION_TIMEOUT,
    lastActivity: now,
    ip: metadata.ip || 'unknown',
    userAgent: metadata.userAgent || 'unknown',
    isValid: true
  }

  SESSION_STORE.set(sessionId, session)
  logSecurityEvent('SESSION_CREATED', { sessionId, userId })

  return sessionId
}

export function validateSession(sessionId) {
  const session = SESSION_STORE.get(sessionId)

  if (!session) {
    return { valid: false, reason: 'session_not_found' }
  }

  if (!session.isValid) {
    return { valid: false, reason: 'session_invalidated' }
  }

  if (Date.now() > session.expiresAt) {
    SESSION_STORE.delete(sessionId)
    return { valid: false, reason: 'session_expired' }
  }

  // Update last activity
  session.lastActivity = Date.now()

  return { valid: true, userId: session.userId }
}

export function invalidateSession(sessionId) {
  const session = SESSION_STORE.get(sessionId)
  if (session) {
    session.isValid = false
    SESSION_STORE.delete(sessionId)
    logSecurityEvent('SESSION_INVALIDATED', { sessionId })
  }
}

export function invalidateAllUserSessions(userId) {
  Array.from(SESSION_STORE.entries()).forEach(([id, session]) => {
    if (session.userId === userId) {
      session.isValid = false
      SESSION_STORE.delete(id)
    }
  })
  logSecurityEvent('ALL_SESSIONS_INVALIDATED', { userId })
}

// ============================================
// 5. CSRF PROTECTION
// ============================================

const CSRF_TOKENS = new Map()
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour

export function generateCSRFToken(sessionId) {
  const token = generateSecureToken(32)
  CSRF_TOKENS.set(token, {
    sessionId,
    createdAt: Date.now(),
    expiresAt: Date.now() + CSRF_TOKEN_EXPIRY
  })
  return token
}

export function validateCSRFToken(token, sessionId) {
  const stored = CSRF_TOKENS.get(token)

  if (!stored) {
    return false
  }

  if (Date.now() > stored.expiresAt) {
    CSRF_TOKENS.delete(token)
    return false
  }

  if (stored.sessionId !== sessionId) {
    logSecurityEvent('CSRF_VALIDATION_FAILED', { token, sessionId })
    return false
  }

  // Token is single-use
  CSRF_TOKENS.delete(token)
  return true
}

// ============================================
// 6. RATE LIMITING (Advanced)
// ============================================

const RATE_LIMIT_STORE = new Map()

const RATE_LIMITS = {
  login: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 min
  signup: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  api: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 per min
  password_reset: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  comment: { maxRequests: 10, windowMs: 60 * 1000 } // 10 per min
}

export function checkAdvancedRateLimit(key, type = 'api') {
  const limits = RATE_LIMITS[type] || RATE_LIMITS.api
  const now = Date.now()
  const windowStart = now - limits.windowMs

  if (!RATE_LIMIT_STORE.has(key)) {
    RATE_LIMIT_STORE.set(key, {})
  }

  const userLimits = RATE_LIMIT_STORE.get(key)
  if (!userLimits[type]) {
    userLimits[type] = []
  }

  // Remove expired timestamps
  userLimits[type] = userLimits[type].filter(t => t > windowStart)

  if (userLimits[type].length >= limits.maxRequests) {
    const retryAfter = Math.ceil((userLimits[type][0] + limits.windowMs - now) / 1000)
    logSecurityEvent('RATE_LIMIT_EXCEEDED', { key, type, retryAfter })
    return {
      allowed: false,
      retryAfter,
      remaining: 0
    }
  }

  userLimits[type].push(now)

  return {
    allowed: true,
    remaining: limits.maxRequests - userLimits[type].length,
    resetAt: userLimits[type][0] + limits.windowMs
  }
}

// ============================================
// 7. DATA ENCRYPTION
// ============================================

const ENCRYPTION_ALGO = 'AES-GCM'
const KEY_LENGTH = 256

export async function generateEncryptionKey() {
  return crypto.subtle.generateKey(
    { name: ENCRYPTION_ALGO, length: KEY_LENGTH },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function exportKey(key) {
  const exported = await crypto.subtle.exportKey('raw', key)
  return btoa(String.fromCharCode(...new Uint8Array(exported)))
}

export async function importKey(keyString) {
  const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0))
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: ENCRYPTION_ALGO, length: KEY_LENGTH },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function encryptSensitiveData(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoder = new TextEncoder()

  const encrypted = await crypto.subtle.encrypt(
    { name: ENCRYPTION_ALGO, iv },
    key,
    encoder.encode(JSON.stringify(data))
  )

  return {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
  }
}

export async function decryptSensitiveData(encryptedObj, key) {
  const iv = Uint8Array.from(atob(encryptedObj.iv), c => c.charCodeAt(0))
  const data = Uint8Array.from(atob(encryptedObj.data), c => c.charCodeAt(0))

  const decrypted = await crypto.subtle.decrypt(
    { name: ENCRYPTION_ALGO, iv },
    key,
    data
  )

  return JSON.parse(new TextDecoder().decode(decrypted))
}

// ============================================
// 8. SECURITY MONITORING
// ============================================

const SECURITY_EVENTS = []
const MAX_EVENTS = 1000

export function monitorSecurityEvent(event, details = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
    id: generateSecureToken(16)
  }

  SECURITY_EVENTS.push(entry)

  // Keep only last N events
  if (SECURITY_EVENTS.length > MAX_EVENTS) {
    SECURITY_EVENTS.shift()
  }

  // Log critical events
  const criticalEvents = [
    'SQL_INJECTION_ATTEMPT',
    'XSS_ATTEMPT',
    'BRUTE_FORCE_DETECTED',
    'UNAUTHORIZED_ACCESS',
    'SESSION_HIJACK_ATTEMPT'
  ]

  if (criticalEvents.includes(event)) {
    console.error('[SECURITY ALERT]', entry)
    // In production: send to security monitoring service
  }

  return entry
}

export function getSecurityEvents(filters = {}) {
  let events = [...SECURITY_EVENTS]

  if (filters.event) {
    events = events.filter(e => e.event === filters.event)
  }

  if (filters.since) {
    events = events.filter(e => new Date(e.timestamp) >= new Date(filters.since))
  }

  return events.slice(-100) // Return last 100 events
}

// ============================================
// 9. INPUT VALIDATION SCHEMAS
// ============================================

export const VALIDATION_SCHEMAS = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    message: 'Email inválido'
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    message: 'Senha deve ter 8+ caracteres com maiúscula, minúscula e número'
  },
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    message: 'Nome deve ter 2-100 caracteres'
  },
  comment: {
    minLength: 1,
    maxLength: 2000,
    message: 'Comentário deve ter 1-2000 caracteres'
  },
  url: {
    pattern: /^https?:\/\/.+/i,
    maxLength: 2048,
    message: 'URL inválida'
  }
}

export function validateField(value, schema) {
  const errors = []

  if (schema.minLength && value.length < schema.minLength) {
    errors.push(`Mínimo ${schema.minLength} caracteres`)
  }

  if (schema.maxLength && value.length > schema.maxLength) {
    errors.push(`Máximo ${schema.maxLength} caracteres`)
  }

  if (schema.pattern && !schema.pattern.test(value)) {
    errors.push(schema.message)
  }

  if (schema.requireUppercase && !/[A-Z]/.test(value)) {
    errors.push('Precisa de letra maiúscula')
  }

  if (schema.requireLowercase && !/[a-z]/.test(value)) {
    errors.push('Precisa de letra minúscula')
  }

  if (schema.requireNumber && !/[0-9]/.test(value)) {
    errors.push('Precisa de número')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// ============================================
// 10. SECURE UTILITIES
// ============================================

export function generateSecureToken(length = 32) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
}

export function secureCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  if (a.length !== b.length) return false

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function maskSensitiveData(data, visibleChars = 4) {
  if (typeof data !== 'string') return data
  if (data.length <= visibleChars) return data
  return '*'.repeat(data.length - visibleChars) + data.slice(-visibleChars)
}

// ============================================
// 11. CLEANUP
// ============================================

export function cleanupExpiredData() {
  const now = Date.now()

  // Cleanup sessions
  Array.from(SESSION_STORE.entries()).forEach(([id, session]) => {
    if (session.expiresAt < now) {
      SESSION_STORE.delete(id)
    }
  })

  // Cleanup CSRF tokens
  Array.from(CSRF_TOKENS.entries()).forEach(([token, data]) => {
    if (data.expiresAt < now) {
      CSRF_TOKENS.delete(token)
    }
  })

  // Cleanup rate limits
  Array.from(RATE_LIMIT_STORE.entries()).forEach(([key, limits]) => {
    Object.keys(limits).forEach(type => {
      limits[type] = limits[type].filter(t => t > now - 3600000)
    })
  })
}

// Run cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredData, 5 * 60 * 1000)
}
