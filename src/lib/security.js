// Security utilities for SkateSet

// ============================================
// ENCRYPTION UTILITIES
// ============================================

// Generate encryption key from password
export async function deriveEncryptionKey(password, salt) {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Encrypt data
export async function encryptData(data, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await deriveEncryptionKey(password, salt)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoder = new TextEncoder()

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data)
  )

  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(encrypted), salt.length + iv.length)

  return btoa(String.fromCharCode(...combined))
}

// Decrypt data
export async function decryptData(encryptedData, password) {
  const combined = new Uint8Array(
    atob(encryptedData).split('').map(c => c.charCodeAt(0))
  )

  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const data = combined.slice(28)

  const key = await deriveEncryptionKey(password, salt)

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )

  return new TextDecoder().decode(decrypted)
}

// ============================================
// BRUTE FORCE PROTECTION
// ============================================

const loginAttempts = new Map()
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000

export function checkBruteForce(identifier) {
  const now = Date.now()
  const attempts = loginAttempts.get(identifier) || []
  const validAttempts = attempts.filter(time => now - time < LOCKOUT_DURATION)

  if (validAttempts.length >= MAX_LOGIN_ATTEMPTS) {
    const timeLeft = Math.ceil((LOCKOUT_DURATION - (now - validAttempts[0])) / 60000)
    return { allowed: false, message: `Conta bloqueada. Tente novamente em ${timeLeft} minutos.` }
  }

  return { allowed: true, attemptsLeft: MAX_LOGIN_ATTEMPTS - validAttempts.length }
}

export function recordLoginAttempt(identifier) {
  const attempts = loginAttempts.get(identifier) || []
  attempts.push(Date.now())
  loginAttempts.set(identifier, attempts)
}

export function clearLoginAttempts(identifier) {
  loginAttempts.delete(identifier)
}

// ============================================
// SQL INJECTION PREVENTION
// ============================================

export function detectSQLInjection(input) {
  if (typeof input !== 'string') return false

  const patterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|FETCH|DECLARE|TRUNCATE)\b)/i,
    /(-{2}|\/\*|\*\/|;)/,
    /('.*OR.*'.*=.*')/i,
    /(CHAR\(|CONCAT\(|0x[0-9a-f]+)/i,
    /(SLEEP\(|BENCHMARK\(|WAITFOR)/i,
    /(LOAD_FILE\(|INTO\s+(OUTFILE|DUMPFILE))/i
  ]

  return patterns.some(pattern => pattern.test(input))
}

// ============================================
// INPUT VALIDATION
// ============================================

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export function sanitizeHTML(html) {
  if (typeof html !== 'string') return html

  // Remove script tags and content
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<script[^>]*>/gi, '')
    .replace(/<\/script>/gi, '')

  // Remove event handlers (all variations)
  sanitized = sanitized
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/on\w+\s*=\s*[^\s>"']*/gi, '')

  // Remove dangerous protocols
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/data:image\/svg\+xml/gi, '')

  // Remove dangerous tags
  sanitized = sanitized
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')

  // Remove dangerous attributes
  sanitized = sanitized
    .replace(/\s+style\s*=\s*"[^"]*"/gi, '')
    .replace(/\s+style\s*=\s*'[^']*'/gi, '')

  return sanitized
}

// ============================================
// RATE LIMITING
// ============================================

const rateLimitMap = new Map()

export function checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, [])
  }

  const timestamps = rateLimitMap.get(key).filter(t => t > windowStart)
  rateLimitMap.set(key, timestamps)

  if (timestamps.length >= maxRequests) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', { key, attempts: timestamps.length })
    return false
  }

  timestamps.push(now)
  return true
}

// ============================================
// VALIDATION UTILITIES
// ============================================

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password) {
  const checks = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
  const strength = Object.values(checks).filter(Boolean).length
  return { isValid: checks.minLength && strength >= 3, strength, checks }
}

export function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_{2,}/g, '_').substring(0, 255)
}

export function isValidURL(url) {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function hasXSSPattern(input) {
  if (typeof input !== 'string') return false
  const patterns = [/<script\b/i, /javascript:/i, /on\w+\s*=/i, /<iframe/i, /eval\s*\(/i]
  return patterns.some(pattern => pattern.test(input))
}

// ============================================
// SECURITY HEADERS
// ============================================

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.imgbb.com https://api.groq.com https://*.turso.io wss://*.turso.io; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
}

// ============================================
// LOGGING
// ============================================

export function logSecurityEvent(event, details = {}) {
  console.log('[Security]', { timestamp: new Date().toISOString(), event, ...details })
}

export function sanitizeFormData(data) {
  const sanitized = {}
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      if (detectSQLInjection(value)) throw new Error(`Campo "${key}" contém caracteres não permitidos`)
      if (hasXSSPattern(value)) throw new Error(`Campo "${key}" contém código não permitido`)
      sanitized[key] = sanitizeInput(value)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

// ============================================
// CSRF
// ============================================

export function generateCSRFToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
