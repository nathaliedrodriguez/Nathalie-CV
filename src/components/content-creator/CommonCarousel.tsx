"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useState, useCallback, useEffect } from "react"
import ReactPlayer from "react-player"
import "@/styles/carousel-styles.css"

function CommonCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(Array(5).fill(false))

  // Update the selected index when the slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())

    // Pause all videos when changing slides
    setIsPlaying((prev) => prev.map((_, i) => (i === emblaApi.selectedScrollSnap() ? prev[i] : false)))
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // Setup event listeners
    emblaApi.on("select", onSelect)
    onSelect() // Initialize with the current selected slide

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // Handle play/pause for a specific video
  const handlePlayPause = (index: number | string) => {
    if (index === selectedIndex) {
      setIsPlaying((prev) => {
        const newState = [...prev]
        newState[index] = !newState[index]
        return newState
      })
    }
  }

  const videoUrls = [
    "https://www.youtube.com/watch?v=0Az2W1ocRsQ",
    "https://www.youtube.com/embed/3IfcedSn-vc?si=GvHAbmppbVnMVXfZ",
    "https://www.youtube.com/embed/m0Sa_H8LTu4?si=tA7zFM4oTkHpTOcA",
    "https://www.youtube.com/embed/V_oEBKFBxJ8?si=29VEYGzb1Qw8b_uE",
    "https://www.youtube.com/embed/RwE6cHjFETU?si=WlaCS-j5kvHCqkEs",
  ]

  return (
    <div className="embla" ref={emblaRef}>
      <div className="flex w-full space-x-4 embla__container embla__dots">
        {videoUrls.map((url, index) => (
          <div
            key={index}
            className={`relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-2 embla__slide ${index === selectedIndex ? "active-slide" : ""}`}
          >
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              controls={true}
              playing={isPlaying[index]}
              onPlay={() => handlePlayPause(index)}
              onPause={() => handlePlayPause(index)}
            />
            {index !== selectedIndex && (
              <div className="absolute inset-0 overlay" onClick={() => emblaApi?.scrollTo(index)}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 play-button-area">
                  <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommonCarousel

