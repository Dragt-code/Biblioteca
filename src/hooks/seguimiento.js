import { useEffect, useState } from 'react'

const CLAVE = 'mundo-letras-seguimiento'
const PUNTOS = { cuento_finalizado: 10, ruta_elegida: 2, quiz_finalizado: 5 }

function crearId() {
  return globalThis.crypto?.randomUUID?.() ?? `lector-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function leerPerfil() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE) ?? 'null')
    if (guardado?.id && Array.isArray(guardado.eventos)) return guardado
  } catch { /* Se recupera un perfil vacío si el almacenamiento no es válido. */ }
  return { id: crearId(), puntos: 0, eventos: [] }
}

export function obtenerSeguimiento() {
  return leerPerfil()
}

export function registrarEvento(tipo, detalle = {}, eventoId = crearId()) {
  const perfil = leerPerfil()
  if (perfil.eventos.some((evento) => evento.id === eventoId)) return perfil
  const evento = { id: eventoId, tipo, detalle, fecha: new Date().toISOString(), puntos: PUNTOS[tipo] ?? 0 }
  const actualizado = { ...perfil, puntos: perfil.puntos + evento.puntos, eventos: [...perfil.eventos, evento] }
  try { localStorage.setItem(CLAVE, JSON.stringify(actualizado)) } catch { /* La sesión en memoria sigue funcionando. */ }
  window.dispatchEvent(new Event('seguimiento-actualizado'))
  return actualizado
}

export function useSeguimiento() {
  const [perfil, setPerfil] = useState(leerPerfil)
  useEffect(() => {
    const actualizar = () => setPerfil(leerPerfil())
    window.addEventListener('seguimiento-actualizado', actualizar)
    window.addEventListener('storage', actualizar)
    return () => {
      window.removeEventListener('seguimiento-actualizado', actualizar)
      window.removeEventListener('storage', actualizar)
    }
  }, [])
  return perfil
}
