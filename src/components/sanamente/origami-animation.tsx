"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

export default function OrigamiAnimation() {
  const [expanded, setExpanded] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    // Iniciar la animación automáticamente después de un breve retraso
    const startTimer = setTimeout(() => {
      setAnimationStarted(true)
    }, 1000)

    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    // Solo configurar el intervalo de animación cuando animationStarted sea true
    if (animationStarted) {
      const interval = setInterval(() => {
        setExpanded((prev) => !prev)
      }, 4000) // Toggle every 4 seconds

      return () => clearInterval(interval)
    }
  }, [animationStarted])

  return (
    <div className="flex items-center justify-center min-h-[290px] max-h-[300px] p-4">
      <div className="relative w-80">
        {/* Main container */}
        <div
          className={`
            relative overflow-hidden transition-all duration-1000 ease-in-out
            bg-[#e4e4e4]/90 border-4 border-[#F0F0F3] rounded-2xl shadow-xl
            ${expanded ? "h-64 z-10" : "h-16"}
            w-full
          `}
        >
          {/* Title */}
          <div
            className={`
              absolute transition-all duration-1000 ease-in-out
              ${expanded ? "left-1/2 -translate-x-1/2 top-16 text-blue-600" : "left-28 top-4 text-gray-600"}
              font-medium text-xl
            `}
          >
            Origami
          </div>

          {/* Text content */}
          <div
            className={`
              absolute px-6 text-center transition-all duration-700 ease-in-out
              ${expanded ? "opacity-100 top-28" : "opacity-0 top-40"}
              text-sm text-gray-600 max-w-[280px] mx-auto left-0 right-0
            `}
          >
            Creating intricate designs and figures promotes concentration, mindfulness, and relaxation. This meditative
            practice can significantly reduce stress and enhance overall well-being.
          </div>
        </div>

        {/* Image - positioned absolutely to allow overlap outside container boundaries */}
        <div
          className={`
            absolute transition-all duration-1000 ease-in-out
            ${expanded ? "left-1/2 -translate-x-1/2 -top-10 w-20 h-20 z-1" : "-left-8 top-0 w-[65px] h-[65px] z-10"}
          `}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            {!expanded && <img src="/sanamente/CardPicture.png" alt="Origami" className="w-full h-full object-cover" />}
            {expanded && (
              <img src="/sanamente/CardPictureExpanded.png" alt="Origami" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Icon button - positioned absolutely to allow overlap outside container boundaries */}
        <div
          className={`
            absolute transition-all duration-1000 ease-in-out z-10
            ${expanded ? "-bottom-2 -right-2 translate-x-2 translate-y-2" : "top-3 right-3"}
          `}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm">
            {expanded ? (
              <div className="relative w-full h-full">
                <img
                  src="/sanamente/ButtonCircle.png"
                  alt="Origami"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <Plus className="absolute inset-0 m-auto w-5 h-5 text-[#3a619b]" />
              </div>
            ) : (
              <img src="/sanamente/ChevronDown.png" alt="Origami" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

