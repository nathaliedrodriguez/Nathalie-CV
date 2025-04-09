"use client"

import { useEffect, useState } from "react"

// Define the button data
const buttons = [
  {
    id: 0,
    icon: "/sanamente/House.svg",
    label: "Home",
  },
  {
    id: 1,
    icon: "/sanamente/Flower.svg",
    label: "Empowerment",
  },
  {
    id: 2,
    icon: "/sanamente/Heart.svg",
    label: "Community",
  },
  {
    id: 3,
    icon: "/sanamente/Cat.svg",
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
    <div className="flex justify-center items-center p-2 mt-1"
    style={{
      background: "linear-gradient(to bottom, transparent, rgba(243, 242, 243, 0.4))",
      borderTopLeftRadius: "100px",
      borderTopRightRadius: "100px",
    }}
    >
      {/* Main container with rounded bottom corners and gradient background */}
      <div
        className="rounded-b-[40px] py-4 sm:py-5 px-3 sm:px-6 flex items-center justify-between w-full max-w-md shadow-sm"
        style={{
            background: "linear-gradient(to bottom, rgba(243, 242, 243, 0.85), #D6D4D6)",
          }}
      >
        {buttons.map((button) => (
          <div key={button.id} className="flex flex-col items-center px-1 sm:px-2">
            <div
              className={`
                relative w-10 h-10 sm:w-14 sm:h-14 mb-1 sm:mb-2 transition-all duration-300
                ${activeButton === button.id ? "transform scale-[1.05]" : ""}
              `}
            >
              {/* Button circle with subtle shadow */}
              <div
                className={`
                  absolute inset-0 w-full h-full rounded-full bg-[#E4E4E4] transition-all duration-300
                  ${
                    activeButton === button.id
                      ? "filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                      : "filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  }
                `}
              ></div>

              {/* Icon overlay - responsive sizing */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={button.icon || "/placeholder.svg"}
                  alt={button.label}
                  className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                  style={{ color: "#4A6EA9" }} // Blue color matching the image
                />
              </div>

              {/* Pressed effect overlay - only visible when active */}
              {activeButton === button.id && (
                <div className="absolute inset-0 rounded-full bg-black opacity-[0.02]"></div>
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 font-medium truncate max-w-full">{button.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
