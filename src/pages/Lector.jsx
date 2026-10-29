import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cuentos from '../data/cuentos.json'
import BotonVoz from '../components/BotonVoz'

export default function Lector() {
  const { id } = useParams()
  const cuento = cuentos.find((item) => item.id === id)
  const paginas = cuento?.paginas ?? []
  const [estadoPagina, setEstadoPagina] = useState({ id, pagina: 0 })
  const paginaActual = estadoPagina.id === id ? estadoPagina.pagina : 0

  if (!cuento) {
    return (
      <section className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-principal">Cuento no encontrado</h1>
        <Link to="/cuentos" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-secundario px-6 py-3 font-black text-white">
          Volver a cuentos
        </Link>
      </section>
    )
  }

  const totalPaginas = paginas.length
  const esUltimaPagina = paginaActual === totalPaginas - 1
  const progreso = ((paginaActual + 1) / totalPaginas) * 100

  return (
    <section className="flex w-full justify-center">
      <div className="flex w-full max-w-3xl flex-col rounded-3xl bg-white p-5 shadow-md sm:p-10">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="text-5xl sm:text-6xl" role="img" aria-label={cuento.titulo}>
            {cuento.emoji}
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-principal sm:text-base">
              {cuento.valor}
            </p>
            <h1 className="text-2xl font-black text-texto sm:text-3xl">{cuento.titulo}</h1>
          </div>
        </div>

        <div
          className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-acento/50 bg-fondo px-5 py-8 text-center sm:min-h-72 sm:px-10"
          aria-live="polite"
        >
          <p className="text-[28px] font-bold leading-relaxed sm:text-3xl">
            {paginas[paginaActual]}
          </p>
        </div>

        <div className="mt-4 flex justify-center sm:justify-end">
          <BotonVoz
            key={`${id}-${paginaActual}`}
            texto={paginas[paginaActual]}
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-base font-black text-texto/80 sm:text-lg">
            <span>Progreso</span>
            <span>Página {paginaActual + 1} de {totalPaginas}</span>
          </div>
          <div
            className="h-4 overflow-hidden rounded-full bg-principal/10"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={totalPaginas}
            aria-valuenow={paginaActual + 1}
            aria-label="Progreso del cuento"
          >
            <div
              className="h-full rounded-full bg-secundario transition-[width] duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setEstadoPagina({ id, pagina: Math.max(0, paginaActual - 1) })}
            disabled={paginaActual === 0}
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal bg-white px-4 py-3 text-lg font-black text-principal transition-colors hover:bg-principal/10 disabled:cursor-not-allowed disabled:opacity-40 sm:text-xl"
          >
            Anterior
          </button>

          {esUltimaPagina ? (
            <Link
              to={`/cuento/${id}/quiz`}
              className="flex min-h-12 items-center justify-center rounded-xl bg-acento px-4 py-3 text-center text-lg font-black text-texto shadow-sm transition-colors hover:bg-acento/75 sm:text-xl"
            >
              ¡Ir al quiz!
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setEstadoPagina({ id, pagina: Math.min(totalPaginas - 1, paginaActual + 1) })}
              className="flex min-h-12 items-center justify-center rounded-xl bg-secundario px-4 py-3 text-lg font-black text-white transition-colors hover:bg-principal sm:text-xl"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </section>
  )
}