import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cuentos from '../data/cuentos.json'
import BotonVoz from '../components/BotonVoz'

export default function Lector() {
  const { id } = useParams()
  const cuento = cuentos.find((item) => item.id === id)
  const paginas = cuento?.paginas ?? []
  const [estadoPagina, setEstadoPagina] = useState({ id, pagina: 0 })
  const [rutaElegida, setRutaElegida] = useState(null)
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

  const obtenerNovela = () => {
    switch (id) {
      case 'la-nube-amable':
        return {
          decision: '¿Cómo debe ayudar la nube a un pequeño pájaro?',
          opcionA: 'Llover suavemente sobre su camino',
          opcionB: 'Buscarle un refugio bajo las flores',
          textoA: 'La nube llovió con cuidado y abrió senderos brillantes.',
          textoAFinal: 'El pájaro encontró su camino y recordó la bondad de la nube.',
          textoB: 'La nube llevó al pájaro entre hojas y flores perfumadas.',
          textoBFinal: 'Juntos encontraron un hogar seguro y el pájaro volvió feliz.',
        }
      case 'el-leon-valiente':
        return {
          decision: '¿Cómo puede Leo ayudar al conejo?',
          opcionA: 'Cruzar primero y mostrar el camino',
          opcionB: 'Pedir ayuda a sus amigos antes de avanzar',
          textoA: 'Leo respiró hondo y mostró un camino seguro.',
          textoAFinal: 'El conejo llegó a casa: ser valiente fue confiar en su corazón.',
          textoB: 'Leo llamó a sus amigos y juntos encontraron una ruta.',
          textoBFinal: 'El conejo llegó a casa porque pedir ayuda también es valentía.',
        }
      case 'los-amigos-del-bosque':
        return {
          decision: '¿Qué deben hacer los amigos para cruzar el río?',
          opcionA: 'Construir un puente rápido entre todos',
          opcionB: 'Crear una balsa grande y sólida',
          textoA: 'Cada animal llevó ramas y ayudó a construir el puente.',
          textoAFinal: 'El puente quedó firme y todos celebraron haber cooperado.',
          textoB: 'Las hojas, ramas y cuerdas formaron una balsa resistente.',
          textoBFinal: 'La balsa cruzó el río y los amigos llegaron juntos.',
        }
      case 'la-semillita-curiosa':
        return {
          decision: '¿Qué descubre primero la semillita?',
          opcionA: 'Observar el camino de las hormigas',
          opcionB: 'Seguir el canto de los pájaros',
          textoA: 'La semillita aprendió cómo las hormigas trabajan en equipo.',
          textoAFinal: 'Su curiosidad hizo que floreciera con nuevas ideas.',
          textoB: 'La semillita descubrió dónde dormían los pájaros.',
          textoBFinal: 'Su curiosidad floreció y el jardín ganó una nueva canción.',
        }
      case 'el-pajaro-solidario':
        return {
          decision: '¿Cómo puede Pipo colaborar con el nuevo nido?',
          opcionA: 'Reunir las ramitas más fuertes',
          opcionB: 'Organizar la ayuda de todos los vecinos',
          textoA: 'Pipo llevó ramitas resistentes una por una.',
          textoAFinal: 'El nido quedó fuerte gracias a su esfuerzo solidario.',
          textoB: 'Pipo llamó a cada pájaro y repartió tareas sencillas.',
          textoBFinal: 'El nido terminó rápidamente por el trabajo compartido.',
        }
      default:
        return {
          decision: '¿Cómo espera la estrella para poder brillar?',
          opcionA: 'Practicar con paciencia cada noche',
          opcionB: 'Ayudar al cielo a esperar con calma',
          textoA: 'La estrella observó el cielo y contó cada pequeño destello.',
          textoAFinal: 'Su paciencia creó una luz clara para los viajeros.',
          textoB: 'La estrella acompañó al cielo con una luz tranquila.',
          textoBFinal: 'Todos comprendieron que esperar con calma trae belleza.',
        }
    }
  }

  const novela = obtenerNovela()
  const textoVisualNovel = (() => {
    switch (paginaActual) {
      case 0:
      case 1:
      case 2:
        return paginas[paginaActual]
      case 3:
        return novela.decision
      case 4:
        if (rutaElegida === 'a') return novela.textoA
        if (rutaElegida === 'b') return novela.textoB
        return novela.decision
      case 5:
        if (rutaElegida === 'a') return novela.textoAFinal
        if (rutaElegida === 'b') return novela.textoBFinal
        return paginas[5]
      default:
        return paginas[0]
    }
  })()
  const mostrarDecision = paginaActual === 3
  const totalPaginas = 6
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
            {textoVisualNovel}
          </p>
        </div>

        {mostrarDecision && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setRutaElegida('a')
                setEstadoPagina({ id, pagina: 4 })
              }}
              className="flex min-h-16 items-center justify-center rounded-2xl border-2 border-primavera-cielo bg-primavera-cielo/20 px-5 py-4 text-lg font-black text-texto transition-transform hover:-translate-y-1 hover:bg-primavera-cielo/35"
            >
              A. {novela.opcionA}
            </button>
            <button
              type="button"
              onClick={() => {
                setRutaElegida('b')
                setEstadoPagina({ id, pagina: 4 })
              }}
              className="flex min-h-16 items-center justify-center rounded-2xl border-2 border-primavera-rosa bg-primavera-rosa/20 px-5 py-4 text-lg font-black text-texto transition-transform hover:-translate-y-1 hover:bg-primavera-rosa/35"
            >
              B. {novela.opcionB}
            </button>
          </div>
        )}

        <div className="mt-4 flex justify-center sm:justify-end">
          <BotonVoz
            key={`${id}-${paginaActual}`}
            texto={textoVisualNovel}
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

        {mostrarDecision ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setEstadoPagina({ id, pagina: 2 })}
              className="flex min-h-12 items-center justify-center rounded-xl border-2 border-principal bg-white px-4 py-3 text-lg font-black text-principal transition-colors hover:bg-principal/10 sm:text-xl"
            >
              Anterior
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => {
                if (paginaActual === 4) {
                  setRutaElegida(null)
                  setEstadoPagina({ id, pagina: 3 })
                } else if (paginaActual === 5) {
                  setEstadoPagina({ id, pagina: 4 })
                } else {
                  setEstadoPagina({ id, pagina: Math.max(0, paginaActual - 1) })
                }
              }}
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
        )}
      </div>
    </section>
  )
}