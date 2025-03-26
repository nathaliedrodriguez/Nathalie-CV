"use client"

import Link from "next/link"
import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Variables para el gesto de deslizamiento
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Solo mostrar en dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Escuchar el evento personalizado del botón
    const handleToggleMenu = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen)
    }

    window.addEventListener("toggleMobileMenu", handleToggleMenu as EventListener)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("toggleMobileMenu", handleToggleMenu as EventListener)
    }
  }, [])

  // Efecto para notificar cambios de estado
  useEffect(() => {
    // Notificar al botón cuando el menú cambia de estado
    const event = new CustomEvent("mobileMenuStateChange", { detail: { isOpen } })
    window.dispatchEvent(event)
  }, [isOpen])

  // Manejadores de eventos táctiles para el gesto de deslizamiento
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50 // Umbral de 50px para considerar un deslizamiento

    if (isLeftSwipe) {
      setIsOpen(false)
    }

    // Reiniciar valores
    touchStartX.current = null
    touchEndX.current = null
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      ref={menuRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-full w-full max-w-[430px] mx-auto bg-[#edf5fa] dark:bg-[#000068] flex flex-col items-center justify-between py-12 px-8 rounded-r-3xl shadow-xl">
        {/* Perfil */}
        <div className="flex flex-col items-start space-y-6 mt-8 -ml-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img src="/HomePage/profile.png" alt="Profile" className=" object-cover" />
          </div>

          <div className="text-left">
            <h1 className="text-[#0004a4] dark:text-[#0091fb] text-3xl font-bold font-title mb-1">
              Nathalie D. Rodriguez
            </h1>
            <p className="text-[#101113] dark:text-[#d9d9d9] text-sm">
              UX / UI Designer - B.A. in Social Communication
            </p>
          </div>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col items-start w-full space-y-8 my-12">
          <Link href="/about-me" className="flex items-center text-[#0091fb] dark:text-[#0b9ff0] text-xl">
            <img src="/HomePage/icons/star.png" className="w-6 h-6 mr-4 fill-[#0091fb] stroke-[#0091fb] dark:fill-[#0b9ff0] dark:stroke-[#0b9ff0]" alt="StarIcon" />
            About Me
          </Link>

          <Link
            href="https://www.behance.net/nathaliedrodriguez"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#0091fb] dark:text-[#0b9ff0] text-xl"
          >
            <div className="w-6 h-6 mr-4 flex items-center justify-center">
              <img src="/HomePage/icons/behance-icon.png" className="w-6 h-6 fill-[#0091fb] stroke-[#0091fb] dark:fill-[#0b9ff0] dark:stroke-[#0b9ff0]" alt="BehanceIcon" />
            </div>
            Behance
          </Link>

          <Link
            href="https://www.linkedin.com/in/nathaliedrodriguez/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#0091fb] dark:text-[#0b9ff0] text-xl"
          >
            <img src="/HomePage/icons/linkedin-icon.png" className="w-6 h-6 fill-[#0091fb] mr-4 stroke-[#0091fb] dark:fill-[#0b9ff0] dark:stroke-[#0b9ff0]" alt="LinkedinIcon" />
            Linkedin
          </Link>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="text-center text-[#101113] dark:text-[#d9d9d9] mt-auto mb-8">
          Thanks for visiting my website!
        </div>

        {/* Elemento decorativo e indicador de deslizamiento */}
        <div className="absolute bottom-12 right-4 flex items-center">
          <img src="/HomePage/icons/chevron-swipe.png" alt="SwipeChevron" />
        </div>
      </div>
    </div>
  )
}

