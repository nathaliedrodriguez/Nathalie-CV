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
}: ModernCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
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

  // Debug logging function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logDebug = (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Carousel] ${message}`, data || "")
    }
  }

  // Calculate dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      setContainerWidth(containerRect.width)

      // Calculate items per view based on screen size
      let newItemsPerView: number
      if (window.innerWidth >= 1280) {
        // Desktop: show specified number of items
        newItemsPerView = visibleItems.desktop
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
  }, [visibleItems, gap, isInitialized])

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

      // Limit translation to prevent empty space at the edges
      const minTranslate = Math.min(0, containerWidth - (items.length * (itemWidth + gap) - gap))
      newTranslateX = Math.max(minTranslate, Math.min(0, newTranslateX))
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

    logDebug("Updating translateX", {
      activeIndex,
      newTranslateX,
      containerWidth,
      itemWidth,
    })

    setTranslateX(newTranslateX)
  }, [activeIndex, containerWidth, itemWidth, centerMode, items.length, gap, itemsPerView, isInitialized])

  // Handle navigation
  const handlePrev = useCallback(() => {
    logDebug("Previous button clicked", { currentIndex: activeIndex })

    if (itemsPerView >= 1 && !centerMode) {
      // Move by page if not in center mode
      const itemsPerPage = Math.floor(itemsPerView)
      const currentPage = Math.floor(activeIndex / itemsPerPage)
      const newIndex = Math.max(0, (currentPage - 1) * itemsPerPage)
      setActiveIndex(newIndex)
    } else {
      // Move by single item
      setActiveIndex((prev) => Math.max(0, prev - 1))
    }
  }, [activeIndex, itemsPerView, centerMode])

  const handleNext = useCallback(() => {
    logDebug("Next button clicked", { currentIndex: activeIndex })

    if (itemsPerView >= 1 && !centerMode) {
      // Move by page if not in center mode
      const itemsPerPage = Math.floor(itemsPerView)
      const currentPage = Math.floor(activeIndex / itemsPerPage)
      const nextPageStart = (currentPage + 1) * itemsPerPage

      // Check if there are more items to show
      if (nextPageStart < items.length) {
        setActiveIndex(nextPageStart)
      }
    } else {
      // Move by single item
      if (activeIndex < items.length - 1) {
        setActiveIndex((prev) => prev + 1)
      }
    }
  }, [activeIndex, items.length, itemsPerView, centerMode])

  // Handle item click
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
    [activeIndex, items, onItemSelect, dragDistance],
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
    [translateX],
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
          newIndex = Math.max(0, activeIndex - 1)
        } else if (dragDistance < -itemAndGapWidth * 0.2) {
          // Moved left
          newIndex = Math.min(items.length - 1, activeIndex + 1)
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
  }, [isDragging, dragDistance, activeIndex, centerMode, itemWidth, gap, items.length, containerWidth, itemsPerView])

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll || !isInitialized) return

    const interval = setInterval(() => {
      if (activeIndex < items.length - 1) {
        handleNext()
      } else {
        setActiveIndex(0)
      }
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, activeIndex, items.length, handleNext, isInitialized])

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

  // Calculate if we're at the beginning or end for arrow disabling
  const isAtStart = activeIndex === 0

  // For center mode, we're at the end when we reach the last item
  // For standard mode, we're at the end when the last visible item is the last item in the array
  const isAtEnd = centerMode ? activeIndex >= items.length - 1 : activeIndex + Math.floor(itemsPerView) >= items.length

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
                key={index}
                className={cn(
                  "flex-shrink-0 transition-all duration-300",
                  isCentered ? "scale-100 z-10" : "scale-90 opacity-90 z-0",
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
              "absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-20",
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
              "absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md z-20",
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

      {/* Pagination dots
      {pageCount > 1 && (
        <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2 max-w-full">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 flex-shrink-0",
                index === currentPage ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400",
              )}
              onClick={() => {
                const newIndex = centerMode ? index : index * Math.floor(itemsPerView)
                logDebug("Pagination dot clicked", { dotIndex: index, newActiveIndex: newIndex })
                setActiveIndex(Math.min(items.length - 1, newIndex))
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  )
}
