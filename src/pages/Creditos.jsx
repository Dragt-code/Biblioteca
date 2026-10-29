import cuentos from '../data/cuentos.json'

export default function Creditos() {
  return (
    <section className="w-full">
      <div className="rounded-3xl bg-gradient-to-r from-primavera-lila/20 via-primavera-rosa/15 to-primavera-cielo/20 px-4 py-7 text-center">
        <h1 className="text-4xl font-black text-principal sm:text-5xl">Créditos</h1>
        <p className="mt-3 text-lg font-bold text-texto/75">
          Información de los cuentos y su contenido
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cuentos.map((cuento) => (
          <article key={cuento.id} className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-principal/10 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="text-5xl" role="img" aria-label={cuento.titulo}>{cuento.emoji}</span>
              <h2 className="text-xl font-black text-texto">{cuento.titulo}</h2>
            </div>
            <dl className="mt-4 space-y-3 text-base">
              <div>
                <dt className="font-black text-principal">Autor</dt>
                <dd>{cuento.autor}</dd>
              </div>
              <div>
                <dt className="font-black text-principal">Fuente</dt>
                <dd>{cuento.fuente}</dd>
              </div>
              <div>
                <dt className="font-black text-principal">Licencia</dt>
                <dd>{cuento.licencia}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}