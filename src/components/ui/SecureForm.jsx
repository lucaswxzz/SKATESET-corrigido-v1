import { useState, useCallback } from 'react'
import { sanitizeInput, hasXSSPattern, logSecurityEvent } from '../../lib/security'

export default function SecureForm({ onSubmit, children, className = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    // Check for XSS patterns in form data
    const formData = new FormData(e.target)
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string' && hasXSSPattern(value)) {
        logSecurityEvent('XSS_ATTEMPT', { field: key, value: value.substring(0, 100) })
        alert('Conteúdo não permitido detectado.')
        return
      }
    }

    setIsSubmitting(true)
    try {
      await onSubmit(e, formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [onSubmit])

  return (
    <form onSubmit={handleSubmit} className={className}>
      {typeof children === 'function'
        ? children({ isSubmitting })
        : children
      }
    </form>
  )
}

// Secure input component with sanitization
export function SecureInput({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className = '',
  required = false,
  ...props
}) {
  const handleChange = (e) => {
    const sanitized = sanitizeInput(e.target.value)
    onChange({ target: { name, value: sanitized } })
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      required={required}
      {...props}
    />
  )
}

// Secure textarea component with sanitization
export function SecureTextarea({
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  required = false,
  ...props
}) {
  const handleChange = (e) => {
    const sanitized = sanitizeInput(e.target.value)
    onChange({ target: { name, value: sanitized } })
  }

  return (
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      className={className}
      required={required}
      {...props}
    />
  )
}
