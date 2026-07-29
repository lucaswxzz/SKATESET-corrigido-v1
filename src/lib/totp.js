// TOTP (Time-based One-Time Password) implementation for 2FA
// Based on RFC 6238

// Base32 alphabet (RFC 4648)
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

// Generate a random secret key in Base32 format
export function generateSecret(length = 20) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, b => BASE32_CHARS[b % 32]).join('')
}

// Encode bytes to Base32
function base32Encode(bytes) {
  let bits = ''
  for (const byte of bytes) {
    bits += byte.toString(2).padStart(8, '0')
  }
  let result = ''
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substr(i, 5).padEnd(5, '0')
    result += BASE32_CHARS[parseInt(chunk, 2)]
  }
  return result
}

// Decode Base32 to bytes
function base32Decode(encoded) {
  let bits = ''
  for (const char of encoded.toUpperCase()) {
    const val = BASE32_CHARS.indexOf(char)
    if (val === -1) continue
    bits += val.toString(2).padStart(5, '0')
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8))
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.substr(i * 8, 8), 2)
  }
  return bytes
}

// Generate QR code URL for authenticator apps
export function generateQRCodeURL(secret, email, issuer = 'SkateSet') {
  const encodedIssuer = encodeURIComponent(issuer)
  const encodedEmail = encodeURIComponent(email)
  return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`
}

// HMAC-SHA1 implementation using Web Crypto
async function hmacSha1(key, message) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: { name: 'SHA-1' } },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, message)
  return new Uint8Array(signature)
}

// Generate TOTP code for a given time
async function generateTOTPForTime(secret, time) {
  const timeStep = 30
  const counter = Math.floor(time / timeStep)

  // Convert counter to 8-byte big-endian buffer
  const counterBytes = new Uint8Array(8)
  let temp = counter
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = temp & 0xff
    temp = Math.floor(temp / 256)
  }

  const secretBytes = base32Decode(secret)
  const hmac = await hmacSha1(secretBytes, counterBytes)

  // Dynamic truncation
  const offset = hmac[hmac.length - 1] & 0x0f
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000

  return code.toString().padStart(6, '0')
}

// Generate current TOTP code
export async function generateTOTP(secret) {
  const now = Math.floor(Date.now() / 1000)
  return generateTOTPForTime(secret, now)
}

// Verify TOTP code with time window tolerance
export async function verifyTOTP(secret, code, window = 2) {
  const now = Math.floor(Date.now() / 1000)
  const timeStep = 30

  // Check current time step and surrounding steps
  for (let i = -window; i <= window; i++) {
    const checkTime = now + (i * timeStep)
    const expectedCode = await generateTOTPForTime(secret, checkTime)

    if (expectedCode === code.toString().padStart(6, '0')) {
      return true
    }
  }

  return false
}

// Generate backup codes
export function generateBackupCodes(count = 8) {
  const codes = []
  for (let i = 0; i < count; i++) {
    const bytes = new Uint8Array(4)
    crypto.getRandomValues(bytes)
    const code = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase().slice(0, 8)
    codes.push(code)
  }
  return codes
}

// Hash backup code for storage
export async function hashBackupCode(code) {
  const encoder = new TextEncoder()
  const data = encoder.encode(code.toUpperCase())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('')
}
