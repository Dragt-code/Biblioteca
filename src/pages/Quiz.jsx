import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import cuentos from '../data/cuentos.json'

export default function Quiz() {
  const { id } = useParams()
  const cuento = cuentos.find((item) => item.id === id)
  const preguntas = cuento?.quiz ?? []
  const [estado, setEstado] = useState({
    id,
    indice: 0,
    aciertos: 0,
    resultado: null,
    finalizado: false,
  })
  const estadoActual = estado.id === id ? estado : {
    id,
    indice: 0,
    aciertos: 0,
    resultado: null,
    finalizado: false,
  }

  if (!cuento || preguntas.length === 0) {
    return (
      <section className="w-full rounded-3xl border border-primavera-coral/30 bg-gradient-to-br from-white to-primavera-cielo/15 p-6 text-center shadow-lg sm:p-10">
        <div className="text-7xl" role="img" aria-label="Libro">📖</div>
        <h1 className="mt-4 text-3xl font-black text-principal">Quiz no disponible</h1>
        <p className="mt-3 text-xl font-bold">No encontramos las preguntas de este cuento.</p>
        <Link
          to="/cuentos"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-secundario px-6 py-3 text-lg font-black text-white"
        >
          Volver a cuentos
        </Link>
      </section>
    )
  }

  const pregunta = preguntas[estadoActual.indice]

  if (estadoActual.finalizado) {
    const estrellas = estadoActual.aciertos <= 1 ? 1 : estadoActual.aciertos === 2 ? 2 : 3

    return (
      <section className="w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-7xl" role="img" aria-label={`${estrellas} estrellas`}>
          {'⭐'.repeat(estrellas)}
        </p>
        <h1 className="mt-4 text-4xl font-black text-principal">¡Terminaste el quiz!</h1>
        <p className="mt-3 text-2xl font-black text-texto">
          Acertaste {estadoActual.aciertos} de {preguntas.length}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={`/cuento/${id}`}
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal px-6 py-3 text-lg font-black text-principal"
          >
            Leer otra vez
          </Link>
          <Link
            to="/cuentos"
            className="flex min-h-12 items-center justify-center rounded-xl bg-secundario px-6 py-3 text-lg font-black text-white"
          >
            Elegir otro cuento
          </Link>
        </div>
      </section>
    )
  }

  const elegirRespuesta = (indiceOpcion) => {
    if (estadoActual.resultado === 'acierto') return

    if (indiceOpcion === pregunta.respuesta) {
      setEstado({
        ...estadoActual,
        aciertos: estadoActual.aciertos + 1,
        resultado: 'acierto',
      })
    } else {
      setEstado({
        ...estadoActual,
        resultado: 'error',
      })
    }
  }

  const avanzar = () => {
    if (estadoActual.indice === preguntas.length - 1) {
      setEstado({ ...estadoActual, finalizado: true })
      return
    }

    setEstado({
      ...estadoActual,
      indice: estadoActual.indice + 1,
      resultado: null,
    })
  }

  return (
    <section className="w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
      <div className="text-6xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</div>
      <p className="mt-3 text-base font-black text-principal sm:text-lg">
        Pregunta {estadoActual.indice + 1} de {preguntas.length}
      </p>
      <h1 className="mt-2 text-3xl font-black text-texto sm:text-4xl">{pregunta.pregunta}</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {pregunta.opciones.map((opcion, indiceOpcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => elegirRespuesta(indiceOpcion)}
            disabled={estadoActual.resultado === 'acierto'}
            className={`flex min-h-16 items-center justify-center rounded-2xl px-5 py-4 text-lg font-black transition-colors ${
              estadoActual.resultado === 'acierto' && indiceOpcion === pregunta.respuesta
                ? 'bg-secundario text-white'
                : estadoActual.resultado === 'error'
                  ? 'border-2 border-principal bg-white text-principal hover:bg-principal/10'
                  : 'border-2 border-principal bg-white text-principal hover:bg-acento'
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>

      {estadoActual.resultado === 'error' && (
        <p className="mt-5 text-xl font-black text-principal">¡Inténtalo otra vez!</p>
      )}
      {estadoActual.resultado === 'acierto' && (
        <div className="mt-5">
          <p className="text-xl font-black text-secundario">¡Muy bien! Esa es la respuesta correcta.</p>
          <button
            type="button"
            onClick={avanzar}
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-acento px-6 py-3 text-lg font-black text-texto sm:w-auto sm:mx-auto"
          >
            {estadoActual.indice === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </section>
  )
}