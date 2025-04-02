"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type VideoSlide = {
  id: string
  title?: string
}

export default function YouTubeCarousel({
  videos = [
    { id: "0Az2W1ocRsQ", title: "Video 1" },
    { id: "3IfcedSn-vc", title: "Video 2" },
    { id: "m0Sa_H8LTu4", title: "Video 3" },
    { id: "V_oEBKFBxJ8", title: "Video 4" },
    { id: "RwE6cHjFETU", title: "Video 5" },
  ],
}: {
  videos?: VideoSlide[]
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [activePlayer, setActivePlayer] = useState<YT.Player | null>(null)
  const playerRefs = useRef<(YT.Player | null)[]>(Array(videos.length).fill(null))

  // YouTube API initialization
  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize players when API is ready
    const onYouTubeIframeAPIReady = () => {
      videos.forEach((video, index) => {
        const containerId = `youtube-player-${index}`
        const container = document.getElementById(containerId)

        if (container && !playerRefs.current[index]) {
          playerRefs.current[index] = new YT.Player(containerId, {
            videoId: video.id,
            playerVars: {
              autoplay: 0,
              controls: 1,
              rel: 0,
              showinfo: 0,
              mute: 0,
              enablejsapi: 1,
              origin: window.location.origin,
              modestbranding: 1,
            },
            events: {
              onStateChange: (event) => {
                // If video starts playing, pause any other active video
                if (event.data === YT.PlayerState.PLAYING) {
                  const currentPlayer = event.target
                  playerRefs.current.forEach((player) => {
                    if (player && player !== currentPlayer) {
                      player.pauseVideo()
                    }
                  })
                  setActivePlayer(currentPlayer)
                }
              },
            },
          })
        }
      })
    }

    // Setup YouTube API callback
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady()
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
    }

    return () => {
      // Cleanup players on unmount
      playerRefs.current.forEach((player) => {
        if (player) {
          player.destroy()
        }
      })
    }
  }, [videos])

  // Carousel navigation and state management
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return

    // Update selected index
    setSelectedIndex(emblaApi.selectedScrollSnap())

    // Update button states
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())

    // Pause all videos when changing slides
    playerRefs.current.forEach((player, index) => {
      if (player && index !== emblaApi.selectedScrollSnap()) {
        player.pauseVideo()
      }
    })
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // Setup event listeners
    emblaApi.on("select", onSelect)
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {videos.map((video, index) => (
            <div
              key={index}
              className={cn(
                "flex-[0_0_90%] min-w-0 relative mx-2 md:flex-[0_0_70%] lg:flex-[0_0_60%]",
                "transition-opacity duration-300",
                index !== selectedIndex && "opacity-60",
              )}
            >
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <div id={`youtube-player-${index}`} className="w-full h-full" />
              </div>
              {video.title && <div className="mt-2 text-sm font-medium">{video.title}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className={cn(
          "absolute top-1/2 left-1 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center",
          "bg-white/80 hover:bg-white shadow-md transition-all",
          !prevBtnEnabled && "opacity-50 cursor-not-allowed",
        )}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className={cn(
          "absolute top-1/2 right-1 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center",
          "bg-white/80 hover:bg-white shadow-md transition-all",
          !nextBtnEnabled && "opacity-50 cursor-not-allowed",
        )}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === selectedIndex ? "bg-primary w-5" : "bg-gray-300",
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Add TypeScript declarations for YouTube API
declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

