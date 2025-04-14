"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface SimpleDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  rounded?: string
  className?: string
}

export default function SimpleDialog({ isOpen, onClose, children, title, rounded = "lg", className }: SimpleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Manejar clic fuera del diálogo para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Solo agregar el event listener si el diálogo está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevenir scroll del body cuando el diálogo está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restaurar scroll cuando el componente se desmonta o el diálogo se cierra
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Si no está abierto, no renderizar nada
  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 ${className}`}>
      <div ref={dialogRef} className={`bg-[#e6f4ff] rounded-${rounded} shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto hide-scroll`}>
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold text-[#101113]">{title}</h2>}
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

