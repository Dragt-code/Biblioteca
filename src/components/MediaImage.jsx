import { useEffect, useRef, useState } from 'react'

const mediaCache = new Map()
const CACHE_MS = 24 * 60 * 60 * 1000

export async function buscarImagenesSeguras(palabraClave) {
  const query = String(palabraClave || '').trim()
  if (!query) return []
  const key = query.toLocaleLowerCase()
  const cached = mediaCache.get(key)
  if (cached && Date.now() - cached.time < CACHE_MS) return cached.hits

  try {
    const response = await fetch(`/api/media?q=${encodeURIComponent(query)}`)
    if (!response.ok) return []
    const result = await response.json()
    const hits = Array.isArray(result.hits) ? result.hits : []
    mediaCache.set(key, { hits, time: Date.now() })
    return hits
  } catch {
    return []
  }
}

const iconByKeyword = (keyword) => {
  const normalized = keyword.toLocaleLowerCase()
  if (/estrella|espacio|luna|planeta/.test(normalized)) return '🌙'
  if (/dino/.test(normalized)) return '🦕'
  if (/flor|naturaleza|planta|semilla/.test(normalized)) return '🌼'
  if (/escuela|libro|lectura/.test(normalized)) return '📚'
  if (/mar|agua|pez/.test(normalized)) return '🐠'
  return '🦊'
}

export default function MediaImage({ keyword, className = '', label, priority = false }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(priority)
  const [image, setImage] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (visible || !containerRef.current || !('IntersectionObserver' in window)) {
      if (!('IntersectionObserver' in window)) setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '160px' })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [visible])

  useEffect(() => {
    let active = true
    setImage(null)
    setFailed(false)
    if (visible) {
      buscarImagenesSeguras(keyword).then((hits) => {
        if (active && hits.length) setImage(hits[0])
      })
    }
    return () => { active = false }
  }, [keyword, visible])

  return (
    <div ref={containerRef} className={`media-frame ${className}`} role="group" aria-label={label || `Ilustración de ${keyword}`}>
      <div className="media-placeholder" aria-hidden="true">
        <span className="media-placeholder-orbit">{iconByKeyword(keyword)}</span>
      </div>
      {image && !failed && (
        <img
          src={image.previewURL}
          alt=""
          loading="lazy"
          decoding="async"
          className="media-result"
          onError={() => setFailed(true)}
        />
      )}
      {image && !failed && (
        <a className="media-credit" href={image.pageURL} target="_blank" rel="noreferrer" aria-label={`Ver ilustración de ${image.user} en Pixabay`}>
          Pixabay · {image.user}
        </a>
      )}
    </div>
  )
}
