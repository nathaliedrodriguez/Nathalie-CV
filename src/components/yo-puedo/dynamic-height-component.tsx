"use client"

import { useEffect, useRef, useState } from "react"

export default function Component() {
  const textContainerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [textHeight, setTextHeight] = useState<number>(0)

  // Function to update heights
  const updateHeights = () => {
    if (textContainerRef.current) {
      const height = textContainerRef.current.offsetHeight
      setTextHeight(height)
    }
  }

  // Initial setup and resize handling
  useEffect(() => {
    updateHeights()

    // Set up resize observer to detect content changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeights()
    })

    // Observe both containers for changes
    if (textContainerRef.current) {
      resizeObserver.observe(textContainerRef.current)
    }

    // Clean up
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="flex justify-center items-center gap-8 font-light h-full w-full">
      <div
        ref={imageContainerRef}
        className="flex-1 flex justify-center items-center overflow-hidden max-w-[45%]"
        style={{ height: `${textHeight - 30}px` }}
      >
        <img src="/YoPuedo/img-7.svg" alt="Phone Image" className="h-full w-auto object-contain" />
      </div>
      <div ref={textContainerRef} className="p-4 rounded-lg flex-1 max-w-[45%]">
        <h3 className="font-bold mb-2">Search Bars:</h3>
        <h4 className="mb-2 text-[#0091fb]">By Name</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Improves navigation</li>
          <li>Saves time</li>
          <li>Adapts to context</li>
          <li>Enhances experience</li>
        </ul>
        <h4 className="mb-2 text-[#0091fb]">By Categories</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Organizes content</li>
          <li>Filters efficiently</li>
          <li>Reduces clutter</li>
          <li>Supports themes</li>
        </ul>
      </div>
    </div>
  )
}
