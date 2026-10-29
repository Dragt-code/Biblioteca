import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] border border-primavera-lila/30 bg-gradient-to-br from-white via-primavera-menta/20 to-primavera-cielo/20 p-5 shadow-lg sm:p-10">
      <span className="absolute left-5 top-5 text-4xl sm:text-5xl" aria-hidden="true">🌸</span>
      <span className="absolute bottom-5 right-5 text-4xl sm:text-5xl" aria-hidden="true">🦋</span>
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <div
          className="emoji-suave mb-4 select-none text-7xl sm:mb-6 sm:text-9xl"
          role="img"
          aria-label="Libro abierto"
        >
          📚
        </div>

        <h1 className="text-4xl font-black leading-tight text-principal sm:text-6xl">
          ¡Hola, pequeño explorador!
        </h1>
        <p className="mt-4 max-w-xl text-xl font-bold text-texto sm:text-2xl">
          Cada cuento guarda una aventura esperándote.
        </p>

        <Link
          to="/cuentos"
          className="mt-8 flex min-h-16 w-full max-w-md items-center justify-center rounded-2xl bg-secundario px-6 py-4 text-xl font-black text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-acento sm:text-2xl"
        >
          ¡A leer cuentos!
        </Link>
      </div>
    </section>
  )
}