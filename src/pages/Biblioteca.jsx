import TarjetaCuento from '../components/TarjetaCuento'
import cuentos from '../data/cuentos.json'

export default function Biblioteca() {
  return (
    <section className="w-full">
      <div className="mb-6 text-center sm:mb-8">
        <span className="text-5xl" role="img" aria-label="Flores">🌼🌷</span>
        <h1 className="mt-2 text-4xl font-black text-principal sm:text-5xl">Elige un cuento</h1>
        <p className="mt-3 text-lg font-bold text-texto/75 sm:text-xl">
          Hay una aventura esperándote
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {cuentos.map((cuento) => (
          <TarjetaCuento key={cuento.id} cuento={cuento} />
        ))}
      </div>
    </section>
  )
}