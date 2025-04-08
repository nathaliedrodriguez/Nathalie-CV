"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { SkipBack, SkipForward, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  ),
})

interface VideoPlayerProps {
  src: string
  title?: string
  poster?: string
  onEnded?: () => void
  onNext?: () => void
  onPrevious?: () => void
  className?: string
  autoPlay?: boolean
  source?: string
}

export function VideoPlayer({
  src,
  title,
  onEnded,
  onNext,
  onPrevious,
  className,
  autoPlay = false,
  source = "YouTube",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isLoading, setIsLoading] = useState(true)
  const [playerError, setPlayerError] = useState<string | null>(null)
  const [showNavButtons, setShowNavButtons] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navButtonsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle player ready event
  const handlePlayerReady = useCallback(() => {
    setIsLoading(false)
    setPlayerError(null)
  }, [])

  // Show navigation buttons temporarily
  const showNavButtonsTemporarily = useCallback(() => {
    if (onNext || onPrevious) {
      setShowNavButtons(true)

      if (navButtonsTimeoutRef.current) {
        clearTimeout(navButtonsTimeoutRef.current)
      }

      navButtonsTimeoutRef.current = setTimeout(() => {
        setShowNavButtons(false)
      }, 3000)
    }
  }, [onNext, onPrevious])

  // Handle mouse leaving the player
  const handleMouseLeave = useCallback(() => {
    if (navButtonsTimeoutRef.current) {
      clearTimeout(navButtonsTimeoutRef.current)
      navButtonsTimeoutRef.current = setTimeout(() => {
        setShowNavButtons(false)
      }, 1000)
    }
  }, [])

  // Handle next video
  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onNext) onNext()
    },
    [onNext],
  )

  // Handle previous video
  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onPrevious) onPrevious()
    },
    [onPrevious],
  )

  // Update playing state when autoPlay changes
  useEffect(() => {
    setIsPlaying(autoPlay)
  }, [autoPlay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (navButtonsTimeoutRef.current) {
        clearTimeout(navButtonsTimeoutRef.current)
      }
    }
  }, [])

  // Handle player errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlayerError = useCallback((error: any) => {
    console.error("Player error:", error)
    setIsLoading(false)
    setPlayerError("Error loading video. Please try again later.")
  }, [])

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden bg-black rounded-t-lg aspect-video", className)}
        onMouseMove={showNavButtonsTemporarily}
        onMouseLeave={handleMouseLeave}
        onTouchStart={showNavButtonsTemporarily}
      >
        {playerError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white p-4">
            <div className="text-red-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="text-center">{playerError}</p>
            <button
              className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={src}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true} // Use native controls
            onReady={handlePlayerReady}
            onStart={() => setIsLoading(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false)
              if (onNext) onNext()
              else if (onEnded) onEnded()
            }}
            onBuffer={() => setIsLoading(true)}
            onBufferEnd={() => setIsLoading(false)}
            onError={handlePlayerError}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  iv_load_policy: 3,
                  rel: 0,
                  autoplay: autoPlay ? 1 : 0,
                  origin: typeof window !== "undefined" ? window.location.origin : "",
                  playsinline: 1,
                  showinfo: 0,
                  fs: 1,
                },
                embedOptions: {
                  allowFullScreen: true,
                },
              },
              file: {
                attributes: {
                  controlsList: "nodownload",
                  playsInline: true,
                },
                forceVideo: true,
                forceAudio: false,
              },
            }}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}

        {/* Loading indicator */}
        {isLoading && !playerError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Navigation buttons (only if onNext or onPrevious are provided) */}
        {(onNext || onPrevious) && (
          <div
            className={cn(
              "absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 transition-opacity duration-300 z-40 pointer-events-none",
              showNavButtons ? "opacity-100" : "opacity-0",
            )}
          >
            {onPrevious && (
              <button
                onClick={handlePrevious}
                className="text-white bg-black/50 hover:bg-black/70 rounded-full p-3 focus:outline-none pointer-events-auto"
                aria-label="Previous video"
              >
                <SkipBack className="w-6 h-6" />
              </button>
            )}
            {onNext && (
              <button
                onClick={handleNext}
                className="text-white bg-black/50 hover:bg-black/70 rounded-full p-3 focus:outline-none pointer-events-auto"
                aria-label="Next video"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video info section - always visible */}
      <div className="p-3 bg-white rounded-b-lg">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{title}</h3>
        <div className="flex items-center mt-2">
          <Youtube className="h-4 w-4 text-red-600 mr-1" />
          <span className="text-xs text-gray-500">{source}</span>
          <button className="ml-auto">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
