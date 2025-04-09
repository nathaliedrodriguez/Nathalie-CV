"use client"

import { useEffect, useState, useRef } from "react"
import { Plus } from "lucide-react"
import "@/styles/origami-animation.css"

export default function OrigamiAnimation() {
  const [expanded, setExpanded] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track previous state to apply the correct animation
  const prevExpandedRef = useRef(expanded)

  useEffect(() => {
    // Start the animation automatically after a brief delay
    const startTimer = setTimeout(() => {
      setAnimationStarted(true)
    }, 500)

    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    // Only set up the animation interval when animationStarted is true
    if (animationStarted) {
      const interval = setInterval(() => {
        setExpanded((prev) => !prev)
      }, 1300) // Toggle every 1.5 seconds

      return () => clearInterval(interval)
    }
  }, [animationStarted])

  useEffect(() => {
    // Apply bounce animation when state changes
    if (containerRef.current) {
      // Remove any existing animation classes
      containerRef.current.classList.remove("bounce-expand", "bounce-collapse")

      // Force a reflow to restart animation
      void containerRef.current.offsetWidth

      // Add the appropriate animation class based on state change
      if (expanded && !prevExpandedRef.current) {
        containerRef.current.classList.add("bounce-expand")
      } else if (!expanded && prevExpandedRef.current) {
        containerRef.current.classList.add("bounce-collapse")
      }

      // Update previous state reference
      prevExpandedRef.current = expanded
    }
  }, [expanded])

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <div className="flex items-center justify-center min-h-[290px] max-h-[330px] p-4 max-md:ml-5">
      <div className="relative w-80">
        {/* Main container with bounce animation */}
        <div
          ref={containerRef}
          className={`
            relative overflow-hidden bounce-transition
            transition-all duration-800
            bg-[#e4e4e4] border-8 border-F0F0F3 rounded-2xl shadow-xl
            ${expanded ? "h-44 z-10" : "h-[85px]"}
            w-full
          `}
        >
          {/* Title */}
          <div
            className={`
              absolute bounce-transition
              transition-all duration-700
              ${expanded ? "left-1/2 -translate-x-1/2 top-4 text-blue-600/90" : "left-10 top-5 text-gray-600"}
              font-medium text-[22px]
            `}
          >
            Origami
          </div>

          {/* Text content */}
          <div
            className={`
              absolute bounce-transition
              transition-all duration-500
              ${expanded ? "opacity-100 top-14 px-3" : "opacity-0 top-40 px-6"}
              text-sm text-gray-600 max-w-full mx-auto left-0 right-0
            `}
          >
            Creating intricate designs and figures promotes concentration, mindfulness, and relaxation. This meditative
            practice can significantly reduce stress and enhance overall well-being.
          </div>
        </div>

        {/* Image - positioned absolutely to allow overlap outside container boundaries */}
        <div
          className={`
            absolute bounce-transition
            transition-all duration-700
            ${expanded ? "left-1/2 -translate-x-1/2 -top-10 w-[73px] h-[73px] z-1" : "-left-8 top-2 w-[73px] h-[73px] z-10"}
          `}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img src="/sanamente/CardPictureExpanded.png" alt="Origami" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Icon button - positioned absolutely to allow overlap outside container boundaries */}
        <div
          onClick={handleToggle}
          className={`
            absolute bounce-transition cursor-pointer
            transition-all duration-700 z-10
            ${expanded ? "-bottom-2 -right-2 translate-x-2 translate-y-2" : "top-4 right-4"}
          `}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm">
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
