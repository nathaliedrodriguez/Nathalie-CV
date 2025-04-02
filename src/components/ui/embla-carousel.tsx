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
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

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

  // Track mouse/touch state
  const interactionStartRef = useRef(false)
  const startPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const dragThreshold = 5 // Pixels of movement to consider a drag
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())

    // Pause any playing video when changing slides
    if (isPlaying !== null && isPlaying !== emblaApi.selectedScrollSnap()) {
      setIsPlaying(null)
    }
  }, [emblaApi, setSelectedIndex, isPlaying])

  // Handle interaction start (mouse or touch)
  const handleInteractionStart = (clientX: number, clientY: number) => {
    interactionStartRef.current = true
    startPosRef.current = { x: clientX, y: clientY }
    currentPosRef.current = { x: clientX, y: clientY }
    setIsDragging(false)

    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
    }
  }

  // Handle interaction move (mouse or touch)
  const handleInteractionMove = (clientX: number, clientY: number) => {
    if (!interactionStartRef.current) return

    currentPosRef.current = { x: clientX, y: clientY }

    const deltaX = Math.abs(currentPosRef.current.x - startPosRef.current.x)
    const deltaY = Math.abs(currentPosRef.current.y - startPosRef.current.y)

    if (deltaX > dragThreshold || deltaY > dragThreshold) {
      setIsDragging(true)
    }
  }

  // Handle interaction end (mouse or touch)
  const handleInteractionEnd = () => {
    interactionStartRef.current = false

    // Use a short timeout to determine if this was a tap/click vs. a drag
    touchTimeoutRef.current = setTimeout(() => {
      setIsDragging(false)
    }, 100)
  }

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent) => {
    handleInteractionStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    handleInteractionMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleInteractionEnd()
  }

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleTouchEnd = () => {
    handleInteractionEnd()
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

    // Add event listeners to the viewport element
    const viewportElement = viewportElementRef.current

    if (viewportElement) {
      // Mouse events
      viewportElement.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)

      // Touch events
      viewportElement.addEventListener("touchstart", handleTouchStart)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)

      if (viewportElement) {
        // Remove mouse events
        viewportElement.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)

        // Remove touch events
        viewportElement.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("touchend", handleTouchEnd)
      }

      // Clear any timeouts
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current)
      }
    }
  }, [emblaApi, setScrollSnaps, onSelect])

  // Function to handle click/tap on the play button area
  const handlePlayButtonClick = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    // If we detected dragging, prevent video playback
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
    } else {
      // It's the active slide, toggle play state
      setIsPlaying(isPlaying === index ? null : index)
    }
  }

  return (
    <div className="embla relative w-full max-w-full overflow-hidden">
      <div className="embla__viewport" ref={handleViewportRef}>
        <div className="embla__container flex items-center h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
          {videos.map((videoUrl, index) => {
            // Determine if this slide is current, previous, or next
            const isCurrent = index === selectedIndex
            const isPrev = index === selectedIndex - 1 || (selectedIndex === 0 && index === videos.length - 1)
            const isNext = index === selectedIndex + 1 || (selectedIndex === videos.length - 1 && index === 0)
            const isVideoPlaying = isPlaying === index

            // Apply classes based on position
            const slideClasses = `
              embla__slide relative transition-all duration-500 ease-out
              ${isCurrent ? "active-slide z-20 scale-100 opacity-100" : "opacity-70"}
              ${isPrev ? "z-10 scale-[0.75] md:scale-[0.7] -mr-4 md:-mr-6 lg:-mr-8" : ""}
              ${isNext ? "z-10 scale-[0.75] md:scale-[0.7] -ml-4 md:-ml-6 lg:-ml-8" : ""}
              ${!isCurrent && !isPrev && !isNext ? "scale-[0.6] opacity-0" : ""}
            `

            return (
              <div className={slideClasses} key={index}>
                <div
                  className={`
                    relative rounded-lg overflow-hidden shadow-lg
                    ${isCurrent ? "w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] aspect-video" : "w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] aspect-video"}
                  `}
                >
                  {/* Play button overlay for non-playing videos */}
                  {!isVideoPlaying && (
                    <div
                      className="play-button-overlay absolute inset-0 z-30 flex items-center justify-center cursor-pointer"
                      onClick={(e) => handlePlayButtonClick(e, index)}
                      onTouchEnd={(e) => {
                        // Prevent default to avoid double-firing with click events
                        e.preventDefault()
                        handlePlayButtonClick(e, index)
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                      </div>
                    </div>
                  )}

                  {/* Only render ReactPlayer when slide is visible to improve performance */}
                  {(isCurrent || isPrev || isNext) && (
                    <div className={isVideoPlaying ? "z-40 relative" : "pointer-events-none"}>
                      <ReactPlayer
                        url={videoUrl}
                        width="100%"
                        height="100%"
                        controls={isVideoPlaying}
                        playing={isVideoPlaying}
                        volume={0.8}
                        muted={!isVideoPlaying}
                        playsinline={true}
                        config={{
                          youtube: {
                            playerVars: {
                              showinfo: 1,
                              modestbranding: 1,
                              playsinline: 1,
                              rel: 0,
                              fs: 1,
                              enablejsapi: 1,
                              origin: typeof window !== "undefined" ? window.location.origin : "",
                            },
                            embedOptions: {
                              onPlay: () => setIsPlaying(index),
                            },
                          },
                        }}
                      />
                    </div>
                  )}
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

