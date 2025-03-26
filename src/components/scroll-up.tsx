"use client"
import { ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ScrollUp() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <>{/* Scroll to top button */}
            {scrolled && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#0091fb] dark:bg-[#0b9ff0] text-white flex items-center justify-center shadow-lg transition-all hover:bg-[#0679b8] dark:hover:bg-[#0091fb]"
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={20} />
                </button>
            )}</>
    )
}

export default ScrollUp