"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import ReactPlayer from 'react-player'

interface EmblaCarouselProps {
  videos: string[] // Array de URLs de YouTube
}

export const EmblaCarousel = ({ videos }: EmblaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(1)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex items-center h-[300px]">
          {videos.map((videoUrl, index) => {
            // Determinar si esta diapositiva es la central, la anterior o la siguiente
            const isCurrent = index === selectedIndex
            const isPrev = index === selectedIndex - 1 || (selectedIndex === 0 && index === videos.length - 1)
            const isNext = index === selectedIndex + 1 || (selectedIndex === videos.length - 1 && index === 0)

            // Aplicar clases según la posición
            const slideClasses = `
              embla__slide relative transition-all duration-500 ease-out
              ${isCurrent ? "z-20 scale-100 opacity-100" : "opacity-70"}
              ${isPrev ? "z-10 scale-70 -mr-10" : ""}
              ${isNext ? "z-10 scale-70 -ml-10" : ""}
              ${!isCurrent && !isPrev && !isNext ? "scale-60 opacity-0" : ""}
            `

            return (
              <div className={slideClasses} key={index}>
                <div
                  className={`
                  relative rounded-lg overflow-hidden shadow-lg
                  ${isCurrent ? "md:w-[500px] aspect-video" : "md:w-[300px] aspect-video"}
                `}
                >
                  <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={false}
                    volume={0.8}
                    muted={true}
                    config={{
                      youtube: {
                        playerVars: {
                          showinfo: 1,
                          modestbranding: 1,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="embla__dots flex justify-center mt-20">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              index === selectedIndex ? "bg-[#0091fb] scale-150" : "bg-gray-300"
            }`}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

