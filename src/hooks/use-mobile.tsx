"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
      const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))
      setIsMobile(mobile || window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Check on resize
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}

