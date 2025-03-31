"use client"

import { useEffect, useState } from "react"

// Define the button data
const buttons = [
  {
    id: 0,
    icon: "/sanamente/House.png",
    label: "Home",
  },
  {
    id: 1,
    icon: "/sanamente/Flower.png",
    label: "Empowerment",
  },
  {
    id: 2,
    icon: "/sanamente/Heart.png",
    label: "Community",
  },
  {
    id: 3,
    icon: "/sanamente/Cat.png",
    label: "Companion",
  },
]

export default function AnimatedButtons() {
  const [activeButton, setActiveButton] = useState(0)

  useEffect(() => {
    // Set up the animation cycle
    const interval = setInterval(() => {
      setActiveButton((prev) => (prev + 1) % buttons.length)
    }, 2000) // Change active button every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center p-4">
      {/* Contenedor principal con bordes redondeados solo en la parte inferior */}
      <div className="bg-gray-100 rounded-b-4xl py-4 px-6 flex items-center justify-between w-full max-w-md">
        {buttons.map((button) => (
          <div key={button.id} className="flex flex-col items-center">
            <div
              className={`
                relative w-12 h-12 mb-2 transition-all duration-300
                ${activeButton === button.id ? "transform scale-[1.03]" : ""}
              `}
            >
              {/* Base button circle con sombra circular más sutil */}
              <div
                className={`
                  absolute inset-0 w-full h-full rounded-full transition-all duration-300
                  ${activeButton === button.id ? "filter drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]" : ""}
                `}
              >
                <img
                  src="/sanamente/ButtonCircle.png"
                  alt="Button background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Icon overlay */}
              <img
                src={button.icon || "/placeholder.svg"}
                alt={button.label}
                className="absolute inset-0 m-auto w-6 h-6 object-contain"
              />

              {/* Pressed effect overlay - only visible when active, ahora más sutil */}
              {activeButton === button.id && (
                <div className="absolute inset-0 rounded-full bg-black opacity-[0.02]"></div>
              )}
            </div>
            <span className="text-xs text-gray-600 font-medium">{button.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

