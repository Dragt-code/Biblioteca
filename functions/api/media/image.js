const ALLOWED_IMAGE_HOSTS = new Set(['pixabay.com', 'pixabayusercontent.com'])

export async function onRequestGet({ request }) {
  const source = new URL(request.url).searchParams.get('url')
  if (!source) return new Response('Missing image URL', { status: 400 })

  let imageUrl
  try {
    imageUrl = new URL(source)
  } catch {
    return new Response('Invalid image URL', { status: 400 })
  }
  if (imageUrl.protocol !== 'https:' || ![...ALLOWED_IMAGE_HOSTS].some((host) => imageUrl.hostname === host || imageUrl.hostname.endsWith(`.${host}`))) {
    return new Response('Image host not allowed', { status: 403 })
  }

  const cacheRequest = new Request(imageUrl.toString(), request)
  const cache = caches.default
  const cached = await cache.match(cacheRequest)
  if (cached) return cached

  try {
    const upstream = await fetch(imageUrl, { headers: { accept: 'image/*' } })
    const contentType = upstream.headers.get('content-type') || ''
    if (!upstream.ok || !contentType.startsWith('image/')) return new Response('Image unavailable', { status: 502 })
    const response = new Response(upstream.body, {
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=86400, s-maxage=86400',
        'x-content-type-options': 'nosniff',
      },
    })
    await cache.put(cacheRequest, response.clone())
    return response
  } catch {
    return new Response('Image unavailable', { status: 502 })
  }
}
