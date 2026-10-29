import { useState } from 'react'
import cuentos from '../data/cuentos.json'

export default function MisTareas() {
  const [respuestas, setRespuestas] = useState({})

  const completarTarea = (cuentoId, indicePregunta, opcionIndice, correcta) => {
    if (opcionIndice !== correcta) return

    const clave = `${cuentoId}-${indicePregunta}`
    setRespuestas((actuales) => ({ ...actuales, [clave]: true }))
  }

  const completadas = Object.keys(respuestas).length
  const tareas = cuentos.map((cuento, indice) => ({
    cuento,
    pregunta: cuento.quiz[indice % cuento.quiz.length],
  }))

  return (
    <section className="w-full">
      <div className="rounded-[2rem] border border-primavera-lila/30 bg-gradient-to-r from-primavera-cielo/20 via-white to-primavera-rosa/20 px-5 py-7 text-center shadow-sm">
        <span className="text-6xl" role="img" aria-label="Tareas de primavera">🌱📝</span>
        <h1 className="mt-3 text-4xl font-black text-principal sm:text-5xl">Mis tareas</h1>
        <p className="mt-2 text-lg font-bold text-texto/75">
          Responde una pregunta de comprensión de cada cuento
        </p>
        <p className="mt-4 inline-flex min-h-12 items-center rounded-full bg-acento px-5 py-3 font-black text-texto">
          {completadas} de {tareas.length} tareas listas
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tareas.map(({ cuento, pregunta }, indiceTarea) => {
          const clave = `${cuento.id}-${indiceTarea}`
          const completada = respuestas[clave]

          return (
            <article
              key={cuento.id}
              className={`flex flex-col rounded-3xl border p-5 shadow-md transition-transform hover:-translate-y-1 sm:p-6 ${
                completada
                  ? 'border-secundario/40 bg-primavera-menta/35'
                  : 'border-primavera-lila/25 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-5xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</span>
                <div>
                  <p className="text-sm font-black text-primavera-rosa">Tarea {indiceTarea + 1}</p>
                  <h2 className="text-xl font-black text-texto">{cuento.titulo}</h2>
                </div>
              </div>

              <p className="mt-5 text-lg font-black leading-snug">{pregunta.pregunta}</p>

              <div className="mt-4 grid gap-2">
                {pregunta.opciones.map((opcion, indiceOpcion) => {
                  const esCorrecta = indiceOpcion === pregunta.respuesta
                  return (
                    <button
                      key={opcion}
                      type="button"
                      disabled={completada}
                      onClick={() => completarTarea(cuento.id, indiceTarea, indiceOpcion, pregunta.respuesta)}
                      className={`flex min-h-12 items-center rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                        completada && esCorrecta
                          ? 'bg-secundario text-white'
                          : completada
                            ? 'bg-primavera-lila/15 text-texto/50'
                            : 'border border-principal/20 bg-fondo text-texto hover:bg-acento/35'
                      }`}
                    >
                      {opcion}
                    </button>
                  )
                })}
              </div>

              <p className={`mt-4 min-h-7 font-black ${completada ? 'text-secundario' : 'text-texto/60'}`}>
                {completada ? '✓ ¡Tarea completada!' : 'Elige la respuesta correcta'}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
