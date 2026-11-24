import demoDocentes from '../data/demo-docentes.json'
import EsquinaPersonaje from '../components/EsquinaPersonaje'

const totalExtrasPorCuento = 2
const totalExtras = demoDocentes.cuentos.length * totalExtrasPorCuento

function contarFinalesDescubiertos() {
  return demoDocentes.cuentos
    .flatMap((cuento) =>
      cuento.finales.map((final) => ({
        cuentoId: cuento.id,
        cuento: cuento.titulo,
        emoji: cuento.emoji,
        finalId: final.id,
        nombre: final.nombre,
        cantidad: demoDocentes.estudiantes.filter((estudiante) =>
          estudiante.finalesDescubiertos.some(
            (descubrimiento) => descubrimiento.cuentoId === cuento.id && descubrimiento.finalId === final.id,
          ),
        ).length,
      })),
    )
    .filter((final) => final.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad || a.cuento.localeCompare(b.cuento))
}

export default function Docentes() {
  const finalesDescubiertos = contarFinalesDescubiertos()
  const finalesMasDescubiertos = finalesDescubiertos.slice(0, 5)

  return (
    <section className="w-full space-y-7">
      <header className="relative rounded-[2rem] border border-primavera-lila/30 bg-gradient-to-r from-primavera-cielo/20 via-white to-primavera-menta/20 px-5 py-7 text-center shadow-sm sm:px-8">
        <EsquinaPersonaje tipo="calmada" />
        <p className="text-sm font-black uppercase tracking-wide text-principal">Panel de demostración</p>
        <h1 className="mt-2 text-4xl font-black text-principal sm:text-5xl">Vista docente</h1>
        <p className="mt-2 text-lg font-bold text-texto/75">{demoDocentes.aula}</p>
        <p className="mx-auto mt-5 max-w-xl rounded-2xl border border-principal/20 bg-primavera-cielo/20 px-4 py-3 font-black text-texto">
          {demoDocentes.aviso}
        </p>
      </header>

      <section aria-labelledby="resumen-cuentos">
        <div className="mb-4">
          <h2 id="resumen-cuentos" className="text-2xl font-black text-principal sm:text-3xl">Resumen por cuento</h2>
          <p className="mt-1 text-base font-bold text-texto/75">Actividad agregada del aula de demostración.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoDocentes.cuentos.map((cuento) => {
            const terminados = demoDocentes.estudiantes.filter((estudiante) =>
              estudiante.cuentosTerminados.includes(cuento.id),
            ).length
            const extras = demoDocentes.estudiantes.reduce(
              (total, estudiante) => total + estudiante.extrasCompletados[cuento.id],
              0,
            )
            const finales = new Set(
              demoDocentes.estudiantes.flatMap((estudiante) =>
                estudiante.finalesDescubiertos
                  .filter((final) => final.cuentoId === cuento.id)
                  .map((final) => final.finalId),
              ),
            ).size

            return (
              <article key={cuento.id} className="rounded-3xl border border-principal/15 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" aria-hidden="true">{cuento.emoji}</span>
                  <h3 className="text-xl font-black text-texto">{cuento.titulo}</h3>
                </div>
                <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-fondo p-3">
                    <dt className="mt-1 text-xs font-bold text-texto/75 sm:text-sm">terminados</dt>
                    <dd className="text-2xl font-black text-principal">{terminados}</dd>
                  </div>
                  <div className="rounded-xl bg-fondo p-3">
                    <dt className="mt-1 text-xs font-bold text-texto/75 sm:text-sm">finales descubiertos</dt>
                    <dd className="text-2xl font-black text-principal">{finales}</dd>
                  </div>
                  <div className="rounded-xl bg-fondo p-3">
                    <dt className="mt-1 text-xs font-bold text-texto/75 sm:text-sm">extras completados</dt>
                    <dd className="text-2xl font-black text-principal">{extras}</dd>
                  </div>
                </dl>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="finales-descubiertos" className="rounded-3xl border border-principal/15 bg-white p-5 shadow-sm sm:p-6">
        <h2 id="finales-descubiertos" className="text-2xl font-black text-principal sm:text-3xl">Finales con más descubrimientos</h2>
        <p className="mt-1 text-base font-bold text-texto/75">Cantidad de códigos que descubrieron cada final.</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {finalesMasDescubiertos.map((final) => (
            <li key={`${final.cuentoId}-${final.finalId}`} className="flex items-center gap-3 rounded-2xl bg-fondo px-4 py-3">
              <span className="text-3xl" aria-hidden="true">{final.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-black text-texto">{final.nombre}</p>
                <p className="text-sm font-bold text-texto/70">{final.cuento}</p>
              </div>
              <span className="whitespace-nowrap rounded-full border border-principal/20 px-3 py-1 text-sm font-black text-principal">
                {final.cantidad} {final.cantidad === 1 ? 'código' : 'códigos'}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="avance-codigos">
        <div className="mb-4">
          <h2 id="avance-codigos" className="text-2xl font-black text-principal sm:text-3xl">Avance por código</h2>
          <p className="mt-1 text-base font-bold text-texto/75">Cada código corresponde a un perfil ficticio de este panel.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {demoDocentes.estudiantes.map((estudiante) => {
            const cuentosTerminados = estudiante.cuentosTerminados.length
            const extrasCompletados = Object.values(estudiante.extrasCompletados).reduce(
              (total, cantidad) => total + cantidad,
              0,
            )
            const finalesDescubiertos = estudiante.finalesDescubiertos.length

            return (
              <li key={estudiante.codigo} className="rounded-2xl border border-principal/15 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-black text-principal">{estudiante.codigo}</h3>
                <dl className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-texto/80">
                  <div className="rounded-lg bg-fondo px-3 py-2">
                    <dt className="sr-only">Cuentos terminados</dt>
                    <dd>{cuentosTerminados} de {demoDocentes.cuentos.length} cuentos</dd>
                  </div>
                  <div className="rounded-lg bg-fondo px-3 py-2">
                    <dt className="sr-only">Finales descubiertos</dt>
                    <dd>{finalesDescubiertos} finales descubiertos</dd>
                  </div>
                  <div className="rounded-lg bg-fondo px-3 py-2">
                    <dt className="sr-only">Extras completados</dt>
                    <dd>{extrasCompletados} de {totalExtras} extras</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-texto/75">
                  <span className="font-black">Cuentos terminados:</span>{' '}
                  {demoDocentes.cuentos
                    .filter((cuento) => estudiante.cuentosTerminados.includes(cuento.id))
                    .map((cuento) => cuento.titulo)
                    .join(' · ')}
                </p>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}
