import { useEffect } from 'react'

// Security wrapper component
// Headers (CSP, X-Frame-Options, etc.) are set via netlify.toml HTTP headers
export default function SecurityWrapper({ children }) {
  useEffect(() => {
    // Monitor for XSS attempts in local storage
    try {
      const suspiciousPatterns = [
        /eval\s*\(/i,
        /<script/i,
        /javascript:/i
      ]
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        if (suspiciousPatterns.some(pattern => pattern.test(value))) {
          console.warn('[Security] Suspicious data in localStorage:', key)
        }
      }
    } catch (e) {
      // localStorage might be disabled
    }
  }, [])

  return (
    <div className="security-wrapper">
      {children}
    </div>
  )
}
