"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
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
  const [visibleItems, setVisibleItems] = useState(itemsToShow)
  const [activeIndex, setActiveIndex] = useState(initialIndex + items.length)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftStart, setScrollLeftStart] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false)

  const itemsContainerRef = useRef<HTMLDivElement>(null)

  const extendedItems = [
    ...items.slice(-visibleItems),
    ...items,
    ...items.slice(0, visibleItems),
  ]
  const realStart = visibleItems
  const realEnd = visibleItems + items.length

  useEffect(() => {
    const updateVisible = () => {
      if (innerWidth < 640) { setVisibleItems(1); setIsLargeScreen(false) }
      else if (innerWidth < 768) { setVisibleItems(2); setIsLargeScreen(false) }
      else if (innerWidth < 1024) { setVisibleItems(3); setIsLargeScreen(false) }
      else { setVisibleItems(itemsToShow); setIsLargeScreen(true) }
    }
    updateVisible()
    addEventListener("resize", updateVisible)
    return () => removeEventListener("resize", updateVisible)
  }, [itemsToShow])

  useEffect(() => {
    if (!isProgrammaticScroll || !itemsContainerRef.current) return
    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / extendedItems.length
    container.scrollTo({ left: activeIndex * itemWidth, behavior: "smooth" })
    setIsProgrammaticScroll(false) // restablecemos flag
  }, [activeIndex, extendedItems.length, isProgrammaticScroll])

  const repositionIfClone = useCallback(() => {
    if (!itemsContainerRef.current) return
    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / extendedItems.length
    const totalRealWidth = items.length * itemWidth

    let newScroll = container.scrollLeft

    if (newScroll < realStart * itemWidth) {
      newScroll += totalRealWidth
    } else if (newScroll >= realEnd * itemWidth) {
      newScroll -= totalRealWidth
    }

    if (newScroll !== container.scrollLeft) {
      container.scrollLeft = newScroll // instantáneo, no se percibe
    }
  }, [extendedItems.length, items.length, realStart, realEnd])

  const handleScroll = useCallback(() => {
    if (!itemsContainerRef.current) return
    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / extendedItems.length

    const rawIndex = container.scrollLeft / itemWidth
    setActiveIndex(Math.round(rawIndex))

    if (!isDragging) repositionIfClone()
  }, [extendedItems.length, isDragging, repositionIfClone])

  const canStartDrag = (target: HTMLElement) =>
    !(
      preventDragWhenActive &&
      itemsContainerRef.current?.children[activeIndex]?.contains(target)
    )

  const handlePointerDown = (clientX: number, target: HTMLElement) => {
    if (!itemsContainerRef.current || !canStartDrag(target)) return
    setIsDragging(true)
    setStartX(clientX - itemsContainerRef.current.offsetLeft)
    setScrollLeftStart(itemsContainerRef.current.scrollLeft)
  }

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || !itemsContainerRef.current) return
    const x = clientX - itemsContainerRef.current.offsetLeft
    itemsContainerRef.current.scrollLeft = scrollLeftStart - (x - startX)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    repositionIfClone() // ajuste final sin salto
  }

  useEffect(() => {
    const c = itemsContainerRef.current
    if (!c) return
    c.addEventListener("scroll", handleScroll, { passive: true })
    return () => c.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollByItems = (dir: 1 | -1) => {
    if (!itemsContainerRef.current) return
    const container = itemsContainerRef.current
    const itemWidth = container.scrollWidth / extendedItems.length
    setIsProgrammaticScroll(true)
    setActiveIndex((prev) => prev + dir * visibleItems)
    container.scrollBy({ left: dir * visibleItems * itemWidth, behavior: "smooth" })
  }

  useEffect(() => {
    if (!autoScroll) return
    const id = setInterval(() => scrollByItems(1), autoScrollInterval)
    return () => clearInterval(id)
  }, [autoScroll, autoScrollInterval, visibleItems])

  return (
    <div className={cn("relative w-full select-none", className)}>
      <div className="relative overflow-hidden">
        <div
          ref={itemsContainerRef}
          className={cn(
            "flex overflow-x-auto hide-scroll",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{
            gridTemplateColumns: `repeat(${extendedItems.length}, ${
              100 / visibleItems
            }%)`,
          }}
          /* mouse */
          onMouseDown={(e) => handlePointerDown(e.pageX, e.target as HTMLElement)}
          onMouseMove={(e) => handlePointerMove(e.pageX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          /* touch */
          onTouchStart={(e) =>
            handlePointerDown(e.touches[0].pageX, e.target as HTMLElement)
          }
          onTouchMove={(e) => handlePointerMove(e.touches[0].pageX)}
          onTouchEnd={handleDragEnd}
        >
          {extendedItems.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "flex-shrink-0 transition-transform duration-300",
                !isLargeScreen && [
                  visibleItems === 1 && "w-full",
                  visibleItems === 2 && "sm:w-1/2",
                  visibleItems === 3 && "md:w-1/3",
                ],
              )}
              style={isLargeScreen ? { width: `${120 / visibleItems}%` } : undefined}
            >
              {renderItem(
                item,
                (idx - realStart + items.length) % items.length,
                idx === activeIndex,
              )}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            onClick={() => scrollByItems(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-100 z-[999] shadow-md"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollByItems(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-100 z-[999] shadow-md"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(items.length / visibleItems) }).map(
            (_, i) => {
              const first = realStart + i * visibleItems
              const active =
                activeIndex >= first && activeIndex < first + visibleItems
              return (
                <button
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    active ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  aria-label={`Ir al grupo ${i + 1}`}
                  onClick={() => {
                    if (!itemsContainerRef.current) return
                    const w =
                      itemsContainerRef.current.scrollWidth / extendedItems.length
                    setIsProgrammaticScroll(true)
                    setActiveIndex(first)
                    itemsContainerRef.current.scrollTo({
                      left: first * w,
                      behavior: "smooth",
                    })
                  }}
                />
              )
            },
          )}
        </div>
      )}
    </div>
  )
}
