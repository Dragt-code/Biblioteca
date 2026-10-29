export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 text-center">
        <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
          Prototipo Listo 🚀
        </span>
        
        <h1 className="text-3xl font-bold mt-4 tracking-tight">
          Vite + React + Tailwind v4
        </h1>
        
        <p className="text-slate-400 mt-2 text-sm">
          El entorno está configurado. Ya puedes empezar a borrar este código y construir tu idea.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors text-slate-950 font-medium rounded-lg text-sm cursor-pointer">
            Iniciar Acción
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors text-white font-medium rounded-lg text-sm border border-slate-600 cursor-pointer">
            Saber más
          </button>
        </div>
      </div>
    </div>
  )
}
