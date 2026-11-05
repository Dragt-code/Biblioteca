import { useState } from 'react'
import cuentos from '../data/cuentos.json'

export default function MisTareas() {
  const [respuestas, setRespuestas] = useState({})

  const obtenerSecciones = (cuento) => {
    switch (cuento.id) {
      case 'la-nube-amable':
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué hizo primero la nube para ayudar?', opciones: ['Buscó plantas sedientas', 'Construyó una casa', 'Ignoró el campo'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Cuál fue la mejor forma de ayudar al pájaro?', opciones: ['Lluvia suave y refugio seguro', 'Viento fuerte y prisa', 'Alejarse sin avisar'], respuesta: 0 },
        ]
      case 'el-leon-valiente':
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué sintió Leo antes de ayudar?', opciones: ['Nervios y miedo', 'Aburrimiento', 'Confianza total'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Cómo mostró Leo su valentía?', opciones: ['Respiró y pidió apoyo', 'Tomó una ruta sin pensar', 'Dejó al conejo solo'], respuesta: 0 },
        ]
      case 'los-amigos-del-bosque':
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué ocurrió con el puente?', opciones: ['Una tormenta lo derribó', 'Creció con flores', 'Lo pintaron'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Qué demuestra cooperación?', opciones: ['Repartir tareas y unir ideas', 'Trabajar sin avisar', 'Esperar sin colaborar'], respuesta: 0 },
        ]
      case 'la-semillita-curiosa':
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué quería descubrir la semillita?', opciones: ['Qué había sobre la tierra', 'Cómo cruzar un río', 'Dónde están las estrellas'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Cómo siguió aprendiendo?', opciones: ['Observando y preguntando', 'Dejó de mirar', 'Copió sin pensar'], respuesta: 0 },
        ]
      case 'el-pajaro-solidario':
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué encontró Pipo?', opciones: ['Un nido casi vacío', 'Una montaña helada', 'Un camino cerrado'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Cuál fue una acción solidaria?', opciones: ['Organizó ayuda y repartió tareas', 'Guardó las ramas para sí', 'Dejó el nido abandonado'], respuesta: 0 },
        ]
      default:
        return [
          { titulo: 'Comprensión', pregunta: '¿Qué esperaba la estrella?', opciones: ['Llegar el momento de brillar', 'No volver a aparecer', 'Dormir durante la noche'], respuesta: 0 },
          { titulo: 'Decisión', pregunta: '¿Cómo logró brillar mejor?', opciones: ['Esperó con calma y practicó', 'Compitió con prisa', 'Apagó su luz'], respuesta: 0 },
        ]
    }
  }

  const completarTarea = (cuentoId, indicePregunta, opcionIndice, correcta) => {
    if (opcionIndice !== correcta) return

    const clave = `${cuentoId}-${indicePregunta}`
    setRespuestas((actuales) => ({ ...actuales, [clave]: true }))
  }

  const completadas = Object.keys(respuestas).length
  const tareas = cuentos.map((cuento) => ({
    cuento,
    secciones: obtenerSecciones(cuento),
  }))

  return (
    <section className="w-full">
      <div className="rounded-[2rem] border border-primavera-lila/30 bg-gradient-to-r from-primavera-cielo/20 via-white to-primavera-rosa/20 px-5 py-7 text-center shadow-sm">
        <span className="text-6xl" role="img" aria-label="Tareas de primavera">🌱📝</span>
        <h1 className="mt-3 text-4xl font-black text-principal sm:text-5xl">Extras</h1>
        <p className="mt-2 text-lg font-bold text-texto/75">
          Completa dos retos por cuento y elige una de tres opciones
        </p>
        <p className="mt-4 inline-flex min-h-12 items-center rounded-full bg-acento px-5 py-3 font-black text-texto">
          {completadas} de {tareas.length * 2} extras completados
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tareas.map(({ cuento, secciones }, indiceTarea) => {
          return (
            <article
              key={cuento.id}
              className="flex flex-col rounded-3xl border border-primavera-lila/25 bg-white p-5 shadow-md transition-transform hover:-translate-y-1 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-5xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</span>
                <div>
                  <p className="text-sm font-black text-primavera-rosa">Extra {indiceTarea + 1}</p>
                  <h2 className="text-xl font-black text-texto">{cuento.titulo}</h2>
                </div>
              </div>
              {secciones.map((pregunta, indicePregunta) => {
                const clave = `${cuento.id}-${indicePregunta}`
                const completada = respuestas[clave]
                return (
                  <div key={pregunta.titulo} className="mt-5 border-t border-principal/10 pt-4 first:border-0 first:pt-0">
                    <p className="text-sm font-black uppercase tracking-wide text-principal">{pregunta.titulo}</p>
                    <p className="mt-2 text-lg font-black leading-snug">{pregunta.pregunta}</p>
                    <div className="mt-3 grid gap-2">
                      {pregunta.opciones.map((opcion, indiceOpcion) => {
                        const esCorrecta = indiceOpcion === pregunta.respuesta
                        return (
                          <button
                            key={opcion}
                            type="button"
                            disabled={completada}
                            onClick={() => completarTarea(cuento.id, indicePregunta, indiceOpcion, pregunta.respuesta)}
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
                    <p className={`mt-3 min-h-6 font-black ${completada ? 'text-secundario' : 'text-texto/60'}`}>
                      {completada ? '✓ Sección completada' : 'Elige la respuesta correcta'}
                    </p>
                  </div>
                )
              })}
            </article>
          )
        })}
      </div>
    </section>
  )
}
