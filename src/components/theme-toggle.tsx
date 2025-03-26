"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

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

  return (
    <div
      onClick={toggleTheme}
      className="relative h-8 w-16 rounded-full border border-[#0091fb] dark:border-[#0b9ff0] bg-[#ffff] dark:bg-[#000068] cursor-pointer overflow-hidden"
    >
      {/* Iconos estáticos */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {/* Icono izquierdo (luna) - visible solo en modo oscuro */}
        <div className={`transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
          <Moon className="h-4 w-4 text-[#0b9ff0]" />
        </div>

        {/* Icono derecho (sol) - visible solo en modo claro */}
        <div className={`transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>
          <Sun className="h-4 w-4 text-[#0091fb]" />
        </div>
      </div>

      {/* Círculo indicador con transición CSS en lugar de framer-motion */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full 
          bg-gradient-to-br from-[#0091fb] to-[#0679b8] dark:from-[#0b9ff0] dark:to-[#0091fb] 
          shadow-md transition-all duration-300 ease-in-out
          ${isDark ? "left-auto right-1" : "left-1 right-auto"}
        `}
      />
    </div>
  )
}

