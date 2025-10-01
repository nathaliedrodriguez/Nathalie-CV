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
import { Badge } from "@/components/ui/badge"
import PhoneScrollComponent from "@/components/yo-puedo/phone-scroll-component"
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
      <section className="bg-[#edf5fa] rounded-[40px] mt-10 mb-16 mx-auto max-w-7xl relative z-10">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-16">
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
                      href="/projects"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • My projects
                    </a>
                    <a
                      href="/projects/reputation-arm"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • Reputation Arm
                    </a>
                    <a
                      href="/projects/vendismart"
                      className="block font-epilogue text-[14px] text-[#101113] hover:text-[#0091fb] py-1 transition-colors"
                    >
                      • Vendismart
                    </a>
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
                    color: isClientSide
                      ? theme === "light"
                        ? textOptions[currentTextIndex].color
                        : textOptions[currentTextIndex].darkColor
                      : textOptions[0].color, // fallback to a static color on SSR
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
                <a
                  href="https://www.linkedin.com/in/nathaliedrodriguez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.behance.net/nathaliedrodriguez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0091fb] hover:text-[#0679b8] transition-colors cursor-pointer"
                >
                  Behance
                </a>
              </div>
            </div>
          </div>
        </div>
          {(theme == "light" && isClientSide) && <img src="/HomePage/cloud.png" alt="Cloud" className="absolute z-1 left-10 right-auto -bottom-5" />}
          {(theme == "dark" && isClientSide) && <img src="/HomePage/cloud-dark.png" alt="Cloud" className="absolute z-1 left-10 right-auto -bottom-5" />}
      </section>

      {/* Approach Section */}
      <section className="mb-16 mx-auto py-6 max-w-7xl px-4">
        <h2 className="text-[24px] font-title font-bold mb-8 text-[#000068]">
          My Approach Across Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#edf5fa] p-9 rounded-4xl col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4 gap-4">
              <img
                src="/HomePage/icons/target.png"
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center mb-4"
                alt="targetIcon"
              />
              <h3 className="text-[24px] font-['El_Messiri'] font-semibold leading-[36px] tracking-[0px] align-middle mb-2">
                UX Research
              </h3>
            </div>
            <p className="font-['Epilogue'] font-[300] text-[16px] leading-[24px] tracking-[0px] text-[#101113]">
              Understanding of user needs and behaviors, driving effective
              solutions.
            </p>
          </div>

          <div className="bg-[#edf5fa] p-9 rounded-4xl col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4 gap-4">
              <img
                src="/HomePage/icons/cards.png"
                className="w-[40px] h-[40px] flex items-center justify-center mb-4"
                alt="cardsIcon"
              />
              <h3 className="text-[24px] font-['El_Messiri'] font-semibold leading-[36px] tracking-[0px] align-middle mb-2">
                UX Writing
              </h3>
            </div>
            <p className="font-['Epilogue'] font-[300] text-[16px] leading-[24px] tracking-[0px] text-[#101113]">
              Creation of clear content to enhance the overall user
              experience.
            </p>
          </div>

          <div className="bg-[#edf5fa] p-9 rounded-4xl col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 gap-4">
              <img
                src="/HomePage/icons/brush.png"
                className="w-[40px] h-[40px] flex items-center justify-center mb-4"
                alt="brushIcon"
              />
              <h3 className="text-[24px] font-['El_Messiri'] font-semibold leading-[36px] tracking-[0px] align-middle mb-2">
                UI Design
              </h3>
            </div>
            <p className="font-['Epilogue'] font-[300] text-[16px] leading-[24px] tracking-[0px] text-[#101113]">
              Prototyping of visual interfaces that are both engaging and
              functional.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Title */}
      <div className="px-4 max-w-7xl mx-auto">
        <h2 className="text-[24px] font-title font-bold mb-12 text-[#000068]">
          Explore my work
        </h2>
      </div>

      {/* Portfolio Section */}
      <section className="mb-16 mx-auto py-6 max-w-7xl px-4">

        {/* Project Reputation Arm */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
            {/* Image */}
            <div className="order 1">
              <img
                src="/HomePage/Reputation-Arm.png"
                alt="Reputation Arm"
                className="mx-auto rounded-lg"
              />
            </div>
            {/* Title and description */}
            <div className="order-1 md:order-2 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                <div>
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    Reputation Arm
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                    A SaaS platform and responsive website for managing reviews and SEO, redesigned with clear, user-friendly UX/UI for effortless navigation.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Dashboard Design
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Task Efficiency
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Multi-Location Interface
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Information Architecture
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      User Flow Optimization
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                  <Link
                    href="projects/reputation-arm"
                    className="cursor-pointer max-md:w-full"
                  >
                    <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      Discover
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Comp AI */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1]"></div>
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                <div>
                  {/* Title and description */}
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    Comp AI
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                    Lighter, faster and impactful landing page redesign focused on clarity, engagement and conversion-driven flows.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Conversion-Focused Design
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Business-Driven UX/UI
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Visual Prioritization
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Engagement Improvement
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      SEO Strategy
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                    <Button className="font-light text-lg py-6 bg-[#0091fb] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      Coming Soon
                    </Button>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="order-1 lg:order-2">
              <img
                src="/HomePage/project_Comp_AI.png"
                alt="Reputation Arm"
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Project Vendismart */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
            {/* Image */}
            <div className="order 1">
              <img
                src="/HomePage/project_Vendismart.png"
                alt="Vendismart"
                className="mx-auto rounded-lg"
              />
            </div>
            {/* Title and description */}
            <div className="order-1 md:order-2 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                <div>
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    VendiSmart
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                    HubSpot landing page UX/UI redesign with a user-centered, data-driven approach focused on measurable business results.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Retention-Focused Design
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Mobile Optimization
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Clear CTAs
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Revenue Impact
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Conversion Funnel Design
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                  <Link
                    href="projects/vendismart"
                    className="cursor-pointer max-md:w-full"
                  >
                    <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      Go deeper
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Camelot Insurance */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1]"></div>
              {/* Title and description */}
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                <div>
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    Camelot Insurance
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                    Responsive redesign of this outdated website to improve
                    usability and showcase company information effectively.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Brand Modernization
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Accessibility Improvements
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Interactive Elements
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      User-Centered Design
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                  <Link
                    href="/projects/camelot"
                    className="cursor-pointer max-md:w-full"
                  >
                    <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="order-1 lg:order-2">
              <img
                src="/HomePage/camelot-insurance.png"
                alt="Board Game Friends App"
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Project Board Game Friends */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
            {/* Image */}
            <div className="order 1">
              <img
                src="/HomePage/Board-Game-Friends-App.png"
                alt="Board Game Friends App"
                className="mx-auto rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                {/* Title and description */}
                <div>
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    Board Game Friends
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                    An app that offers a seamless platform to create and join
                    in-person board game meetings.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Event-Driven Interaction
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Heuristic Evaluation
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Community Engagement
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      User Testing & Feedback
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Optimal Workshop Insights
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Whimsical Wireframing
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                  <Link
                    href="projects/bgf"
                    className="cursor-pointer max-md:w-full"
                  >
                    <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      Dive In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project YoPuedo */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
            <div className="lg:hidden">
              <PhoneScrollComponent />
            </div>
            <div className="relative h-full">
              <div className="relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
                <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                  {/* Title and description */}
                  <div>
                    <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                      YOPuedo app
                    </h3>
                    <p className="text-base font-light mb-4 text-[#101113]">
                      Mobile/web design that enables the elderly to access
                      remote assistance sessions provided by volunteers in a
                      simple way.
                    </p>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Accessibility Enhancements
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Intuitive Navigation
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        A/B Testing
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Empathy-Driven Design
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Senior-Friendly UI
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Remote Support
                      </Badge>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="flex justify-center max-md:w-full">
                    <Link
                      href="/projects/yo-puedo"
                      className="cursor-pointer max-md:w-full"
                    >
                      <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                        Find Out More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="max-lg:hidden">
              <PhoneScrollComponent />
            </div>
          </div>
        </div>

        {/* Project Nous LATAM */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <div className="max-lg:p-10 lg:pr-16 lg:py-5 ">
                <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">
                  Current Design
                </p>
                <img
                  src="/HomePage/NOUS-Latam.gif"
                  alt="NOUS Latam"
                  className="mx-auto rounded-lg"
                />
                <p className="text-lg text-end w-full font-title font-bold text-[#0091fb] mt-3">
                  New Proposal
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative h-full">
              <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
              <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                {/* Title and description */}
                <div className="">
                  <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                    NOUS Latam
                  </h3>
                  <p className="text-base font-light mb-4 text-[#101113]">
                    Homepage redesign with a human-centered approach,
                    featuring UI enhancements, animations, icons, images and
                    more.
                  </p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Business Growth
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      User Retention
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Conversion Optimization
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                    >
                      Visual Hierarchy
                    </Badge>
                  </div>
                </div>
                {/* Button */}
                <div className="flex justify-center max-md:w-full">
                  <Link
                    href="/projects/nous"
                    className="cursor-pointer max-md:w-full"
                  >
                    <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                      View Insights
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project SanaMente */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:hidden">
              {/* Image/Video */}
              <div className="flex items-center justify-center">
                <div className="relative max-w-[300px]">
                  {/* Phone frame using regular img tag */}
                  <div className="relative">
                    <img
                      src="/sanamente/main.png"
                      alt="Phone mockup"
                      className="w-full h-auto"
                    />

                    {/* Video positioned inside the phone screen */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[92%] h-[94%] overflow-hidden rounded-[22px] mt-0">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src="/sanamente/video-sanamente.MP4"
                            type="video/mp4"
                          />
                          Tu navegador no soporta videos HTML5.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full">
              <div className="relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
                <div className="bg-[#f2f8fb] p-6 sm:p-8 md:p-10 rounded-4xl h-full flex flex-col justify-around">
                  {/* Title and description */}
                  <div>
                    <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                      SanaMente
                    </h3>
                    <p className="text-base font-light mb-4 text-[#101113]">
                      Anxiety app with a neomorphism design, featuring an AI
                      companion, a forum and relaxation tools for a calming
                      experience.
                    </p>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Neumorphism Design
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        AI Companion Integration
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Wellness-Focused UX
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Community Support
                      </Badge>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="flex justify-center max-md:w-full">
                    <Link
                      href="/projects/sanamente"
                      className="cursor-pointer max-md:w-full"
                    >
                      <Button className="cursor-pointer font-light text-lg py-6 bg-[#0091fb] hover:bg-[#0679b8] text-white min-w-[200px] rounded-2xl max-md:w-full">
                        See More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-lg:hidden lg:py-5">
              <div className="flex items-center justify-center">
                <div className="relative max-w-[300px]">
                  {/* Phone frame using regular img tag */}
                  <div className="relative">
                    <img
                      src="/sanamente/main.png"
                      alt="Phone mockup"
                      className="w-full h-auto"
                    />

                    {/* Video positioned inside the phone screen */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[92%] h-[94%] overflow-hidden rounded-[22px] mt-0">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src="/sanamente/video-sanamente.MP4"
                            type="video/mp4"
                          />
                          Your browser does not support videos HTML5.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
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

