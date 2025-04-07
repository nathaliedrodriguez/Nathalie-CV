"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Link from "next/link"
import SimpleDialog from "@/components/simple-dialog"
import '../styles/text-animations.css'
import { useTheme } from "next-themes"

const textOptions = [
  { text: "UX strategies", color: "#000068" },
  { text: "UI designs", color: "#0004a4" },
  { text: "UX content", color: "#004af5" },
  { text: "UX solutions", color: "#0091fb" }
]


export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { theme } = useTheme()
  const [isClientSide, setIsClientSide] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#ffffff] overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#f2f8fb] rounded-[40px] px-4 sm:px-8 md:px-16 lg:px-24 pt-8 max-md:pb-6 md:pb-16 lg:m-10 md:m-5 max-md:m-3 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-end mb-12">
            <div className="hidden max-md:flex w-full items-center justify-between gap-6 relative">
              <MobileMenu />
              <MobileMenuButton />
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-6 max-md:hidden">
              <Link
                href="/about-me"
                className="text-[#0091fb] hover:text-[#0679b8] transition-colors lg:hidden"
              >
                About me
              </Link>
              <Link
                href="https://www.linkedin.com/in/nathaliedrodriguez/"
                className="text-[#0091fb] hover:text-[#0679b8] transition-colors"
              >
                Linkedin
              </Link>
              <Link
                href="https://www.behance.net/nathaliedrodriguez"
                className="text-[#0091fb] hover:text-[#0679b8] transition-colors"
              >
                Behance
              </Link>
              <ThemeToggle />
            </div>
          </header>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-2">
              <div className="flex items-center gap-2 mb-4 max-md:hidden">
                <p className="text-[#0004a4] font-medium">Hi! I&apos;m Naty!</p>
                <img src="/HomePage/icons/star.png" className="w-8 h-8 mb-3" alt="StarIcon" />
              </div>

                <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold mb-6 font-title">
                I create{" "}
                <span className="inline-block overflow-hidden align-middle">
                  <span
                  className={`inline-block ${isAnimating ? "text-slide-exit" : "text-slide-enter"}`}
                  style={{
                    color: textOptions[currentTextIndex].color,
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                  >
                  {textOptions[currentTextIndex].text}
                  </span>
                </span>
                </h1>

              <p className="text-[#101113] mb-8 lg:max-w-lg">
                With over 10 years in digital communication, I specialize in delivering user-centered design solutions
                that create meaningful experiences.
              </p>

              <div className="flex w-full md:justify-end lg:justify-start">
                <a href="/NathalieDRodriguez.pdf" download className="flex w-full md:justify-end lg:justify-start" onClick={() => {
                  setIsDialogOpen(true)
                  setTimeout(() => {
                    setIsDialogOpen(false)
                  }, 5500);
                }}
                >
                  <Button className="bg-[#0091fb] hover:bg-[#0679b8] text-white lg:px-6 md:p-6 max-md:w-full rounded-2xl">
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
              <div className="flex justify-end px-4 sm:px-8 md:px-16 lg:px-24 py-4 max-lg:hidden">
                <Link
                  href="/about-me"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors"
                >
                  About me
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
            <div className="bg-[#f2f8fb] p-8 rounded-4xl max-w-[358px] mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <img src="/HomePage/icons/touch.png" className="w-10 rounded-lg flex items-center justify-center" alt="TouchIcon" />
                <h3 className="text-xl font-bold font-title">UX UI Designer</h3>
              </div>

              <p className="text-[#101113] mb-8">
                I create functional and intuitive design solutions to enhance the user experience across platforms.
              </p>

              <div className="flex justify-center w-full">
                <Link href="/projects" className="w-full flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="border-0091fb text-[#0091fb] hover:bg-[#0091fb]/10 rounded-2xl p-6 w-full text-xl font-normal"
                  >
                    Explore my Projects
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content Creator Card */}
            <div className="bg-[#f2f8fb] p-8 rounded-4xl max-w-[358px] mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <img src="/HomePage/icons/Keyboard.png" className="w-10 flex items-center justify-center" alt="KeyboardIcon" />
                <h3 className="text-xl font-bold  font-title">Content Creator</h3>
              </div>

              <p className="text-[#101113] mb-8">
                I produce engaging and informative content to attract and retain targeted audiences.
              </p>

              <div className="flex justify-center w-full">
                <Link href="/content-creator" className="w-full flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="border-0091fb text-[#0091fb] hover:bg-[#0091fb]/10 rounded-2xl p-6 w-full text-xl font-normal"
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
      <SimpleDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="flex flex-col items-center justify-center space-x-6 py-4 px-2">
          <div className="flex justify-center items-center gap-3">
            <img src="/HomePage/icons/save.png" className="w-12 h-auto mb-4" alt="Save icon" />
            <h2 className="text-[28px] font-bold text-black mb-2 missiri">Download Done!</h2>
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

