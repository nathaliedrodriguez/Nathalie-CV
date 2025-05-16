"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Link from "next/link"
import SimpleDialog from "@/components/simple-dialog"
import '../styles/text-animations.css'
import { useTheme } from "next-themes"
import { ChevronDown } from "lucide-react"
const textOptions = [
  { text: "UX strategies", color: "#000068", darkColor: "#89C3FE" },
  { text: "UI designs", color: "#0004a4", darkColor: "#0B9FF0" },
  { text: "UX content", color: "#004af5", darkColor: "#0384CA" },
  { text: "UX solutions", color: "#0091fb", darkColor: "#004AF5" }
]


export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { theme } = useTheme()
  const [isClientSide, setIsClientSide] = useState(false)
  const [isUxUiOpen, setIsUxUiOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const uxUiButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length)
        setIsAnimating(false)
      }, 500)

    }, 1800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        uxUiButtonRef.current &&
        !uxUiButtonRef.current.contains(event.target as Node)
      ) {
        setIsUxUiOpen(false)
      }
    }
    if (isUxUiOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isUxUiOpen])

  return (
    <div className="min-h-screen bg-[#ffffff] overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#edf5fa] rounded-[40px] px-4 sm:px-8 md:px-16 lg:px-24 pt-8 max-md:pb-6 md:pb-16 lg:m-10 md:m-5 max-md:m-3 relative z-10 mx-auto max-w-[1140px] 2xl:mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-end mb-12">
            <div className="flex sm:flex md:flex lg:hidden w-full items-center justify-between gap-6 relative">
              <MobileMenu />
              <MobileMenuButton />
            </div>
            <div className="flex items-center gap-6 max-lg:hidden relative">
              {/* UX UI Designs Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer flex items-center gap-1 font-epilogue font-normal text-base focus:outline-none"
                  onClick={() => setIsUxUiOpen((prev) => !prev)}
                  ref={uxUiButtonRef}
                >
                  UX UI Designs
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUxUiOpen ? "rotate-180" : ""}`} />
                </button>
                {isUxUiOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 bg-[#edf5fa] rounded-2xl shadow-lg py-3 px-6 z-50 min-w-[200px] border border-[#e6e6e6]"
                  >
                    <a
                      href="/projects/camelot"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • Camelot Insurance
                    </a>
                    <a
                      href="/projects/bgf"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • Board Game Friends
                    </a>
                    <a
                      href="/projects/yo-puedo"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • YOPuedo app
                    </a>
                    <a
                      href="/projects/nous"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • NOUS Latam
                    </a>
                    <a
                      href="/projects/sanamente"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • Sanamente
                    </a>
                  </div>
                )}
              </div>
              {/* Fin UX UI Designs Dropdown */}
              <Link
                href="/about-me"
                className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
              >
                About me
              </Link>
              <Link
                href="/content-creator"
                className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
              >
                Content Creator
              </Link>
              <ThemeToggle />
            </div>
          </header>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-2">
              <div className="flex items-center gap-2 mb-4 max-md:hidden">
                <p className="text-[#0004a4] font-medium text-xl">Hi! I&apos;m Naty!</p>
                <img src="/HomePage/icons/star.png" className="w-8 h-8 mb-3" alt="StarIcon" />
              </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-6 font-title">
                I create{" "}
                <span className="inline-block overflow-hidden align-middle">
                  <span
                  className={`inline-block ${isAnimating ? "text-slide-exit" : "text-slide-enter"}`}
                  style={{
                    color: theme === "light" ? textOptions[currentTextIndex].color : textOptions[currentTextIndex].darkColor,
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                  >
                  {textOptions[currentTextIndex].text}
                  </span>
                </span>
                </h1>

              <p className="text-[#101113] font-light text-xl mb-8">
                With over 10 years in digital communication, I specialize in delivering user-centered design solutions
                that create meaningful experiences.
              </p>

              <div className="flex w-full md:justify-end lg:justify-start">
                <a href="/NathalieDRodriguez.pdf" download className="flex w-full md:justify-end lg:justify-start cursor-pointer" onClick={() => {
                  setIsDialogOpen(true)
                  setTimeout(() => {
                    setIsDialogOpen(false)
                  }, 5500);
                }}
                >
                  <Button className="bg-[#0091fb] hover:bg-[#0679b8] text-white lg:px-6 md:p-6 max-md:w-full max-md:p-7 max-md:text-lg rounded-2xl cursor-pointer">
                    Download my CV
                  </Button>
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex md:flex-col items-center justify-center max-md:justify-between max-md:gap-1">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-80 md:h-80 rounded-full overflow-hidden">
                <img src="/HomePage/profile.png" alt="Profile" className="object-cover object-top w-full h-full" />
              </div>
              <div className="flex items-center gap-1 mb-4 md:hidden">
                <p className="text-[#0004a4] font-medium max-sm:text-start ">Hi! I&apos;m Naty!</p>
                <img src="/HomePage/icons/star.png" className="w-10 h-10 mb-3" alt="StarIcon" />
              </div>
              {/* About Me Link */}
              <div className="flex justify-end px-4 sm:px-8 md:px-16 lg:px-24 max-lg:hidden gap-25 mt-10">
                <Link
                  href="/about-me"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
                >
                  LinkedIn
                </Link>
                <Link
                  href="/content-creator"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
                >
                  Behance
                </Link>
              </div>
            </div>
          </div>
        </div>
        {(theme == "light" && isClientSide) && <img src="/HomePage/cloud.png" alt="Cloud" className="absolute z-1 left-10 right-auto -bottom-5" />}
        {(theme == "dark" && isClientSide) && <img src="/HomePage/cloud-dark.png" alt="Cloud" className="absolute z-1 left-10 right-auto -bottom-5" />}
      </section>

      {/* Let's Work Together Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-title text-[#0004a4]">Let&apos;s work together!</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
            {/* UX UI Designer Card */}
            <div className="bg-[#edf5fa] p-8 rounded-4xl max-w-[358px] mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <img src="/HomePage/icons/touch.png" className="w-10 rounded-lg flex items-center justify-center" alt="TouchIcon" />
                <h3 className="font-semibold missiri text-2xl">UX UI Designer</h3>
              </div>

              <p className="text-[#101113] font-light text-base mb-8">
                I create functional and intuitive design solutions to enhance the user experience across platforms.
              </p>

              <div className="flex justify-center w-full">
                <Link href="/projects" className="w-full flex justify-center items-center cursor-pointer">
                  <Button
                    variant="outline"
                    className="border-0091fb text-[#0091fb] hover:bg-[#0091fb]/10 rounded-2xl p-6 w-full text-xl font-normal cursor-pointer"
                  >
                    Explore my Projects
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content Creator Card */}
            <div className="bg-[#edf5fa] p-8 rounded-4xl max-w-[358px] mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <img src="/HomePage/icons/keyboard.svg" className="w-10 h-12 flex items-center justify-center" alt="KeyboardIcon" />
                <h3 className="font-semibold missiri text-2xl">Content Creator</h3>
              </div>

              <p className="text-[#101113] font-light text-base mb-8">
                I produce engaging and informative content to attract and retain targeted audiences.
              </p>

              <div className="flex justify-center w-full">
                <Link href="/content-creator" className="w-full flex justify-center items-center cursor-pointer">
                  <Button
                    variant="outline"
                    className="border-0091fb text-[#0091fb] hover:bg-[#0091fb]/10 rounded-2xl p-6 w-full text-xl font-normal cursor-pointer"
                  >
                    View my Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Download Dialog */}
      <SimpleDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} rounded="4xl" className="max-md:p-2">
        <div className="flex flex-col items-center justify-center space-x-6 py-4 px-2 ">
          <div className="flex justify-center items-center gap-3">
            <img src="/HomePage/icons/save.png" className="w-12 h-auto mb-4" alt="Save icon" />
            <h2
              className="text-[28px] font-bold mb-2 missiri"
              style={{ color: theme === "dark" ? "#0091FB" : "#000" }}
            >
              Download Done!
            </h2>
          </div>
          <div>
            <p className="text-[18px] text-[#101113]">
              Now you can check out my CV.
              <br />
              Thanks for your interest!
            </p>
          </div>
        </div>
      </SimpleDialog>
    </div>
  )
}

