const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const PIXABAY_BASE = 'https://pixabay.com/api/'
const PEXELS_BASE = 'https://api.pexels.com/v1/search'

async function searchPixabay(query, perPage = 1) {
  try {
    const params = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: query,
      image_type: 'photo',
      per_page: perPage.toString(),
      safesearch: 'true'
    })

    const response = await fetch(`${PIXABAY_BASE}?${params}`)
    if (!response.ok) throw new Error('Pixabay API error')

    const data = await response.json()
    if (data.hits && data.hits.length > 0) {
      return data.hits.map(hit => ({
        url: hit.webformatURL,
        thumbnail: hit.previewURL,
        source: 'pixabay',
        photographer: hit.user,
        width: hit.imageWidth,
        height: hit.imageHeight
      }))
    }
    return []
  } catch (error) {
    console.error('Pixabay search failed:', error)
    return []
  }
}

async function searchPexels(query, perPage = 1) {
  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage.toString(),
      orientation: 'landscape'
    })

    const response = await fetch(`${PEXELS_BASE}?${params}`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    })
    if (!response.ok) throw new Error('Pexels API error')

    const data = await response.json()
    if (data.photos && data.photos.length > 0) {
      return data.photos.map(photo => ({
        url: photo.src.large,
        thumbnail: photo.src.medium,
        source: 'pexels',
        photographer: photo.photographer,
        width: photo.width,
        height: photo.height
      }))
    }
    return []
  } catch (error) {
    console.error('Pexels search failed:', error)
    return []
  }
}

export async function searchImages(query, perPage = 1) {
  const pixabayResults = await searchPixabay(query, perPage)
  if (pixabayResults.length > 0) {
    return pixabayResults
  }

  const pexelsResults = await searchPexels(query, perPage)
  return pexelsResults
}

export async function searchArticleImage(articleTitle, category) {
  const queries = [
    `${category} skate`,
    `skate ${category}`,
    articleTitle.split(' ').slice(0, 4).join(' ')
  ]

  for (const query of queries) {
    const results = await searchImages(query, 1)
    if (results.length > 0) {
      return results[0]
    }
  }

  return null
}
