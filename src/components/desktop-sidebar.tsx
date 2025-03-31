"use client"

import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DesktopSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Cerrar la barra lateral al hacer clic fuera de ella
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevenir scroll cuando la barra lateral está abierta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      {/* Botón para abrir la barra lateral */}
      <Button variant="ghost" className="z-50 md:flex hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-10 w-10 text-[#0091fb]" />
      </Button>

      {/* Overlay oscuro cuando la barra lateral está abierta */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#000]/50 bg-opacity-50 z-40 md:block hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Barra lateral */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#edf5fa] z-50 transition-transform duration-300 shadow-xl md:block hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >

        <div className="h-full flex flex-col items-center justify-between py-12 px-8">
          {/* Perfil */}
          <div className="flex flex-col items-start space-y-6 mt-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img src="/HomePage/profile.png" alt="Profile" className=" object-cover" />
            </div>

            <div className="text-left">
              <h1 className="text-[#0004a4] text-3xl font-bold font-title mb-1">
                Nathalie D. Rodriguez
              </h1>
              <p className="text-[#101113] text-sm">
                UX / UI Designer - B.A. in Social Communication
              </p>
            </div>
          </div>

          {/* Enlaces */}
          <div className="flex flex-col items-start w-full space-y-8 my-12">
            <Link href="/about-me" className="flex items-center text-[#0091fb] text-xl">
              <img src="/HomePage/icons/star.png" className="w-6 h-6 mr-4 fill-[#0091fb] stroke-[#0091fb]" alt="StarIcon" />
              About Me
            </Link>

            <Link
              href="https://www.behance.net/nathaliedrodriguez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#0091fb] text-xl"
            >
              <img src="/HomePage/icons/behance-icon.png" className="w-6 h-6 mr-4 fill-[#0091fb] stroke-[#0091fb]" alt="BehanceIcon" />
              Behance
            </Link>

            <Link
              href="https://www.linkedin.com/in/nathaliedrodriguez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#0091fb] text-xl"
            >
              <img src="/HomePage/icons/linkedin-icon.png" className="w-6 h-6 fill-[#0091fb] mr-4 stroke-[#0091fb]" alt="LinkedinIcon" />
              Linkedin
            </Link>
          </div>

          {/* Mensaje de agradecimiento */}
          <div className="text-center text-[#101113] mt-auto mb-8">
            Thanks for visiting my website!
          </div>
        </div>
      </div>
    </>
  )
}

