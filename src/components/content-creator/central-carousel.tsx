"use client"

import { useState, useEffect } from "react"
import { Youtube, Play } from "lucide-react"
import { ModernCarousel } from "./modern-carousel"
import { VideoPlayer } from "./video-player"

// Sample video data
const videos = [
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
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [centerMode, setCenterMode] = useState(true)
  const [carouselKey, setCarouselKey] = useState(0)

  // Force re-render of carousel when centerMode changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1)
  }, [centerMode])

  const handleVideoSelect = (index: number) => {
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null)
    } else {
      setActiveVideoIndex(index)
    }
  }

  const handleNextVideo = () => {
    if (activeVideoIndex !== null) {
      const nextIndex = (activeVideoIndex + 1) % videos.length
      setActiveVideoIndex(nextIndex)
    }
  }

  const handlePreviousVideo = () => {
    if (activeVideoIndex !== null) {
      const prevIndex = (activeVideoIndex - 1 + videos.length) % videos.length
      setActiveVideoIndex(prevIndex)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-full md:max-w-full">
        <ModernCarousel
          key={`carousel-alt-${carouselKey}`}
          items={videos}
          initialIndex={1}
          showControls={true}
          centerMode={true}
          visibleItems={{ desktop: 3, tablet: 2, mobile: 1.2 }}
          gap={16}
          renderItem={(video, index, isActive, isCentered) => (
            <div className="w-full h-full transition-all duration-300">
              <div
                className={`
                  relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-md
                  transition-all duration-300
                  ${isCentered ? "shadow-xl" : "shadow-md"}
                `}
              >
                {activeVideoIndex === index ? (
                  <VideoPlayer
                    key={`player-alt-${video.id}`}
                    src={video.src}
                    title={video.title}
                    source={video.source}
                    onNext={handleNextVideo}
                    onPrevious={handlePreviousVideo}
                    onEnded={() => handleNextVideo()}
                    className="w-full"
                    autoPlay={true}
                  />
                ) : (
                  <>
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
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
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{video.title}</h3>
                      <div className="flex items-center mt-2">
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
