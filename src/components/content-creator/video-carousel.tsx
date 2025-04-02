"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import ReactPlayer from "react-player"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface VideoCarouselProps {
  videos: string[]
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  // Set up Embla with options optimized for video content
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean[]>(new Array(videos.length).fill(false))
  const [isInteractingWithVideo, setIsInteractingWithVideo] = useState(false)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playerRefs = useRef<(ReactPlayer | null)[]>(new Array(videos.length).fill(null))

  // Navigation functions
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // Handle video play state changes
  const handlePlay = (index: number) => {
    const newIsPlaying = [...isPlaying]
    newIsPlaying[index] = true
    setIsPlaying(newIsPlaying)
  }

  const handlePause = (index: number) => {
    const newIsPlaying = [...isPlaying]
    newIsPlaying[index] = false
    setIsPlaying(newIsPlaying)
  }

  // Handle video interaction
  const handleVideoInteractionStart = () => {
    setIsInteractingWithVideo(true)

    // Clear any existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
  }

  const handleVideoInteractionEnd = () => {
    // Set a short delay before allowing carousel navigation again
    // This helps distinguish between a click and the end of a drag
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteractingWithVideo(false)
    }, 100)
  }

  // Handle click on the play button overlay
  const handlePlayButtonClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation() // Prevent carousel navigation

    // If it's not the active slide, make it active first
    if (index !== selectedIndex) {
      scrollTo(index)

      // Wait for the slide transition to complete before playing
      setTimeout(() => {
        const newIsPlaying = [...isPlaying]
        newIsPlaying[index] = true
        setIsPlaying(newIsPlaying)
      }, 300)
    } else {
      // If it's already the active slide, just play the video
      const newIsPlaying = [...isPlaying]
      newIsPlaying[index] = true
      setIsPlaying(newIsPlaying)
    }
  }

  // Handle click on the carousel container
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only handle navigation if not interacting with video
    if (!isInteractingWithVideo) {
      const containerWidth = (e.currentTarget as HTMLElement).offsetWidth
      const clickX = e.nativeEvent.offsetX

      // Navigate based on which half of the container was clicked
      if (clickX < containerWidth / 2) {
        scrollPrev()
      } else {
        scrollNext()
      }
    }
  }

  // Detect if we should prevent carousel dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if the click is on a video control element
    const target = e.target as HTMLElement
    const isVideoControl =
      target.closest(".react-player") !== null &&
      (target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest(".play-button-overlay") !== null)

    if (isVideoControl) {
      handleVideoInteractionStart()
    }
  }

  const handleMouseUp = () => {
    handleVideoInteractionEnd()
  }

  return (
    <div className="embla relative">
      {/* Navigation buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main carousel container */}
      <div
        className="embla__viewport"
        ref={emblaRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleVideoInteractionStart}
        onTouchEnd={handleVideoInteractionEnd}
      >
        <div className="embla__container flex items-center h-[300px] md:h-[400px]" onClick={handleContainerClick}>
          {videos.map((videoUrl, index) => {
            const isCurrent = index === selectedIndex

            return (
              <div
                className={`
                  embla__slide relative transition-all duration-300 ease-out
                  ${isCurrent ? "active-slide z-20 scale-100 opacity-100" : "opacity-70 scale-75"}
                `}
                key={index}
              >
                <div
                  className={`
                    relative rounded-lg overflow-hidden shadow-lg
                    ${isCurrent ? "md:w-[640px] w-full aspect-video" : "md:w-[480px] w-full aspect-video"}
                  `}
                >
                  {/* Video play button overlay */}
                  {(!isCurrent || !isPlaying[index]) && (
                    <div
                      className="play-button-overlay absolute inset-0 z-30 flex items-center justify-center cursor-pointer bg-black/30"
                      onClick={(e) => handlePlayButtonClick(e, index)}
                    >
                      <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Video player */}
                  <div
                    className={`video-container ${isInteractingWithVideo ? "pointer-events-auto" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ReactPlayer
                      ref={(player) => {
                        playerRefs.current[index] = player
                      }}
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                      playing={isCurrent && isPlaying[index]}
                      onPlay={() => handlePlay(index)}
                      onPause={() => handlePause(index)}
                      onEnded={() => handlePause(index)}
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 1,
                            modestbranding: 1,
                            rel: 0,
                          },
                        },
                      }}
                      className={`react-player ${isCurrent ? "pointer-events-auto" : "pointer-events-none"}`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dots navigation */}
      <div className="embla__dots flex justify-center mt-4">
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

