import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cuentos from '../data/cuentos.json'
import BotonVoz from '../components/BotonVoz'
import { registrarEvento } from '../hooks/seguimiento'

const PAGINA_DECISION = 4 // la quinta sección (índice 4) es la decisión
const TOTAL_PAGINAS = 8 // 5 comunes + 3 del camino elegido

// Colores de los tres botones de decisión (A, B, C)
const ESTILOS_OPCION = {
  a: 'border-primavera-cielo bg-primavera-cielo/20 hover:bg-primavera-cielo/35',
  b: 'border-primavera-rosa bg-primavera-rosa/20 hover:bg-primavera-rosa/35',
  c: 'border-primavera-menta bg-primavera-menta/25 hover:bg-primavera-menta/40',
}

export default function Lector() {
  const { id } = useParams()
  const cuento = cuentos.find((item) => item.id === id)
  const [estado, setEstado] = useState({ id, pagina: 0, ruta: null })
  const [segundos, setSegundos] = useState(0)
  const [espera, setEspera] = useState(5)
  const finalRegistrado = useRef('')
  const paginaInicial = estado.id === id ? estado.pagina : 0
  const rutaInicial = estado.id === id ? estado.ruta : null
  const ultimaSeccionInicial = paginaInicial === TOTAL_PAGINAS - 1 && Boolean(rutaInicial)
  useEffect(() => {
    setSegundos(0)
    setEspera(5)
    const timerLectura = window.setInterval(() => setSegundos((valor) => valor + 1), 1000)
    const timerEspera = window.setInterval(() => setEspera((valor) => Math.max(0, valor - 1)), 1000)
    return () => { window.clearInterval(timerLectura); window.clearInterval(timerEspera) }
  }, [id, paginaInicial, rutaInicial])
  useEffect(() => {
    if (!ultimaSeccionInicial || !cuento) return
    const claveFinal = `${id}:${rutaInicial}`
    if (finalRegistrado.current !== claveFinal) {
      finalRegistrado.current = claveFinal
      registrarEvento('cuento_finalizado', { cuentoId: id, titulo: cuento.titulo, ruta: rutaInicial })
    }
  }, [ultimaSeccionInicial, id, rutaInicial, cuento])

  const formatoValido = cuento && Array.isArray(cuento.secciones) && cuento.caminos && cuento.decision

  if (!formatoValido) {
    return (
      <section className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-principal">Cuento no encontrado</h1>
        <Link to="/cuentos" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-secundario px-6 py-3 font-black text-white">
          Volver a cuentos
        </Link>
      </section>
    )
  }

  // Si cambia el cuento, se vuelve a empezar desde la primera página
  const { pagina: paginaGuardada, ruta } = estado.id === id ? estado : { pagina: 0, ruta: null }
  // Nunca se muestran páginas del camino sin haber elegido uno
  const paginaActual = paginaGuardada > PAGINA_DECISION && !ruta ? PAGINA_DECISION : paginaGuardada

  const irA = (pagina, nuevaRuta = ruta) => setEstado({ id, pagina, ruta: nuevaRuta })

  const seccionesComunes = cuento.secciones
  const seccionesCamino = ruta ? cuento.caminos[ruta].secciones : []
  const seccionActual =
    paginaActual < seccionesComunes.length
      ? seccionesComunes[paginaActual]
      : seccionesCamino[paginaActual - seccionesComunes.length]

  const camino = ruta ? cuento.caminos[ruta] : null
  const mostrarDecision = paginaActual === PAGINA_DECISION
  const esUltimaPagina = paginaActual === TOTAL_PAGINAS - 1
  const progreso = ((paginaActual + 1) / TOTAL_PAGINAS) * 100
  const textoPagina = seccionActual?.texto ?? ''
  const textoVoz = mostrarDecision ? `${textoPagina}\n\n${cuento.decision.pregunta}` : textoPagina
  const volver = () => {
    if (paginaActual === PAGINA_DECISION + 1) {
      // Al volver a la decisión se borra la elección para poder elegir otro camino
      irA(PAGINA_DECISION, null)
    } else {
      irA(Math.max(0, paginaActual - 1))
    }
  }
  const elegirCamino = (caminoElegido) => {
    registrarEvento('ruta_elegida', { cuentoId: id, titulo: cuento.titulo, ruta: caminoElegido })
    irA(PAGINA_DECISION + 1, caminoElegido)
  }

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
          className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-acento/50 bg-fondo px-5 py-8 sm:min-h-72 sm:px-10"
          aria-live="polite"
        >
          <div className="w-full">
            <p className="mb-4 text-center text-sm font-black uppercase tracking-wide text-principal">
              {camino ? `${camino.emoji} ${seccionActual?.titulo}` : seccionActual?.titulo}
            </p>
            <p className="whitespace-pre-line text-left text-lg font-bold leading-relaxed sm:text-2xl">
              {textoPagina}
            </p>
          </div>
        </div>

        {mostrarDecision && (
          <div className="mt-4">
            <p className="mb-3 text-center text-lg font-black text-texto sm:text-xl">
              {cuento.decision.pregunta}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {cuento.decision.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  type="button"
                  onClick={() => elegirCamino(opcion.camino)}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-4 py-4 text-center text-lg font-black text-texto transition-transform hover:-translate-y-1 ${ESTILOS_OPCION[opcion.id]}`}
                >
                  <span className="text-3xl" aria-hidden="true">{opcion.emoji}</span>
                  <span>{opcion.texto}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center sm:justify-end">
          <BotonVoz key={`${id}-${paginaActual}-${ruta ?? 'comun'}`} texto={textoVoz} />
        </div>
        <p className="mt-3 text-center text-sm font-bold text-texto/70" aria-live="polite">⏱ Tiempo en esta sección: {Math.floor(segundos / 60)}:{String(segundos % 60).padStart(2, '0')}</p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-base font-black text-texto/80 sm:text-lg">
            <span>Progreso</span>
            <span>Página {paginaActual + 1} de {TOTAL_PAGINAS}</span>
          </div>
          <div
            className="h-4 overflow-hidden rounded-full bg-principal/10"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={TOTAL_PAGINAS}
            aria-valuenow={paginaActual + 1}
            aria-label="Progreso del cuento"
          >
            <div
              className="h-full rounded-full bg-secundario transition-[width] duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {mostrarDecision ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={volver}
              className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal bg-white px-4 py-3 text-lg font-black text-principal transition-colors hover:bg-principal/10 sm:text-xl"
            >
              Anterior
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
            <button
              type="button"
              onClick={volver}
              disabled={paginaActual === 0}
              className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal bg-white px-4 py-3 text-lg font-black text-principal transition-colors hover:bg-principal/10 disabled:cursor-not-allowed disabled:opacity-40 sm:text-xl"
            >
              Anterior
            </button>

            {esUltimaPagina ? (
              <Link
                to={`/cuento/${id}/quiz?camino=${ruta}`}
                className="flex min-h-12 items-center justify-center rounded-xl bg-acento px-4 py-3 text-center text-lg font-black text-texto shadow-sm transition-colors hover:bg-acento/75 sm:text-xl"
              >
                ¡Ir al quiz!
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => irA(paginaActual + 1)}
                disabled={espera > 0}
                className="flex min-h-12 items-center justify-center rounded-xl bg-secundario px-4 py-3 text-lg font-black text-white transition-colors hover:bg-principal disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl"
              >
                {espera > 0 ? `Continúa en ${espera} s` : 'Siguiente'}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
