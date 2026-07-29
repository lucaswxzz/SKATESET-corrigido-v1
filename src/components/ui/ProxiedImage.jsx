import { useState, useEffect } from 'react'

const PROXY_SERVICES = [
  (url) => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=800&q=80`,
  (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&q=80`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
]

function getDirectImageUrl(url) {
  if (!url) return url

  // Handle Pixabay download URLs - try to extract the image ID
  if (url.includes('pixabay.com/images/download/')) {
    // Extract the ID from the URL
    const match = url.match(/(\d+)_\d+\.\w+$/)
    if (match) {
      // Return the original URL as-is, proxy should handle it
      return url
    }
  }

  // Handle Pixabay page URLs - extract direct image URL
  if (url.includes('pixabay.com') && !url.includes('cdn.pixabay.com')) {
    const match = url.match(/-(\d+)_/)
    if (match) {
      return `https://cdn.pixabay.com/photo/2024/01/01/00/00/image-${match[1]}_1280.jpg`
    }
  }

  // Handle Pexels page URLs
  if (url.includes('pexels.com') && !url.includes('images.pexels.com')) {
    const match = url.match(/pexels\.com\/.*?\/(\d+)/)
    if (match) {
      return `https://images.pexels.com/photos/${match[1]}/pexels-photo-${match[1]}.jpeg?auto=compress&cs=tinysrgb&w=800`
    }
  }

  return url
}

export default function ProxiedImage({ src, alt, className, onError, ...props }) {
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0)
  const [useOriginal, setUseOriginal] = useState(false)

  const directUrl = getDirectImageUrl(src)

  function getSrc() {
    if (!directUrl) return null
    if (useOriginal) return directUrl
    if (currentProxyIndex >= PROXY_SERVICES.length) return directUrl
    return PROXY_SERVICES[currentProxyIndex](directUrl)
  }

  function handleError() {
    if (useOriginal) {
      onError?.()
      return
    }
    if (currentProxyIndex < PROXY_SERVICES.length - 1) {
      setCurrentProxyIndex(prev => prev + 1)
    } else {
      setUseOriginal(true)
    }
  }

  // Reset state when src changes
  useEffect(() => {
    setCurrentProxyIndex(0)
    setUseOriginal(false)
  }, [src])

  if (!src) return null

  return (
    <img
      src={getSrc()}
      alt={alt}
      className={className}
      onError={handleError}
      crossOrigin="anonymous"
      loading="lazy"
      {...props}
    />
  )
}
