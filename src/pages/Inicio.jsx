import { Link } from 'react-router-dom'
import AnimacionAmiga from '../components/AnimacionAmiga'
import portada from '../assets/Portada.png'

export default function Inicio() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] border border-primavera-lila/30 bg-gradient-to-br from-white via-primavera-menta/20 to-primavera-cielo/20 p-5 shadow-lg sm:p-10">
      <AnimacionAmiga personaje="🌼" className="absolute left-5 top-5" label="Flor que se balancea" />
      <AnimacionAmiga personaje="🦋" className="absolute bottom-5 right-5" label="Mariposa que vuela" />
      <div className="grid w-full max-w-5xl items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 select-none text-7xl sm:mb-6 sm:text-9xl" role="img" aria-label="Libro abierto">📚</div>
          <h1 className="text-4xl font-black leading-tight text-principal sm:text-6xl">¡Tu próxima aventura empieza aquí!</h1>
          <p className="mt-4 max-w-xl text-xl font-bold text-texto sm:text-2xl">
            Lee historias increíbles, descubre nuevos caminos y pon a prueba tu imaginación.
          </p>
          <Link to="/cuentos" className="mt-8 flex min-h-16 w-full max-w-md items-center justify-center rounded-2xl bg-secundario px-6 py-4 text-xl font-black text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-acento sm:text-2xl">
            <span className="mr-2" aria-hidden="true">✨</span> ¡A leer cuentos!
          </Link>
        </div>
        <div className="hero-media mx-auto flex w-full max-w-md items-center justify-center rounded-3xl bg-white/70 p-4">
          <img src={portada} alt="Niño leyendo en una tableta" className="max-h-80 w-full object-contain" />
        </div>
      </div>
    </section>
  )
}
