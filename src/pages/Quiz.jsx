import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import cuentos from '../data/cuentos.json'
import { registrarEvento } from '../hooks/seguimiento'
import EsquinaPersonaje from '../components/EsquinaPersonaje'

export default function Quiz() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const camino = searchParams.get('camino')
  const clave = `${id}-${camino}`

  const cuento = cuentos.find((item) => item.id === id)

  const inicial = {
    clave,
    indice: 0,
    aciertos: 0,
    resultado: null, // 'acierto' | 'error' | 'reflexion' | null
    huboError: false, // si ya se falló esta pregunta (para contar solo el primer intento)
    seleccion: null, // opción elegida en las preguntas de reflexión
    finalizado: false,
  }
  const [estado, setEstado] = useState(inicial)
  const idSesionQuiz = useRef(crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)
  const estadoActual = estado.clave === clave ? estado : inicial

  const quizNuevo = cuento?.quiz && !Array.isArray(cuento.quiz) && cuento.quiz.comunes
  useEffect(() => {
    if (estadoActual.finalizado && cuento && camino) {
      registrarEvento('quiz_finalizado', { cuentoId: id, titulo: cuento.titulo, ruta: camino, aciertos: estadoActual.aciertos }, `quiz:${idSesionQuiz.current}`)
    }
  }, [estadoActual.finalizado, estadoActual.aciertos, id, camino, cuento])

  if (!cuento || !quizNuevo) {
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

  // Sin un camino válido no se sabe qué preguntas mostrar: se invita a leer el cuento
  if (!camino || !cuento.caminos?.[camino]) {
    return (
      <section className="relative w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
        <EsquinaPersonaje tipo="pensativa" />
        <div className="text-7xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</div>
        <h1 className="mt-4 text-3xl font-black text-principal">Primero lee el cuento</h1>
        <p className="mt-3 text-xl font-bold">
          Las preguntas dependen del camino que elijas en la historia.
        </p>
        <Link
          to={`/cuento/${id}`}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-secundario px-6 py-3 text-lg font-black text-white"
        >
          Leer el cuento
        </Link>
      </section>
    )
  }

  const infoCamino = cuento.caminos[camino]
  const reflexion = cuento.quiz.reflexion

  // Orden: comunes → del camino → reflexión (sin respuesta correcta)
  const preguntas = [
    ...cuento.quiz.comunes,
    ...cuento.quiz.porCamino[camino],
    ...reflexion.porCamino[camino].preguntas,
  ]
  const totalPuntuables = preguntas.filter((p) => p.tipo !== 'reflexion').length

  useEffect(() => {
    if (estadoActual.finalizado) {
      registrarEvento('quiz_finalizado', { cuentoId: id, titulo: cuento.titulo, ruta: camino, aciertos: estadoActual.aciertos }, `quiz:${idSesionQuiz.current}`)
    }
  }, [estadoActual.finalizado, estadoActual.aciertos, id, camino, cuento.titulo])

  if (estadoActual.finalizado) {
    const estrellas =
      estadoActual.aciertos === totalPuntuables ? 3 : estadoActual.aciertos >= totalPuntuables / 2 ? 2 : 1

    return (
      <section className="w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-7xl" role="img" aria-label={`${estrellas} estrellas`}>
          {'⭐'.repeat(estrellas)}
        </p>
        <h1 className="mt-4 text-4xl font-black text-principal">¡Terminaste el quiz!</h1>
        <p className="mt-3 text-2xl font-black text-texto">
          Acertaste {estadoActual.aciertos} de {totalPuntuables} a la primera
        </p>

        <div className="mt-6 rounded-2xl border border-acento/50 bg-fondo p-5 text-left sm:p-6">
          <p className="text-lg font-black text-principal">
            <span role="img" aria-hidden="true">{infoCamino.emoji}</span> {infoCamino.titulo}
          </p>
          <p className="mt-2 text-xl font-bold leading-relaxed">
            {reflexion.porCamino[camino].mensajeFinal}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border-2 border-primavera-menta bg-primavera-menta/20 p-5 text-left sm:p-6">
          <p className="text-lg font-black text-principal">
            <span role="img" aria-hidden="true">💭</span> Para pensar
          </p>
          <p className="mt-2 text-xl font-bold leading-relaxed">{reflexion.comun.pregunta}</p>
          {reflexion.comun.sugerencia && (
            <p className="mt-2 text-lg font-bold text-texto/80">{reflexion.comun.sugerencia}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={`/cuento/${id}`}
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal px-6 py-3 text-lg font-black text-principal"
          >
            Leer otra vez y elegir otro camino
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

  const pregunta = preguntas[estadoActual.indice]
  const esReflexion = pregunta.tipo === 'reflexion'
  const esUltima = estadoActual.indice === preguntas.length - 1

  const elegirRespuesta = (indiceOpcion) => {
    if (esReflexion) {
      // No hay respuesta correcta: se puede cambiar la elección antes de seguir
      setEstado({ ...estadoActual, seleccion: indiceOpcion, resultado: 'reflexion' })
      return
    }

    if (estadoActual.resultado === 'acierto') return

    if (indiceOpcion === pregunta.respuesta) {
      setEstado({
        ...estadoActual,
        aciertos: estadoActual.aciertos + (estadoActual.huboError ? 0 : 1),
        resultado: 'acierto',
      })
    } else {
      setEstado({ ...estadoActual, resultado: 'error', huboError: true })
    }
  }

  const avanzar = () => {
    if (esUltima) {
      setEstado({ ...estadoActual, finalizado: true })
      return
    }

    setEstado({
      ...estadoActual,
      indice: estadoActual.indice + 1,
      resultado: null,
      huboError: false,
      seleccion: null,
    })
  }

  const claseOpcion = (indiceOpcion) => {
    if (esReflexion) {
      return estadoActual.seleccion === indiceOpcion
        ? 'border-2 border-secundario bg-secundario/15 text-texto'
        : 'border-2 border-principal bg-white text-principal hover:bg-acento'
    }
    if (estadoActual.resultado === 'acierto' && indiceOpcion === pregunta.respuesta) {
      return 'bg-secundario text-white'
    }
    if (estadoActual.resultado === 'error') {
      return 'border-2 border-principal bg-white text-principal hover:bg-principal/10'
    }
    return 'border-2 border-principal bg-white text-principal hover:bg-acento'
  }

  return (
    <section className="relative w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
      <EsquinaPersonaje tipo="pensativa" />
      <div className="text-6xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</div>
      <p className="mt-3 text-base font-black text-principal sm:text-lg">
        Pregunta {estadoActual.indice + 1} de {preguntas.length}
      </p>

      {esReflexion && (
        <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-primavera-menta/30 px-4 py-2 text-base font-black text-texto">
          <span role="img" aria-hidden="true">💭</span> Para pensar: aquí no hay respuesta correcta
        </p>
      )}

      <h1 className="mt-3 text-2xl font-black text-texto sm:text-3xl">{pregunta.pregunta}</h1>

      <div className="mx-auto mt-6 grid max-w-2xl gap-3">
        {pregunta.opciones.map((opcion, indiceOpcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => elegirRespuesta(indiceOpcion)}
            disabled={!esReflexion && estadoActual.resultado === 'acierto'}
            aria-pressed={esReflexion ? estadoActual.seleccion === indiceOpcion : undefined}
            className={`flex min-h-16 items-center justify-center rounded-2xl px-5 py-4 text-lg font-black transition-colors ${claseOpcion(indiceOpcion)}`}
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
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-acento px-6 py-3 text-lg font-black text-texto sm:mx-auto sm:w-auto"
          >
            {esUltima ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}

      {estadoActual.resultado === 'reflexion' && (
        <div className="mt-5">
          <p className="text-xl font-black text-secundario">
            Gracias por contarlo. Pensar por qué elegimos algo también es aprender.
          </p>
          <button
            type="button"
            onClick={avanzar}
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-acento px-6 py-3 text-lg font-black text-texto sm:mx-auto sm:w-auto"
          >
            {esUltima ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </section>
  )
}
