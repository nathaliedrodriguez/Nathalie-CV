/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

export function useFullscreen(elementRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check if fullscreen is active
  const checkFullscreen = useCallback(() => {
    const fullscreenElement =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement

    setIsFullscreen(!!fullscreenElement)
  }, [])

  // Request fullscreen
  const requestFullscreen = useCallback(() => {
    if (!elementRef.current) return

    if (elementRef.current.requestFullscreen) {
      elementRef.current.requestFullscreen()
    } else if ((elementRef.current as any).webkitRequestFullscreen) {
      ;(elementRef.current as any).webkitRequestFullscreen()
    } else if ((elementRef.current as any).mozRequestFullScreen) {
      ;(elementRef.current as any).mozRequestFullScreen()
    } else if ((elementRef.current as any).msRequestFullscreen) {
      ;(elementRef.current as any).msRequestFullscreen()
    }
  }, [elementRef])

  // Exit fullscreen
  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      ;(document as any).webkitExitFullscreen()
    } else if ((document as any).mozCancelFullScreen) {
      ;(document as any).mozCancelFullScreen()
    } else if ((document as any).msExitFullscreen) {
      ;(document as any).msExitFullscreen()
    }
  }, [])

  // Toggle fullscreen - solo activar con el botón de pantalla completa
  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }, [isFullscreen, requestFullscreen, exitFullscreen])

  // Añadir una función para forzar la salida de pantalla completa si se activó automáticamente
  const forceExitFullscreenIfNeeded = useCallback(() => {
    if (document.fullscreenElement && !isFullscreen && elementRef.current !== document.fullscreenElement) {
      exitFullscreen()
    }
  }, [isFullscreen, exitFullscreen, elementRef])

  // Listen for fullscreen change events
  useEffect(() => {
    const fullscreenChangeEvents = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ]

    fullscreenChangeEvents.forEach((eventName) => {
      document.addEventListener(eventName, checkFullscreen)
    })

    return () => {
      fullscreenChangeEvents.forEach((eventName) => {
        document.removeEventListener(eventName, checkFullscreen)
      })
    }
  }, [checkFullscreen])

  return { isFullscreen, toggleFullscreen, forceExitFullscreenIfNeeded }
}

/* eslint-enable @typescript-eslint/no-explicit-any */