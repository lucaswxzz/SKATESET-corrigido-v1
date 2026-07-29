import { useState, useEffect } from 'react'
import { searchArticleImage } from '../lib/imageSearch'

export function useArticleImage(article, fallbackImage) {
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchImage() {
      try {
        setLoading(true)
        setError(null)

        // Use new field names (title, category) or fallback to old ones (titulo, categoria)
        const title = article?.title || article?.titulo
        const category = article?.category || article?.categoria

        // If we have a direct image_url, use it as fallback without searching
        if (fallbackImage && !title) {
          if (!cancelled) {
            setImageData({
              url: fallbackImage,
              thumbnail: fallbackImage,
              source: 'fallback',
              photographer: '',
              width: 800,
              height: 450
            })
            setLoading(false)
          }
          return
        }

        const result = await searchArticleImage(title, category)

        if (!cancelled) {
          if (result) {
            setImageData(result)
          } else {
            setImageData({
              url: fallbackImage,
              thumbnail: fallbackImage,
              source: 'fallback',
              photographer: '',
              width: 800,
              height: 450
            })
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setImageData({
            url: fallbackImage,
            thumbnail: fallbackImage,
            source: 'fallback',
            photographer: '',
            width: 800,
            height: 450
          })
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchImage()

    return () => {
      cancelled = true
    }
  }, [article?.title, article?.titulo, article?.category, article?.categoria, fallbackImage])

  return { imageData, loading, error }
}
