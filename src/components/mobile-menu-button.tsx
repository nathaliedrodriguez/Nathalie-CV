"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileMenuButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Solo mostrar en dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Escuchar cuando el menú se cierra por deslizamiento
    const handleMenuStateChange = (e: CustomEvent) => {
      if (e.detail && typeof e.detail.isOpen === "boolean") {
        setIsMenuOpen(e.detail.isOpen)
      }
    }

    window.addEventListener("mobileMenuStateChange", handleMenuStateChange as EventListener)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mobileMenuStateChange", handleMenuStateChange as EventListener)
    }
  }, [])

  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    // Disparar un evento personalizado para comunicarse con el componente MobileMenu
    const event = new CustomEvent("toggleMobileMenu", { detail: { isOpen: newState } })
    window.dispatchEvent(event)
  }

  if (!isVisible) return null

  return (
    <Button
      variant="ghost"
      onClick={toggleMenu}
    >
      <Menu className="h-10 w-10 text-[#0091fb]" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
}

