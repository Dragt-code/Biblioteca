const PIXABAY_API = 'https://pixabay.com/api/'
const CACHE_SECONDS = 60 * 60 * 24
const UNSAFE_TAGS = /\b(adult|adulto|nude|nudity|desnudo|sex|sexual|porn|porno|gore|blood|sangre|bloody|weapon|arma|gun|pistol|knife|cuchillo|violence|violencia|violent|horror|drug|droga|alcohol)\b/i

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': status === 200 ? `public, max-age=${CACHE_SECONDS}` : 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

export async function onRequestGet({ request, env }) {
  const key = env.PIXABAY_API_KEY
  if (!key) return json({ error: 'media_unavailable', hits: [] }, 503)

  const incoming = new URL(request.url)
  const query = (incoming.searchParams.get('q') || '').trim().slice(0, 80)
  if (!query) return json({ error: 'missing_query', hits: [] }, 400)

  const cacheUrl = new URL(request.url)
  cacheUrl.searchParams.set('q', query.toLocaleLowerCase())
  const cacheRequest = new Request(cacheUrl.toString(), request)
  const cache = caches.default
  const cached = await cache.match(cacheRequest)
  if (cached) return cached

  const upstream = new URL(PIXABAY_API)
  upstream.searchParams.set('key', key)
  upstream.searchParams.set('q', query)
  upstream.searchParams.set('lang', 'es')
  upstream.searchParams.set('safesearch', 'true')
  upstream.searchParams.set('image_type', 'illustration')
  upstream.searchParams.set('per_page', '8')

  try {
    const response = await fetch(upstream, { headers: { accept: 'application/json' } })
    if (!response.ok) return json({ error: 'upstream_unavailable', hits: [] }, 502)
    const data = await response.json()
    const hits = (Array.isArray(data.hits) ? data.hits : []).filter((hit) => {
      const tags = String(hit.tags || '')
      try {
        const imageHost = new URL(hit.webformatURL || hit.previewURL).hostname
        const pageHost = new URL(hit.pageURL).hostname
        const allowedImageHost = imageHost === 'pixabay.com' || imageHost.endsWith('.pixabay.com') || imageHost === 'pixabayusercontent.com' || imageHost.endsWith('.pixabayusercontent.com')
        return !UNSAFE_TAGS.test(tags) && allowedImageHost && (pageHost === 'pixabay.com' || pageHost.endsWith('.pixabay.com'))
      } catch {
        return false
      }
    }).slice(0, 8).map((hit) => ({
      id: hit.id,
      previewURL: `/api/media/image?url=${encodeURIComponent(hit.webformatURL || hit.previewURL || '')}`,
      pageURL: hit.pageURL,
      user: hit.user,
      tags: hit.tags,
    }))
    const result = json({ hits })
    await cache.put(cacheRequest, result.clone())
    return result
  } catch {
    return json({ error: 'upstream_unavailable', hits: [] }, 502)
  }
}
