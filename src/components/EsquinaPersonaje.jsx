import calmada from '../assets/Calmada.png'
import leyendo from '../assets/Leyendo.png'
import pensativa from '../assets/Pensativa.png'

const imagenes = { calmada, leyendo, pensativa }

export default function EsquinaPersonaje({ tipo, className = '' }) {
  return (
    <img
      src={imagenes[tipo]}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute right-2 top-2 z-10 h-20 w-20 object-contain sm:right-4 sm:top-4 sm:h-24 sm:w-24 ${className}`}
    />
  )
}
