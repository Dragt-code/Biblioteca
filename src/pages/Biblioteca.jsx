import TarjetaCuento from '../components/TarjetaCuento'
import cuentos from '../data/cuentos.json'
import MediaImage from '../components/MediaImage'
import EsquinaPersonaje from '../components/EsquinaPersonaje'

export default function Biblioteca() {
  return (
    <section className="w-full">
      <div className="relative mb-6 text-center sm:mb-8">
        <EsquinaPersonaje tipo="leyendo" />
        <span className="text-5xl" role="img" aria-label="Flores">🌼🌷</span>
        <h1 className="mt-2 text-4xl font-black text-principal sm:text-5xl">Elige un cuento</h1>
        <p className="mt-3 text-lg font-bold text-texto/75 sm:text-xl">
          Hay una aventura esperándote
        </p>
      </div>

      <div className="mb-7 grid items-center gap-4 rounded-3xl border border-primavera-lila/25 bg-white/85 p-4 shadow-sm sm:grid-cols-[8rem_1fr] sm:p-5">
        <MediaImage keyword="libros y estrellas" className="h-28 w-full rounded-2xl sm:h-32" label="Libros y estrellas ilustrados" />
        <div>
          <p className="text-lg font-black text-principal">Un rincón lleno de imaginación</p>
          <p className="font-bold text-texto/75">Elige un cuento y encuentra una nueva amistad en cada página.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {cuentos.map((cuento) => (
          <TarjetaCuento key={cuento.id} cuento={cuento} />
        ))}
      </div>
    </section>
  )
}
