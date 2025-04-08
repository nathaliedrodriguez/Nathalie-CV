"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
  onItemSelect?: (item: T, index: number) => void
  className?: string
  autoScroll?: boolean
  autoScrollInterval?: number
  initialIndex?: number
  preventDragWhenActive?: boolean
  showControls?: boolean
  showIndicators?: boolean
  itemsToShow?: number
}

export function Carousel<T>({
  items,
  renderItem,
  className,
  autoScroll = false,
  autoScrollInterval = 5000,
  initialIndex = 0,
  preventDragWhenActive = false,
  showControls = true,
  showIndicators = true,
  itemsToShow = 4,
}: CarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [visibleItems, setVisibleItems] = useState(itemsToShow)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)

  // Update visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(itemsToShow)
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [itemsToShow])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = prev - visibleItems
      return newIndex < 0 ? 0 : newIndex
    })
  }, [visibleItems])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = prev + visibleItems
      return newIndex >= items.length ? items.length - visibleItems : newIndex
    })
  }, [items.length, visibleItems])

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll) return

    const interval = setInterval(() => {
      handleNext()
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, handleNext])

  // Scroll to active item
  useEffect(() => {
    if (!itemsContainerRef.current) return

    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / items.length
    const scrollPosition = activeIndex * itemWidth

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }, [activeIndex, items.length])

  // Mouse/touch drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemsContainerRef.current) return

    // If the click is on the active item and preventDragWhenActive is true, don't start dragging
    if (preventDragWhenActive) {
      const target = e.target as HTMLElement
      const activeItem = itemsContainerRef.current.children[activeIndex] as HTMLElement
      if (activeItem && activeItem.contains(target)) {
        return
      }
    }

    setIsDragging(true)
    setStartX(e.pageX - itemsContainerRef.current.offsetLeft)
    setScrollLeft(itemsContainerRef.current.scrollLeft)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!itemsContainerRef.current) return

    // If the touch is on the active item and preventDragWhenActive is true, don't start dragging
    if (preventDragWhenActive) {
      const target = e.target as HTMLElement
      const activeItem = itemsContainerRef.current.children[activeIndex] as HTMLElement
      if (activeItem && activeItem.contains(target)) {
        return
      }
    }

    setIsDragging(true)
    setStartX(e.touches[0].pageX - itemsContainerRef.current.offsetLeft)
    setScrollLeft(itemsContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !itemsContainerRef.current) return

    e.preventDefault()
    const x = e.pageX - itemsContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    itemsContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !itemsContainerRef.current) return

    const x = e.touches[0].pageX - itemsContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    itemsContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    if (!itemsContainerRef.current) return

    // Find the closest item to the current scroll position
    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / items.length
    const scrollPosition = container.scrollLeft

    // Calculate the closest index based on scroll position
    const closestIndex = Math.round(scrollPosition / itemWidth)
    const boundedIndex = Math.max(0, Math.min(closestIndex, items.length - 1))

    setActiveIndex(boundedIndex)
  }

  return (
    <div className={cn("relative w-full", className)} ref={carouselRef} >
      <div className="relative overflow-hidden" onMouseLeave={() => setIsDragging(false)}>
        <div
          ref={itemsContainerRef}
          className={cn("flex overflow-x-auto hide-scroll", isDragging ? "cursor-grabbing" : "cursor-grab")}
          style={{
            gridTemplateColumns: `repeat(${items.length}, ${100 / visibleItems}%)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0",
                `w-full sm:w-1/2 md:w-1/3 lg:w-1/${visibleItems}`,
                "transition-all duration-300",
              )}
            >
              {renderItem(item, index, index === activeIndex)}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors z-[999] shadow-md"
            aria-label="Previous items"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors z-[999] shadow-md"
            aria-label="Next items"
            disabled={activeIndex >= items.length - visibleItems}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(items.length / visibleItems) }).map((_, index) => {
            const isActive = activeIndex >= index * visibleItems && activeIndex < (index + 1) * visibleItems

            return (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  isActive ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400",
                )}
                onClick={() => setActiveIndex(index * visibleItems)}
                aria-label={`Go to group ${index + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
