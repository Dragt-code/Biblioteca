import { useEffect, useState } from 'react'

export default function BotonVoz({ texto }) {
  const soportaVoz =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  const [leyendo, setLeyendo] = useState(false)

  useEffect(() => {
    return () => {
      if (soportaVoz) {
        window.speechSynthesis.cancel()
      }
    }
  }, [soportaVoz])

  if (!soportaVoz) {
    return null
  }

  const manejarVoz = () => {
    if (leyendo) {
      window.speechSynthesis.cancel()
      setLeyendo(false)
      return
    }

    window.speechSynthesis.cancel()

    const mensaje = new SpeechSynthesisUtterance(texto)
    mensaje.lang = 'es-ES'
    mensaje.rate = 0.85
    mensaje.onstart = () => setLeyendo(true)
    mensaje.onend = () => setLeyendo(false)
    mensaje.onerror = () => setLeyendo(false)

    window.speechSynthesis.speak(mensaje)
  }

  return (
    <button
      type="button"
      onClick={manejarVoz}
      aria-label={leyendo ? 'Detener lectura en voz alta' : 'Escuchar esta página'}
      aria-pressed={leyendo}
      className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-lg font-black transition-colors sm:w-auto ${
        leyendo
          ? 'bg-principal text-white shadow-md ring-4 ring-acento/60'
          : 'border-2 border-principal bg-white text-principal hover:bg-principal/10'
      }`}
    >
      <span aria-hidden="true">{leyendo ? '🔊' : '🎧'}</span>
      <span>{leyendo ? 'Detener voz' : 'Escuchar'}</span>
    </button>
  )
}