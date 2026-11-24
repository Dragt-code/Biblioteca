import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/Log.png'
import { useSeguimiento } from '../hooks/seguimiento'

const navLinkClassName = ({ isActive }) =>
  `flex min-h-11 items-center justify-center rounded-xl px-3 py-2 text-sm font-extrabold transition-all sm:px-4 sm:text-base ${isActive ? 'bg-principal text-white shadow-sm' : 'text-texto/80 hover:bg-principal/8 hover:text-principal focus-visible:bg-principal/10'}`

export default function Layout() {
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem('modo-mundo-letras') === 'oscuro')
  const seguimiento = useSeguimiento()

  useEffect(() => {
    document.documentElement.dataset.theme = modoOscuro ? 'dark' : 'light'
    localStorage.setItem('modo-mundo-letras', modoOscuro ? 'oscuro' : 'claro')
  }, [modoOscuro])

  return (
    <div className="flex min-h-screen flex-col bg-fondo font-sans text-texto">
      <header className="sticky top-0 z-30 border-b border-primavera-lila/20 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between sm:px-6 lg:px-8">
          <NavLink to="/" end className="flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-lg font-black tracking-tight text-principal sm:justify-start sm:text-xl">
            <img src={logo} alt="" className="h-14 w-14 rounded-xl object-contain" />
            <span>MUNDO DE LETRAS</span>
          </NavLink>
          <nav aria-label="Navegación principal" className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 md:flex md:flex-wrap md:justify-end">
            <NavLink to="/" end className={navLinkClassName}>Inicio</NavLink>
            <NavLink to="/cuentos" className={navLinkClassName}>Cuentos</NavLink>
            <NavLink to="/tareas" className={navLinkClassName}>Extras</NavLink>
            <NavLink to="/docentes" className={navLinkClassName}>Docentes</NavLink>
            <button type="button" onClick={() => setModoOscuro((actual) => !actual)} className="flex min-h-11 items-center justify-center rounded-xl border border-principal/15 px-3 py-2 text-lg font-black text-principal transition-colors hover:bg-principal/8" aria-label={modoOscuro ? 'Activar modo claro' : 'Activar modo oscuro'} title={modoOscuro ? 'Modo claro' : 'Modo oscuro'}>
              <span aria-hidden="true">{modoOscuro ? '☀️' : '🌙'}</span>
            </button>
            <NavLink to="/creditos" className={`${navLinkClassName({ isActive: false })} border border-primavera-lila/30`}>Créditos</NavLink>
          </nav>
          <div className="flex items-center justify-center gap-2 self-center rounded-full bg-acento/35 px-3 py-1 text-xs font-black text-principal md:self-auto" title="Progreso guardado en este navegador">
            <span>Mi ID: {seguimiento.id.slice(0, 12)}</span><span aria-hidden="true">·</span><span>⭐ {seguimiento.puntos} puntos</span>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Outlet />
      </main>
      <footer className="border-t border-principal/10 bg-white/75 px-4 py-5 text-center text-sm text-texto/70 backdrop-blur sm:text-base">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3">
          <span aria-hidden="true">⭐</span>
          <p>MUNDO DE LETRAS — Un mundo de historias para compartir</p>
        </div>
      </footer>
    </div>
  )
}
