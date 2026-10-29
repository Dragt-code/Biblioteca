import { Link } from 'react-router-dom'

export default function TarjetaCuento({ cuento }) {
  const { id, titulo, valor, emoji } = cuento
  const fondos = {
    'la-nube-amable': 'bg-primavera-cielo/25',
    'el-leon-valiente': 'bg-acento/25',
    'los-amigos-del-bosque': 'bg-primavera-menta/45',
    'la-semillita-curiosa': 'bg-secundario/15',
    'el-pajaro-solidario': 'bg-primavera-coral/25',
    'la-estrella-paciente': 'bg-primavera-lila/25',
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-md ring-1 ring-primavera-lila/20 transition duration-300 hover:-translate-y-2 hover:rotate-[0.4deg] hover:shadow-xl">
      <div className={`flex min-h-48 items-center justify-center text-8xl sm:min-h-52 ${fondos[id] ?? 'bg-primavera-rosa/20'}`} role="img" aria-label={`Portada de ${titulo}`}>
        <span className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{emoji}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-xl font-black leading-tight text-texto sm:text-2xl">{titulo}</h2>
        <p className="mt-2 text-base font-bold text-principal sm:text-lg">
          Valor: <span className="text-texto">{valor}</span>
        </p>

        <Link
          to={`/cuento/${id}`}
          className="mt-auto flex min-h-12 items-center justify-center rounded-xl bg-secundario px-5 py-3 text-lg font-black text-white transition-colors hover:bg-principal focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-acento"
        >
          Leer
        </Link>
      </div>
    </article>
  )
}