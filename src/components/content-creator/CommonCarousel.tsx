"use client"

import type React from "react"

import useEmblaCarousel from "embla-carousel-react"
import { useState, useCallback, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { useFullscreen } from "@/hooks/use-fullscreen"
import "@/styles/carousel-styles.css"

// Definir la interfaz para las props del componente
interface VideoItem {
  url: string
  title?: string
}

// Actualizar la interfaz CommonCarouselProps para usar el tipo correcto de containScroll
interface CommonCarouselProps {
  videos: VideoItem[] | string[]
  autoPlay?: boolean
  muted?: boolean
  defaultVolume?: number
  showInstructions?: boolean
  carouselOptions?: {
    loop?: boolean
    dragFree?: boolean
    align?: "start" | "center" | "end"
    containScroll?: false | "trimSnaps" | "keepSnaps"
    inViewThreshold?: number
  }
}

function CommonCarousel({
  videos,
  autoPlay = false,
  muted = false,
  defaultVolume = 1,
  showInstructions = true,
  carouselOptions = {},
}: CommonCarouselProps) {
  // Procesar los videos para asegurar que tengan el formato correcto
  const processedVideos = videos.map((video) => {
    if (typeof video === "string") {
      return { url: video }
    }
    return video
  })

  // Configuración del carrusel con opciones por defecto y personalizadas
  // Actualizar también la definición de defaultOptions
  const defaultOptions = {
    loop: true,
    dragFree: false,
    align: "center" as const,
    containScroll: "trimSnaps" as const,
    inViewThreshold: 0.7,
  }

  const mergedOptions = { ...defaultOptions, ...carouselOptions }

  const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(Array(processedVideos.length).fill(autoPlay))
  const [isReady, setIsReady] = useState(Array(processedVideos.length).fill(false))
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [interactionZone, setInteractionZone] = useState<"left" | "center" | "right" | null>(null)
  const [volume, setVolume] = useState(defaultVolume)
  const [isMuted, setIsMuted] = useState(muted)
  const [showControls, setShowControls] = useState(false)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  // Array para almacenar los refs
  const playerRefs = useRef<Array<ReactPlayer | null>>(Array(processedVideos.length).fill(null))
  const containerRefs = useRef<Array<HTMLDivElement | null>>(Array(processedVideos.length).fill(null))
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  // Fullscreen hook
  const { isFullscreen, toggleFullscreen, forceExitFullscreenIfNeeded } = useFullscreen(playerContainerRef)

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Update the selected index when the slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)

    // Pause all videos when changing slides
    setIsPlaying((prev) => {
      const newState = [...prev]
      // Pause all videos except the currently selected one
      return newState.map((_, i) => (i === newIndex ? newState[i] : false))
    })
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

  // Función para asignar refs a los contenedores
  const setContainerRef = useCallback((el: HTMLDivElement | null, index: number) => {
    containerRefs.current[index] = el
  }, [])

  // Función para asignar refs a los reproductores
  const setPlayerRef = useCallback((player: ReactPlayer | null, index: number) => {
    playerRefs.current[index] = player
  }, [])

  // Determine interaction zone based on X position
  const getInteractionZone = (x: number, containerWidth: number): "left" | "center" | "right" => {
    const leftThreshold = containerWidth * 0.25
    const rightThreshold = containerWidth * 0.75

    if (x < leftThreshold) return "left"
    if (x > rightThreshold) return "right"
    return "center"
  }

  // Show controls temporarily
  const showControlsTemporarily = () => {
    setShowControls(true)

    // Clear any existing timeout
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }

    // Set a new timeout to hide controls after 3 seconds
    const timeout = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    setControlsTimeout(timeout)
  }

  // Handle touch/mouse start on the interactive overlay
  const handleInteractionStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (selectedIndex === -1 || !isReady[selectedIndex]) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
    setIsDragging(true)

    // Show controls on interaction start
    showControlsTemporarily()

    // Determine which zone the interaction started in
    if (overlayRef.current) {
      const rect = overlayRef.current.getBoundingClientRect()
      const relativeX = clientX - rect.left
      const zone = getInteractionZone(relativeX, rect.width)
      setInteractionZone(zone)
    }
  }

  // Handle touch/mouse move on the interactive overlay
  const handleInteractionMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const deltaX = clientX - dragStartX

    // If significant drag in side zones, provide visual feedback
    if (Math.abs(deltaX) > 20 && interactionZone !== "center") {
      if (overlayRef.current) {
        // Visual feedback during drag
        if (deltaX > 0 && interactionZone === "left") {
          overlayRef.current.classList.add("swiping-left")
          overlayRef.current.classList.remove("swiping-right")
        } else if (deltaX < 0 && interactionZone === "right") {
          overlayRef.current.classList.add("swiping-right")
          overlayRef.current.classList.remove("swiping-left")
        }
      }
    }
  }

  // Handle touch/mouse end on the interactive overlay
  const handleInteractionEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const deltaX = clientX - dragStartX

    // Remove swiping classes
    if (overlayRef.current) {
      overlayRef.current.classList.remove("swiping-left", "swiping-right")
    }

    // If it's a center zone interaction with minimal drag, toggle play/pause
    if (interactionZone === "center" && Math.abs(deltaX) < 20) {
      // Single tap/click - toggle play/pause
      togglePlayPause(selectedIndex)
    }
    // If it's a side zone interaction with significant drag, navigate carousel
    else if (interactionZone !== "center" && Math.abs(deltaX) > 50) {
      if (deltaX < 0 && interactionZone === "right") {
        emblaApi?.scrollNext()
      } else if (deltaX > 0 && interactionZone === "left") {
        emblaApi?.scrollPrev()
      }
    }

    setIsDragging(false)
    setInteractionZone(null)
  }

  // Handle click on the interactive overlay (for non-drag interactions)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isDragging) return // Ignore if we were dragging

    if (overlayRef.current) {
      const rect = overlayRef.current.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const zone = getInteractionZone(relativeX, rect.width)

      // Show controls on click
      showControlsTemporarily()

      if (zone === "center") {
        // Single click - toggle play/pause
        togglePlayPause(selectedIndex)
      } else if (zone === "left") {
        emblaApi?.scrollPrev()
      } else if (zone === "right") {
        emblaApi?.scrollNext()
      }
    }
  }

  // Toggle play/pause for a specific video
  const togglePlayPause = (index: number) => {
    if (index === selectedIndex && isReady[index]) {
      // Solo cambiar el estado de reproducción, sin afectar pantalla completa
      setIsPlaying((prev) => {
        const newState = [...prev]
        newState[index] = !newState[index]
        return newState
      })
    }
  }

  // Toggle mute/unmute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  // Handle click on non-active slide
  const handleSlideClick = (index: number) => {
    emblaApi?.scrollTo(index)
  }

  // Manejador para cuando el video está listo
  const handleReady = (index: number) => {
    setIsReady((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Manejador para errores de video
  const handleError = (error: unknown, index: number) => {
    console.error(`Error loading video ${index}:`, error)
  }

  // Efecto para prevenir pantalla completa automática
  useEffect(() => {
    // Verificar si hay algún elemento en pantalla completa que no sea el nuestro
    if (isPlaying[selectedIndex]) {
      forceExitFullscreenIfNeeded()
    }
  }, [isPlaying, selectedIndex, forceExitFullscreenIfNeeded])

  // Modificar el return para añadir una clase contenedora adicional
  return (
    <div className="embla-container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {processedVideos.map((video, index) => (
            <div
              key={index}
              className={`embla__slide ${index === selectedIndex ? "active-slide" : ""}`}
              onClick={() => index !== selectedIndex && handleSlideClick(index)}
              ref={(el) => setContainerRef(el, index)}
            >
              <div className="player-container" ref={index === selectedIndex ? playerContainerRef : null}>
                <div className="player-wrapper">
                  <ReactPlayer
                    ref={(player) => setPlayerRef(player, index)}
                    url={video.url}
                    width="100%"
                    height="100%"
                    controls={false} // Disable default controls
                    playing={isPlaying[index]}
                    volume={volume}
                    muted={isMuted}
                    onReady={() => handleReady(index)}
                    onError={(e: unknown) => handleError(e, index)}
                    onPlay={() => {
                      // Asegurar que no entre en pantalla completa al reproducir
                      if (
                        document.fullscreenElement &&
                        !isFullscreen &&
                        playerContainerRef.current !== document.fullscreenElement
                      ) {
                        // Si hay un elemento en pantalla completa pero no es nuestro contenedor, salir
                        document.exitFullscreen().catch((err) => console.error(err))
                      }

                      setIsPlaying((prev) => {
                        const newState = [...prev]
                        newState[index] = true
                        return newState
                      })
                    }}
                    onPause={() =>
                      setIsPlaying((prev) => {
                        const newState = [...prev]
                        newState[index] = false
                        return newState
                      })
                    }
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0, // Disable YouTube controls
                          modestbranding: 1,
                          origin: typeof window !== "undefined" ? window.location.origin : "",
                          playsinline: 1, // Forzar reproducción inline
                          rel: 0,
                          fs: 0, // Disable fullscreen button
                          enablejsapi: 1,
                          iv_load_policy: 3,
                          disablekb: 1, // Disable keyboard controls
                          fullscreen: 0, // Asegurar que no entre en pantalla completa automáticamente
                        },
                      },
                    }}
                    className={`react-player ${index === selectedIndex ? "active-player" : ""}`}
                    playsinline={true}
                  />
                </div>

                {/* Mostrar un indicador de carga mientras el video no está listo */}
                {!isReady[index] && (
                  <div className="loading-indicator">
                    <div className="spinner"></div>
                  </div>
                )}

                {/* Interactive overlay for active slide */}
                {index === selectedIndex && isReady[index] && (
                  <div
                    ref={overlayRef}
                    className={`interactive-overlay ${isPlaying[index] ? "playing" : "paused"} ${showControls ? "show-controls" : ""} ${isFullscreen ? "fullscreen" : ""}`}
                    onMouseDown={handleInteractionStart}
                    onMouseMove={handleInteractionMove}
                    onMouseUp={handleInteractionEnd}
                    onMouseLeave={handleInteractionEnd}
                    onTouchStart={handleInteractionStart}
                    onTouchMove={handleInteractionMove}
                    onTouchEnd={handleInteractionEnd}
                    onClick={handleOverlayClick}
                    onMouseOver={() => showControlsTemporarily()}
                  >
                    {/* Left navigation zone */}
                    <div className="nav-zone nav-zone-left">
                      <div className="nav-indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </div>
                    </div>

                    {/* Center play/pause zone */}
                    <div className="play-pause-zone">
                      <div className="play-pause-indicator">
                        {isPlaying[index] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Right navigation zone */}
                    <div className="nav-zone nav-zone-right">
                      <div className="nav-indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>

                    {/* Custom controls bar */}
                    <div className="custom-controls-bar">
                      {/* Play/Pause button */}
                      <button
                        type="button"
                        className="control-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlayPause(selectedIndex)
                        }}
                        aria-label={isPlaying[selectedIndex] ? "Pausar" : "Reproducir"}
                      >
                        {isPlaying[selectedIndex] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </button>

                      {/* Volume control */}
                      <div className="volume-control">
                        <button
                          type="button"
                          className="control-button"
                          onClick={toggleMute}
                          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                        >
                          {isMuted || volume === 0 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="1" y1="1" x2="23" y2="23"></line>
                              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                            </svg>
                          ) : volume < 0.5 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Volumen"
                        />
                      </div>

                      {/* Fullscreen button */}
                      <button
                        type="button"
                        className="control-button fullscreen-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFullscreen()
                        }}
                        aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                      >
                        {isFullscreen ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Overlay for non-active slides */}
                {index !== selectedIndex && (
                  <div className="overlay">
                    <button
                      type="button"
                      className="play-button-area"
                      onClick={() => {
                        emblaApi?.scrollTo(index)
                        setTimeout(() => {
                          setIsPlaying((prev) => {
                            const newState = [...prev]
                            newState[index] = true
                            return newState
                          })
                        }, 100)
                      }}
                      aria-label="Play video"
                    >
                      <div className="play-button">
                        <div className="play-icon"></div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de slide (dots) */}
      <div className="embla-dots">
        {processedVideos.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`embla-dot ${index === selectedIndex ? "embla-dot--selected" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              emblaApi?.scrollTo(index)
            }}
            aria-label={`Ir al video ${index + 1}`}
          />
        ))}
      </div>

      {/* Instrucciones para móviles */}
      {isMobile && showInstructions && (
        <div className="mobile-instructions">
          Toca el centro para reproducir/pausar • Desliza los lados para navegar
        </div>
      )}
    </div>
  )
}

export default CommonCarousel

