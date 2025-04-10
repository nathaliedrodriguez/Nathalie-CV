"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface ModernCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isActive: boolean, isCentered: boolean) => React.ReactNode
  onItemSelect?: (item: T, index: number) => void
  className?: string
  initialIndex?: number
  showControls?: boolean
  autoScroll?: boolean
  autoScrollInterval?: number
  centerMode?: boolean
  visibleItems?: {
    desktop: number
    tablet: number
    mobile: number
  }
  gap?: number
  activeIndex?: number
  setActiveIndex?: (index: number) => void
  isTransitioning?: boolean
}

export function ModernCarousel<T>({
  items,
  renderItem,
  onItemSelect,
  className,
  initialIndex = 0,
  showControls = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  centerMode = true,
  visibleItems = { desktop: 3, tablet: 2, mobile: 1.2 },
  gap = 16,
  activeIndex: externalActiveIndex,
  setActiveIndex: externalSetActiveIndex,
  isTransitioning = false,
}: ModernCarouselProps<T>) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(initialIndex)
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex
  const setActiveIndex = externalSetActiveIndex || setInternalActiveIndex

  // Add this new useRef for tracking transition state
  const transitionDisabledRef = useRef(false)
  const prevItemsLengthRef = useRef(items.length)
  const prevActiveIndexRef = useRef(activeIndex)

  // Debug logging function
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const logDebug = useCallback((message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[ModernCarousel] ${message}`, data || "")
    }
  }, [])

  // Add this new function to handle smooth transitions
  const disableTransitionTemporarily = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current.querySelector("div")
    if (container) {
      transitionDisabledRef.current = true
      container.style.transition = "none"

      // Force a reflow to apply the style change
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      container.offsetHeight

      // Re-enable transitions after a short delay
      setTimeout(() => {
        if (container) {
          container.style.transition = "transform 300ms ease-out"
          transitionDisabledRef.current = false
        }
      }, 50)
    }
  }, [])

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(visibleItems.desktop)
  const [showArrows, setShowArrows] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)

  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Track changes in items length to handle dynamic list changes
  useEffect(() => {
    // If the items length has changed, we need to handle the transition carefully
    if (prevItemsLengthRef.current !== items.length && isInitialized) {
      logDebug("Items length changed", {
        previous: prevItemsLengthRef.current,
        current: items.length,
        activeIndex,
      })

      // Disable transitions temporarily if the list changed
      if (!isTransitioning && !transitionDisabledRef.current) {
        disableTransitionTemporarily()
      }
    }

    prevItemsLengthRef.current = items.length
    prevActiveIndexRef.current = activeIndex
  }, [items.length, activeIndex, isInitialized, isTransitioning, disableTransitionTemporarily, logDebug])

  // Calculate dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      setContainerWidth(containerRect.width)

      // Calculate items per view based on screen size
      let newItemsPerView: number
      if (window.innerWidth >= 1280) {
        // Desktop: ensure exactly 3 items are visible
        newItemsPerView = 3
      } else if (window.innerWidth >= 768) {
        // Tablet: show specified number of items
        newItemsPerView = visibleItems.tablet
      } else {
        // Mobile: show specified number of items
        newItemsPerView = visibleItems.mobile
      }

      setItemsPerView(newItemsPerView)

      // Calculate item width based on container width, items per view, and gap
      const totalGapWidth = gap * (newItemsPerView - 1)
      const newItemWidth = (containerRect.width - totalGapWidth) / newItemsPerView

      setItemWidth(newItemWidth)

      // Mark as initialized after first dimension calculation
      if (!isInitialized) {
        setIsInitialized(true)
        logDebug("Carousel initialized", {
          containerWidth: containerRect.width,
          itemsPerView: newItemsPerView,
          itemWidth: newItemWidth,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [visibleItems, gap, isInitialized, logDebug])

  // Update translateX when activeIndex or dimensions change
  useEffect(() => {
    if (!isInitialized || !containerRef.current) return

    let newTranslateX = 0

    if (centerMode) {
      // Center the active item
      const containerCenter = containerWidth / 2
      const itemCenter = itemWidth / 2
      const itemOffset = activeIndex * (itemWidth + gap)
      newTranslateX = containerCenter - (itemOffset + itemCenter)
    } else {
      // Align to the left with pagination
      newTranslateX = -activeIndex * (itemWidth + gap)

      // If we're showing multiple items, adjust to show complete pages
      if (itemsPerView > 1 && !Number.isInteger(itemsPerView)) {
        const itemsPerPage = Math.floor(itemsPerView)
        const pageIndex = Math.floor(activeIndex / itemsPerPage)
        newTranslateX = -pageIndex * itemsPerPage * (itemWidth + gap)
      }
    }

    // If we're in a transition (jumping between duplicate sections),
    // disable the CSS transition temporarily
    if (isTransitioning && !transitionDisabledRef.current) {
      disableTransitionTemporarily()
    }

    logDebug("Updating translateX", {
      activeIndex,
      newTranslateX,
      containerWidth,
      itemWidth,
      isTransitioning,
    })

    setTranslateX(newTranslateX)
  }, [
    activeIndex,
    containerWidth,
    itemWidth,
    centerMode,
    items.length,
    gap,
    itemsPerView,
    isInitialized,
    isTransitioning,
    disableTransitionTemporarily,
    logDebug,
  ])

  // Handle smooth transitions for large position changes
  useEffect(() => {
    if (!isInitialized || !containerRef.current) return

    // For smooth looping, ensure transitions are smooth even when activeIndex changes drastically
    if (Math.abs(translateX) > containerWidth * 2) {
      logDebug("Large position change detected", { translateX })

      // Temporarily disable transitions for the jump
      const container = containerRef.current.querySelector("div")
      if (container) {
        container.style.transition = "none"

        // Force a reflow to apply the style change
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        container.offsetHeight

        // Re-enable transitions after a short delay
        setTimeout(() => {
          if (container) {
            container.style.transition = "transform 300ms ease-out"
          }
        }, 50)
      }
    }
  }, [translateX, containerWidth, isInitialized, logDebug])

  // Update the handleNext function to use the new activeIndex
  const handleNext = useCallback(() => {
    logDebug("Next button clicked", { currentIndex: activeIndex })

    if (itemsPerView >= 1 && !centerMode) {
      // Move by page if not in center mode
      const itemsPerPage = Math.floor(itemsPerView)
      const currentPage = Math.floor(activeIndex / itemsPerPage)
      const nextPageStart = (currentPage + 1) * itemsPerPage

      // Check if there are more items to show, if not loop to beginning
      if (nextPageStart < items.length) {
        setActiveIndex(nextPageStart)
      } else {
        setActiveIndex(0) // Loop to beginning
      }
    } else {
      // Move by single item with looping
      setActiveIndex(activeIndex + 1)
    }
  }, [activeIndex, items.length, itemsPerView, centerMode, setActiveIndex, logDebug])

  // Update the handlePrev function to use the new activeIndex
  const handlePrev = useCallback(() => {
    logDebug("Previous button clicked", { currentIndex: activeIndex })

    if (itemsPerView >= 1 && !centerMode) {
      // Move by page if not in center mode
      const itemsPerPage = Math.floor(itemsPerView)
      const currentPage = Math.floor(activeIndex / itemsPerPage)
      const newIndex = Math.max(0, (currentPage - 1) * itemsPerPage)

      if (currentPage > 0) {
        setActiveIndex(newIndex)
      } else {
        // Loop to end
        const lastPageStart = Math.floor((items.length - 1) / itemsPerPage) * itemsPerPage
        setActiveIndex(lastPageStart)
      }
    } else {
      // Move by single item with looping
      setActiveIndex(activeIndex - 1)
    }
  }, [activeIndex, itemsPerView, centerMode, items.length, setActiveIndex, logDebug])

  // Update the handleItemClick function to use the new activeIndex
  const handleItemClick = useCallback(
    (index: number) => {
      // Only trigger selection if we haven't dragged significantly
      if (Math.abs(dragDistance) < 5) {
        logDebug("Item clicked", { index, activeIndex, dragDistance })

        if (index === activeIndex) {
          onItemSelect?.(items[index], index)
        } else {
          setActiveIndex(index)
        }
      }
    },
    [activeIndex, items, onItemSelect, dragDistance, setActiveIndex, logDebug],
  )

  // Handle mouse/touch drag
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true)
      setDragDistance(0)

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX

      setStartX(clientX)
      setScrollLeft(translateX)

      logDebug("Drag started", { clientX, translateX })
    },
    [translateX, logDebug],
  )

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const delta = clientX - startX
      setDragDistance(delta)

      const newTranslateX = scrollLeft + delta

      // Apply some resistance at the edges
      const minTranslate = Math.min(0, containerWidth - (items.length * (itemWidth + gap) - gap))

      if (newTranslateX > 0) {
        setTranslateX(newTranslateX * 0.3) // Resistance at the start
      } else if (newTranslateX < minTranslate) {
        setTranslateX(minTranslate + (newTranslateX - minTranslate) * 0.3) // Resistance at the end
      } else {
        setTranslateX(newTranslateX)
      }
    },
    [isDragging, startX, scrollLeft, containerWidth, itemWidth, items.length, gap],
  )

  // Update the handleDragEnd function to use the new activeIndex
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    logDebug("Drag ended", { dragDistance, activeIndex })

    setIsDragging(false)

    // Calculate which item should be active based on current translateX
    let newIndex = activeIndex

    // Only change index if we've dragged a significant distance
    if (Math.abs(dragDistance) > 20) {
      if (centerMode) {
        // For center mode, find the item closest to the center
        const itemAndGapWidth = itemWidth + gap

        // If we've moved more than 20% of an item's width, change the active index
        if (dragDistance > itemAndGapWidth * 0.2) {
          // Moved right
          newIndex = activeIndex - 1
        } else if (dragDistance < -itemAndGapWidth * 0.2) {
          // Moved left
          newIndex = activeIndex + 1
        }
      } else {
        // For non-center mode, calculate based on position
        const itemAndGapWidth = itemWidth + gap

        if (dragDistance > itemAndGapWidth * 0.2) {
          // Moved right
          newIndex = Math.max(0, activeIndex - 1)
        } else if (dragDistance < -itemAndGapWidth * 0.2) {
          // Moved left
          const itemsPerPage = Math.floor(itemsPerView)
          const nextIndex = activeIndex + itemsPerPage
          newIndex = Math.min(items.length - 1, nextIndex)
        }
      }
    }

    if (newIndex !== activeIndex) {
      logDebug("Setting new active index after drag", { newIndex, previousIndex: activeIndex })
      setActiveIndex(newIndex)
    } else {
      // If we're not changing the index, reset the translateX
      const containerCenter = containerWidth / 2
      const itemCenter = itemWidth / 2
      const itemOffset = activeIndex * (itemWidth + gap)
      const resetTranslateX = centerMode
        ? containerCenter - (itemOffset + itemCenter)
        : -activeIndex * (itemWidth + gap)

      setTranslateX(resetTranslateX)
    }

    // Reset drag distance
    setDragDistance(0)
  }, [
    isDragging,
    dragDistance,
    activeIndex,
    centerMode,
    itemWidth,
    gap,
    items.length,
    containerWidth,
    itemsPerView,
    setActiveIndex,
    logDebug,
  ])

  // Update the auto scroll functionality to use the new activeIndex
  useEffect(() => {
    if (!autoScroll || !isInitialized) return

    const interval = setInterval(() => {
      setActiveIndex(activeIndex < items.length - 1 ? activeIndex + 1 : 0)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, activeIndex, items.length, isInitialized, setActiveIndex])

  // Show/hide arrows on desktop
  useEffect(() => {
    if (isMobile) {
      setShowArrows(true)
      return
    }

    const handleMouseEnter = () => setShowArrows(true)
    const handleMouseLeave = () => setShowArrows(false)

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("mouseenter", handleMouseEnter)
      carousel.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        carousel.removeEventListener("mouseenter", handleMouseEnter)
        carousel.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMobile])

  // For a continuous loop, we never disable the arrows
  const isAtStart = false
  const isAtEnd = false

  // Render nothing if no items
  if (items.length === 0) {
    return null
  }

  return (
    <div ref={carouselRef} className={cn("relative w-full overflow-hidden", className)}>
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-300 ease-out",
            isDragging ? "transition-none cursor-grabbing" : "cursor-grab",
          )}
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
            touchAction: "pan-y",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex
            const isCentered = centerMode && isActive
            const isVisible = centerMode ? true : index >= activeIndex && index < activeIndex + Math.ceil(itemsPerView)

            return (
              <div
                key={`item-${index}`}
                className={cn(
                  "flex-shrink-0 transition-all duration-300",
                  isCentered ? "scale-100 z-10" : "scale-95 opacity-95 z-0", // Reduced scale difference for better visibility
                  !isVisible && !centerMode ? "opacity-0" : "",
                )}
                style={{
                  width: `${itemWidth}px`,
                }}
                onClick={() => handleItemClick(index)}
              >
                {renderItem(item, index, isActive, isCentered)}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation arrows - only show if we have more items than can fit in view */}
      {showControls && items.length > Math.floor(itemsPerView) && (
        <>
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-[999]",
              "hover:bg-gray-100 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-gray-300",
              isAtStart ? "opacity-50 cursor-not-allowed" : "opacity-100",
              isMobile || showArrows ? "opacity-100" : "opacity-0",
            )}
            aria-label="Previous item"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-[999]",
              "hover:bg-gray-100 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-gray-300",
              isAtEnd ? "opacity-50 cursor-not-allowed" : "opacity-100",
              isMobile || showArrows ? "opacity-100" : "opacity-0",
            )}
            aria-label="Next item"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  )
}
