"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle({ forceShow = false }: { forceShow?: boolean } = {}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //Show only if is desktop
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    //Show only if is desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 1024)
    }
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <div className="relative h-8 w-16 rounded-full border border-[#0091fb] bg-white">
        <div className="absolute top-1/2 -translate-y-1/2 left-1 h-6 w-6 rounded-full bg-[#0091fb]"></div>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  if (!forceShow && !isDesktop) return null;

  return (
    <div
      onClick={toggleTheme}
      className="relative h-7 w-16 rounded-full border border-0091fb bg-transparent cursor-pointer overflow-hidden"
    >
      {/* Iconos estáticos */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {/* Icono izquierdo (luna) - visible solo en modo oscuro */}
        <div className={`transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
          <Moon className="h-4 w-4 text-[#0b9ff0]" />
        </div>

        {/* Icono derecho (sol) - visible solo en modo claro */}
        <div className={`transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>
          <Sun className="h-4 w-4 text-[#0b9ff0]" />
        </div>
      </div>

      {/* Círculo indicador con transición CSS en lugar de framer-motion */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full 
          bg-gradient-to-br from-[#89c3fe] to-[#0b9ff0]
          shadow-md transition-all duration-300 ease-in-out
          ${isDark ? "left-auto right-1" : "left-1 right-auto"}
        `}
      />
    </div>
  )
}

