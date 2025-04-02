"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import ReactPlayer from "react-player"

interface EmblaCarouselProps {
  videos: string[] // Array of YouTube URLs
}

export const EmblaCarousel = ({ videos }: EmblaCarouselProps) => {
  // Create a separate ref for the DOM element
  const viewportElementRef = useRef<HTMLDivElement | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(1)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Track mouse state manually
  const mouseDownRef = useRef(false)
  const startPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const dragThreshold = 5 // Pixels of movement to consider a drag

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  // Manual mouse tracking functions
  const handleMouseDown = (e: MouseEvent) => {
    mouseDownRef.current = true
    startPosRef.current = { x: e.clientX, y: e.clientY }
    currentPosRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDownRef.current) return

    currentPosRef.current = { x: e.clientX, y: e.clientY }

    const deltaX = Math.abs(currentPosRef.current.x - startPosRef.current.x)
    const deltaY = Math.abs(currentPosRef.current.y - startPosRef.current.y)

    if (deltaX > dragThreshold || deltaY > dragThreshold) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = () => {
    mouseDownRef.current = false
    setTimeout(() => {
      setIsDragging(false)
    }, 100)
  }

  // Set up the ref callback to store the viewport element
  const handleViewportRef = useCallback(
    (node: HTMLDivElement) => {
      // Store the node in our ref
      viewportElementRef.current = node

      // Pass the node to Embla's ref callback
      if (typeof emblaRef === "function") {
        emblaRef(node)
      }
    },
    [emblaRef],
  )

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Add manual mouse event listeners to the viewport element
    const viewportElement = viewportElementRef.current

    if (viewportElement) {
      viewportElement.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)

      if (viewportElement) {
        viewportElement.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [emblaApi, setScrollSnaps, onSelect])

  // Function to handle click on the play button area
  const handlePlayButtonClick = (e: React.MouseEvent, index: number) => {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    // If it's not the active slide, make it active
    if (index !== selectedIndex) {
      scrollTo(index)
      e.preventDefault()
      e.stopPropagation()
    }
    // Otherwise, let the click pass through to the YouTube player
  }

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={handleViewportRef}>
        <div className="embla__container flex items-center h-[300px]">
          {videos.map((videoUrl, index) => {
            // Determine if this slide is current, previous, or next
            const isCurrent = index === selectedIndex
            const isPrev = index === selectedIndex - 1 || (selectedIndex === 0 && index === videos.length - 1)
            const isNext = index === selectedIndex + 1 || (selectedIndex === videos.length - 1 && index === 0)

            // Apply classes based on position
            const slideClasses = `
              embla__slide relative transition-all duration-500 ease-out
              ${isCurrent ? "active-slide z-20 scale-100 opacity-100" : "opacity-70"}
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
                  {/* Play button overlay for non-active slides */}
                  {!isCurrent && (
                    <div
                      className="play-button-overlay absolute inset-0 z-30 flex items-center justify-center"
                      onClick={(e) => handlePlayButtonClick(e, index)}
                    >
                      <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center cursor-pointer">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                      </div>
                    </div>
                  )}

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

