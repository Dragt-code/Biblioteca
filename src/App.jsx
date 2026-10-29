import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Biblioteca from './pages/Biblioteca'
import Creditos from './pages/Creditos'
import Inicio from './pages/Inicio'
import Lector from './pages/Lector'
import Quiz from './pages/Quiz'
import MisTareas from './pages/MisTareas'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="cuentos" element={<Biblioteca />} />
        <Route path="cuento/:id" element={<Lector />} />
        <Route path="cuento/:id/quiz" element={<Quiz />} />
        <Route path="creditos" element={<Creditos />} />
        <Route path="tareas" element={<MisTareas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
