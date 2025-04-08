"use client"
import { useRef } from "react"
import "@/styles/manual-scroll.css"

export default function PhoneScrollComponent() {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="relative">
        {/* Marco del teléfono */}
        <div className="relative w-[240px] h-[480px]">
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
