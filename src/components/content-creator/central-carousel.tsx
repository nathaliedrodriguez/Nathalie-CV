"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Youtube, Play } from "lucide-react"
import { ModernCarousel } from "./modern-carousel"
import { VideoPlayer } from "./video-player"

// Sample video data
const originalVideos = [
  {
    id: 1,
    title: "Charla entre Barack Obama y Juan Verde - Cumbre Economía Verde 2017 Argentina",
    src: "https://youtu.be/G0194NiR1Ds?t=1",
    thumbnail: "/content-creator/Carousel-2/1.png",
    source: "YouTube",
  },
  {
    id: 2,
    title: "CONAGUA 2017 - SCREEN INTERACTION (opening)",
    src: "https://www.youtube.com/watch?v=pxTsfoOQcPA&ab_channel=LouisMedina",
    thumbnail: "/content-creator/Carousel-2/2.png",
    source: "YouTube",
  },
  {
    id: 3,
    title: "Conagua 2017",
    src: "https://youtu.be/2azvHp5s_DY?t=1",
    thumbnail: "/content-creator/Carousel-2/3.png",
    source: "YouTube",
  },
]

export default function CentralCarousel() {
  // Create a dynamic video list that will be modified during navigation
  const [videos, setVideos] = useState(() => {
    // Initialize with 5 copies of the original videos for smooth initial experience
    return Array(5)
      .fill(null)
      .flatMap(() => [...originalVideos])
  })

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [carouselKey, setCarouselKey] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isAdjustingListRef = useRef(false)

  // Start in the middle section to allow seamless looping in both directions
  const initialIndex = Math.floor(videos.length / 2)

  // Debug logging function
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const logDebug = useCallback((message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[CentralCarousel] ${message}`, data || "")
    }
  }, [])

  // Force re-render of carousel when needed
  useEffect(() => {
    setCarouselKey((prev) => prev + 1)
  }, [])

  // Auto-advance videos when in auto-play mode
  useEffect(() => {
    if (isAutoPlaying && activeVideoIndex !== null && !isTransitioning) {
      autoPlayIntervalRef.current = setInterval(() => {
        handleNextVideo()
      }, 5000) // Change video every 5 seconds
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
        autoPlayIntervalRef.current = null
      }
    }
  }, [isAutoPlaying, activeVideoIndex, isTransitioning])

  // Function to add videos to the end of the list
  const appendVideos = useCallback(() => {
    if (isAdjustingListRef.current) return
    isAdjustingListRef.current = true

    setVideos((currentVideos) => {
      // Add one set of original videos to the end
      const newVideos = [...currentVideos, ...originalVideos]
      logDebug("Appended videos", {
        before: currentVideos.length,
        after: newVideos.length,
      })
      return newVideos
    })

    isAdjustingListRef.current = false
  }, [logDebug])

  // Function to add videos to the beginning of the list
  const prependVideos = useCallback(() => {
    if (isAdjustingListRef.current) return
    isAdjustingListRef.current = true

    setVideos((currentVideos) => {
      // Add one set of original videos to the beginning
      const newVideos = [...originalVideos, ...currentVideos]

      // Since we're adding to the beginning, we need to adjust the active index
      if (activeVideoIndex !== null) {
        setTimeout(() => {
          setIsTransitioning(true)
          setActiveVideoIndex((prev) => (prev !== null ? prev + originalVideos.length : null))

          // Re-enable transitions after the index adjustment
          setTimeout(() => {
            setIsTransitioning(false)
          }, 50)
        }, 0)
      }

      logDebug("Prepended videos", {
        before: currentVideos.length,
        after: newVideos.length,
      })

      return newVideos
    })

    isAdjustingListRef.current = false
  }, [activeVideoIndex, logDebug])

  // Check if we need to add more videos as we approach the edges
  useEffect(() => {
    if (activeVideoIndex === null || isTransitioning) return

    const threshold = originalVideos.length * 2

    // If we're approaching the end, add more videos to the end
    if (videos.length - activeVideoIndex <= threshold) {
      logDebug("Approaching end, adding more videos")
      appendVideos()
    }

    // If we're approaching the beginning, add more videos to the beginning
    if (activeVideoIndex <= threshold) {
      logDebug("Approaching beginning, adding more videos")
      prependVideos()
    }

    // Trim the list if it gets too large to prevent memory issues
    if (videos.length > originalVideos.length * 15) {
      logDebug("List too large, trimming")

      setIsTransitioning(true)

      // Calculate the range of videos to keep, centered around the active index
      const keepStart = Math.max(0, activeVideoIndex - originalVideos.length * 3)
      const keepEnd = Math.min(videos.length, activeVideoIndex + originalVideos.length * 3)

      setVideos((currentVideos) => {
        const trimmedVideos = currentVideos.slice(keepStart, keepEnd)

        // Adjust the active index to account for the removed videos
        const newActiveIndex = activeVideoIndex - keepStart
        setTimeout(() => {
          setActiveVideoIndex(newActiveIndex)

          // Re-enable transitions after the index adjustment
          setTimeout(() => {
            setIsTransitioning(false)
          }, 50)
        }, 0)

        return trimmedVideos
      })
    }
  }, [activeVideoIndex, isTransitioning, videos, appendVideos, prependVideos, logDebug])

  const handleVideoSelect = useCallback(
    (index: number) => {
      if (activeVideoIndex === index) {
        setActiveVideoIndex(null)
        setIsAutoPlaying(false)
      } else {
        setActiveVideoIndex(index)
        // Don't auto-start auto-play mode when selecting a video
        setIsAutoPlaying(false)
      }
    },
    [activeVideoIndex],
  )

  const handleNextVideo = useCallback(() => {
    if (activeVideoIndex !== null && !isTransitioning) {
      logDebug("Moving to next video", { current: activeVideoIndex })
      setActiveVideoIndex(activeVideoIndex + 1)
    }
  }, [activeVideoIndex, isTransitioning, logDebug])

  const handlePreviousVideo = useCallback(() => {
    if (activeVideoIndex !== null && !isTransitioning) {
      logDebug("Moving to previous video", { current: activeVideoIndex })
      setActiveVideoIndex(activeVideoIndex - 1)
    }
  }, [activeVideoIndex, isTransitioning, logDebug])

  return (
    <div className="container mx-auto py-8 px-4 max-w-full md:max-w-full">
      <ModernCarousel
        key={`carousel-alt-${carouselKey}`}
        items={videos}
        initialIndex={initialIndex}
        showControls={false}
        centerMode={true}
        visibleItems={{ desktop: 3, tablet: 2, mobile: 1.2 }}
        gap={0} // Increased gap for better spacing between videos
        onItemSelect={(_, index) => handleVideoSelect(index)}
        activeIndex={activeVideoIndex !== null ? activeVideoIndex : initialIndex}
        setActiveIndex={setActiveVideoIndex}
        isTransitioning={isTransitioning}
        disableDrag={true}
        renderItem={(video, index, isActive, isCentered) => (
          <div className="w-full h-full transition-all duration-700 ease-in-out">
            <div
              className={`
                relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-md
                transition-all duration-1000 ease-in-out
                ${isCentered ? "shadow-xl" : "shadow-md"}
              `}
            >
              {activeVideoIndex === index ? (
                <VideoPlayer
                  key={`player-alt-${video.id}-${index}`}
                  src={video.src}
                  title={video.title}
                  source={video.source}
                  onNext={handleNextVideo}
                  onPrevious={handlePreviousVideo}
                  onEnded={() => handleNextVideo()}
                  className="w-full"
                  autoPlay={false} // Disable autoplay by default
                />
              ) : (
                <>
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg?height=720&width=1280&query=video+thumbnail"}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      onClick={() => handleVideoSelect(index)}
                    >
                      <div className="w-14 h-14 rounded-full bg-black/70 flex items-center justify-center transition-transform hover:scale-110">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 select-none" onClick={e => e.stopPropagation()}>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10 pointer-events-none">{video.title}</h3>
                    <div className="flex items-center mt-2 pointer-events-none">
                      <Youtube className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-xs text-gray-500">{video.source}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      />
    </div>
  )
}
