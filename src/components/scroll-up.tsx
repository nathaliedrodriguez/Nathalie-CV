"use client"
import { ChevronUp } from "lucide-react"
import { useEffect, useState, useRef, type CSSProperties } from "react"
import { usePathname } from "next/navigation"

function ScrollUp() {
  const [scrolled, setScrolled] = useState(false)
  const [buttonStyles, setButtonStyles] = useState<CSSProperties>({
    position: "fixed",
    bottom: "24px", // 1.5rem/24px (bottom-6)
    right: "24px", // 1.5rem/24px (right-6)
    transition: "all 0.3s ease-out",
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const footerRef = useRef<HTMLElement | null>(null)
  const ticking = useRef(false)
  const isInitialMount = useRef(true)
  const pathname = usePathname() // Track route changes

  // Reset position when component mounts or remounts or route changes
  useEffect(() => {
    // Reset to default position on initial mount, remounts, and route changes
    setButtonStyles({
      position: "fixed",
      bottom: "24px",
      right: "24px",
      transition: "none", // No transition on reset
    })

    // Reset scroll state
    setScrolled(window.scrollY > 100)

    // After a short delay, enable transitions again
    const transitionTimer = setTimeout(() => {
      setButtonStyles((prev) => ({
        ...prev,
        transition: "all 0.3s ease-out",
      }))
    }, 50)

    return () => {
      // Clean up on unmount or route change
      isInitialMount.current = true
      clearTimeout(transitionTimer)
    }
  }, [pathname]) // Depend on pathname to reset on route changes

  useEffect(() => {
    // Find the footer element
    const findFooter = () => {
      footerRef.current = document.querySelector("footer")
      if (!footerRef.current) {
        console.warn("Footer element not found. The scroll button positioning may not work correctly.")
      }
    }

    findFooter()

    const updateButtonPosition = () => {
      if (!buttonRef.current) {
        ticking.current = false
        return
      }

      // Re-find footer on each update to ensure we have the latest reference
      // This helps with page transitions where DOM elements might change
      if (!footerRef.current) {
        findFooter()
      }

      const viewportHeight = window.innerHeight
      const spaceAboveFooter = 16 // 16px space above footer

      // Default position
      const newStyles: CSSProperties = {
        position: "fixed",
        bottom: "24px", // bottom-6
        right: "24px", // right-6
        transition: isInitialMount.current ? "none" : buttonStyles.transition, // Preserve current transition setting
      }

      // After first calculation, allow transitions
      if (isInitialMount.current) {
        isInitialMount.current = false
      }

      // Check if footer exists and is visible in viewport
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()

        if (footerRect.top < viewportHeight) {
          // Calculate how much the footer is in the viewport
          const footerVisibleAmount = viewportHeight - footerRect.top

          // Calculate new bottom position
          let newBottomPosition = footerVisibleAmount + spaceAboveFooter

          // Ensure the button doesn't go too high (stays in bottom 2/3 of screen)
          const maxBottomPosition = (viewportHeight * 2) / 3
          newBottomPosition = Math.min(newBottomPosition, maxBottomPosition)

          // Ensure the button is always at least at its default position
          newBottomPosition = Math.max(newBottomPosition, 24)

          newStyles.bottom = `${newBottomPosition}px`
        }
      }

      setButtonStyles((prev) => ({
        ...prev,
        position: newStyles.position,
        bottom: newStyles.bottom,
        right: newStyles.right,
        // Keep the existing transition setting
      }))

      ticking.current = false
    }

    const handleScroll = () => {
      // Show button after scrolling down 100px
      setScrolled(window.scrollY > 100)

      // Use requestAnimationFrame for smoother updates
      if (!ticking.current) {
        window.requestAnimationFrame(updateButtonPosition)
        ticking.current = true
      }
    }

    // Handle resize for responsiveness
    const handleResize = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateButtonPosition)
        ticking.current = true
      }
    }

    // Handle page visibility changes (helps with back navigation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Force recalculation after a short delay to ensure DOM is ready
        setTimeout(() => {
          handleScroll()
        }, 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // MutationObserver to detect DOM changes (like dynamic content loading)
    const observer = new MutationObserver(() => {
      // Recalculate position when DOM changes
      if (!ticking.current) {
        window.requestAnimationFrame(updateButtonPosition)
        ticking.current = true
      }
    })

    // Observe changes to the body element
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    })

    // Initial calculation with a delay to ensure DOM is ready
    setTimeout(updateButtonPosition, 100)

    // Force recalculation after images and other resources load
    window.addEventListener("load", updateButtonPosition)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("load", updateButtonPosition)
      observer.disconnect()
    }
  }, [buttonStyles.transition]) // Only depend on the transition property

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {scrolled && (
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="z-50 w-18 h-18 rounded-full border-1 border-0091fb text-white flex items-center justify-center shadow-lg bg-[#ffff] hover:bg-[#0679b8] cursor-pointer"
          style={buttonStyles}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} className="text-[#0091fb]" />
        </button>
      )}
    </>
  )
}

export default ScrollUp

