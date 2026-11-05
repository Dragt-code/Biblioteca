import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navLinkClassName = ({ isActive }) =>
  `flex min-h-12 items-center justify-center rounded-xl px-4 py-3 text-base font-bold transition-colors sm:text-lg ${
    isActive
      ? 'bg-principal text-white shadow-md'
      : 'text-texto hover:bg-acento/50 focus-visible:bg-acento/50'
  }`

export default function Layout() {
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem('modo-mundo-letras') === 'oscuro')

  useEffect(() => {
    document.documentElement.dataset.theme = modoOscuro ? 'dark' : 'light'
    localStorage.setItem('modo-mundo-letras', modoOscuro ? 'oscuro' : 'claro')
  }, [modoOscuro])

  return (
    <div className="flex min-h-screen flex-col bg-fondo font-sans text-texto">
      <header className="border-b border-primavera-lila/30 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between sm:px-6">
          <NavLink
            to="/"
            end
            className="flex min-h-12 items-center justify-center rounded-xl bg-primavera-cielo/30 px-4 text-xl font-black text-principal ring-1 ring-principal/15 sm:justify-start sm:text-2xl"
          >
            MUNDO DE LETRAS
          </NavLink>

          <nav aria-label="Navegacion principal" className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:flex-wrap md:justify-end">
            <NavLink to="/" end className={navLinkClassName}>
              Inicio
            </NavLink>
            <NavLink to="/cuentos" className={navLinkClassName}>
              Cuentos
            </NavLink>
            <NavLink to="/tareas" className={navLinkClassName}>
              Extras
            </NavLink>
            <button
              type="button"
              onClick={() => setModoOscuro((actual) => !actual)}
              className="flex min-h-12 items-center justify-center rounded-xl border border-principal/20 px-4 py-3 text-xl font-black text-principal hover:bg-acento/35"
              aria-label={modoOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={modoOscuro ? 'Modo claro' : 'Modo oscuro'}
            >
              <span aria-hidden="true">{modoOscuro ? '☀️' : '🌙'}</span>
            </button>
            <NavLink
              to="/creditos"
              className={`${navLinkClassName({ isActive: false })} md:ml-5 border border-primavera-lila/40`}
            >
              Créditos
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-principal/10 bg-white px-4 py-5 text-center text-sm text-texto/75 sm:text-base">
        <p>MUNDO DE LETRAS — Un mundo de historias para compartir</p>
      </footer>
    </div>
  )
}
