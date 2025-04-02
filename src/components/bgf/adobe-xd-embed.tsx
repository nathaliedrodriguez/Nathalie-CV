"use client"

import { useState, useEffect } from "react"

export default function AdobeXDEmbed() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative aspect-video w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
        <iframe
          src="https://xd.adobe.com/embed/08ffdb71-3370-46e1-a223-0c32ef51a0ab-5dac/screen/3e9c0696-7496-4c18-8fbd-5e41a6c5602d?fullscreen"
          width="100%"
          height="100%"
          className="absolute inset-0 border-0"
          allowFullScreen
          title="Adobe XD Prototype"
        ></iframe>
      </div>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Adobe XD prototype embedded from:
        <a
          href="https://xd.adobe.com/view/08ffdb71-3370-46e1-a223-0c32ef51a0ab-5dac/screen/3e9c0696-7496-4c18-8fbd-5e41a6c5602d"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 hover:underline"
        >
          View original
        </a>
      </p>
    </div>
  )
}

