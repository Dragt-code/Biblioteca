export default function AnimacionAmiga({ personaje = '🦋', className = '', label = 'Personaje animado' }) {
  return (
    <span className={`animacion-amiga ${className}`} role="img" aria-label={label}>
      <span aria-hidden="true">{personaje}</span>
    </span>
  )
}
