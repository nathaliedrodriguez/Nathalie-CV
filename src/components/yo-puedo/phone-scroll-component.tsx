"use client"
import { useRef, useState, useEffect } from "react"
import "@/styles/manual-scroll.css"

export default function PhoneScrollComponent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isHovered) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }
    const el = contentRef.current
    if (!el) return
    let direction = 1 // 1: down, -1: up
    const speed = 1.2 // px per frame
    const pauseTime = 800 // ms
    let paused = false
    let pauseTimeout: NodeJS.Timeout | null = null

    function animate() {
      if (!el) return
      if (paused) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      const maxScroll = el.scrollHeight - el.clientHeight
      el.scrollTop += speed * direction
      if (el.scrollTop >= maxScroll) {
        el.scrollTop = maxScroll
        direction = -1
        paused = true
        pauseTimeout = setTimeout(() => {
          paused = false
        }, pauseTime)
      } else if (el.scrollTop <= 0) {
        el.scrollTop = 0
        direction = 1
        paused = true
        pauseTimeout = setTimeout(() => {
          paused = false
        }, pauseTime)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [isHovered])

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="relative">
        {/* Marco del teléfono */}
        <div
          className="relative w-[240px] h-[480px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Contenido de la app con scroll manual */}
          <div
            ref={contentRef}
            className="absolute top-[15px] left-[21px] w-[200px] h-[456px] overflow-y-auto rounded-[32px] no-scrollbar"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-n8wsSXvbFui3CnyW4l7jywzDkNxno2.png"
              alt="YoPuedo App content"
              className="w-full object-cover"
            />
          </div>

          {/* Marco del teléfono */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PhoneMark-wAbQs6eDSGHJTsrHHP6eZzF1JL3L6b.png"
            alt="Phone frame"
            className="absolute top-0 left-0 z-10 pointer-events-none w-full h-full"
          />
        </div>
      </div>

      {/* Estilos inline para asegurar que se apliquen */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          background: transparent;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  )
}
