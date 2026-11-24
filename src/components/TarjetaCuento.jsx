import { Link } from 'react-router-dom'
import imagenNube from '../assets/Nube amigable.jpg'
import imagenLeon from '../assets/Leon valiente.jpg'
import imagenBosque from '../assets/Amigos del bosque.jpg'
import imagenSemilla from '../assets/Semilla curiosa.jpg'
import imagenPajaro from '../assets/Pajaro solidario.jpg'
import imagenEstrella from '../assets/Estrella paciente.jpg'

const portadas = {
  'la-nube-amable': imagenNube,
  'el-leon-valiente': imagenLeon,
  'los-amigos-del-bosque': imagenBosque,
  'la-semillita-curiosa': imagenSemilla,
  'el-pajaro-solidario': imagenPajaro,
  'la-estrella-paciente': imagenEstrella,
}

export default function TarjetaCuento({ cuento }) {
  const { id, titulo, valor } = cuento

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-md ring-1 ring-primavera-lila/20 transition duration-300 hover:-translate-y-2 hover:rotate-[0.4deg] hover:shadow-xl">
      <div className="h-52 overflow-hidden bg-fondo sm:h-60">
        <img src={portadas[id]} alt={`Portada de ${titulo}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
          <span className="mr-2" aria-hidden="true">📖</span> Leer
        </Link>
      </div>
    </article>
  )
}
