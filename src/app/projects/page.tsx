"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Link from "next/link"
import Footer from "@/components/footer"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const animationRef = useRef<number | null>(null)
  const scrollSpeed = 0.5
  const pauseAtEnds = 1000

  // Calcular la altura máxima de scroll cuando el componente se monta
  useEffect(() => {
    if (!contentRef.current) return

    const updateMaxScroll = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight
        const containerHeight = contentRef.current.clientHeight
        setMaxScroll(contentHeight - containerHeight)
      }
    }

    // Actualizar al montar y cuando la imagen se cargue
    updateMaxScroll()

    // Asegurarnos de que la imagen esté cargada
    const images = contentRef.current.querySelectorAll("img")
    if (images.length > 0) {
      images.forEach((img) => {
        if (!img.complete) {
          img.onload = updateMaxScroll
        }
      })
    }

    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", updateMaxScroll)

    return () => {
      window.removeEventListener("resize", updateMaxScroll)
    }
  }, [])

  // Efecto para manejar la animación automática
  useEffect(() => {
    if (!contentRef.current || maxScroll <= 0) return

    let scrollingDown = true
    let currentPosition = 0
    let isPaused = false
    let pauseTimeoutId: NodeJS.Timeout | null = null

    const animate = () => {
      if (!contentRef.current) return

      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      if (scrollingDown) {
        // Scroll hacia abajo
        currentPosition = Math.min(currentPosition + scrollSpeed, maxScroll)
        if (contentRef.current) {
          contentRef.current.scrollTop = currentPosition
        }

        // Si llegamos al final, pausamos y luego cambiamos dirección
        if (currentPosition >= maxScroll) {
          isPaused = true
          pauseTimeoutId = setTimeout(() => {
            scrollingDown = false
            isPaused = false
          }, pauseAtEnds)
        }
      } else {
        // Scroll hacia arriba
        currentPosition = Math.max(currentPosition - scrollSpeed, 0)
        if (contentRef.current) {
          contentRef.current.scrollTop = currentPosition
        }

        // Si llegamos al inicio, pausamos y luego cambiamos dirección
        if (currentPosition <= 0) {
          isPaused = true
          pauseTimeoutId = setTimeout(() => {
            scrollingDown = true
            isPaused = false
          }, pauseAtEnds)
        }
      }

      // Continuar la animación
      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar la animación
    animationRef.current = requestAnimationFrame(animate)

    // Limpiar al desmontar
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (pauseTimeoutId) {
        clearTimeout(pauseTimeoutId)
      }
    }
  }, [maxScroll])


  // Importante: Necesitamos esperar a que el componente esté montado
  // para acceder al tema actual, ya que next-themes es hidratado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si no está montado, mostramos un placeholder para evitar saltos de UI
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#ffffff]">
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#000068] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 overflow-x-hidden">
      {/* Header */}
      <header className="container bg-[#e6f4ff] dark:bg-[#2f3036] rounded-3xl mx-auto max-w-7xl py-6 px-4">
        <div className="grid grid-cols-3 grid-rows-3 min-h-32">
          {/* Fila 1: Enlaces de navegación alineados a la derecha */}
          <div className="col-span-3 flex max-lg:justify-between lg:justify-end items-start gap-6">
            <Link href="/" className="lg:hidden">
              <Button variant="ghost">
                <ChevronLeft className="h-10 w-10" />
              </Button>
            </Link>
            <div className="md:hidden flex gap-6 relative">
              <MobileMenu />
              <MobileMenuButton />
            </div>
            <div className="flex gap-6 max-md:hidden">
              <Link href="about-me">
                <Button
                  variant="ghost"
                  className="font-body text-[#0091fb] hover:text-[#0679b8] dark:text-[#0b9ff0] dark:hover:text-[#0091fb] p-0"
                >
                  About Me
                </Button>
              </Link>
              <Link href="/content-creator">
                <Button
                  variant="ghost"
                  className="font-body text-[#0091fb] hover:text-[#0679b8] dark:text-[#0b9ff0] dark:hover:text-[#0091fb] p-0"
                >
                  Content Creator
                </Button>
              </Link>
            </div>
          </div>

          {/* Fila 2: Vacía para mantener el espacio */}
          <div className="col-span-3"></div>

          {/* Fila 3: Foto de perfil y texto alineados a la izquierda */}
          <div className="col-span-3 flex items-center gap-4 self-end">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <img src="/HomePage/profile.png" alt="Profile" sizes="64" className="object-cover" />
            </div>
            <h1 className="text-xl font-title font-bold">
              My UX UI <span className="text-[#0091fb] dark:text-[#0b9ff0]">designs</span>
            </h1>
          </div>
        </div>
      </header>


      <main className="max-md:max-w-7xl mx-auto py-12">
        {/* Approach Section */}
        <section className="mb-16 container mx-auto max-w-7xl py-6">
          <h2 className="text-2xl font-title font-bold mb-8 text-[#0004a4]">
            My Approach Across Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#e6f4ff] dark:bg-[#2f3036] p-6 rounded-xl col-span-1 md:col-span-1 lg:col-span-1">
              <div className="flex items-center mb-4 gap-3">
                <img src="/HomePage/icons/target.png" className="w-10 h-10 rounded-full flex items-center justify-center mb-4" alt="targetIcon" />
                <h3 className="text-lg font-title font-bold mb-2">UX Research</h3>
              </div>
              <p className="text-sm font-body text-[#4f4c4c] dark:text-[#e2e2e5]">
                Understanding of user needs and behaviors, driving effective solutions.
              </p>
            </div>

            <div className="bg-[#e6f4ff] dark:bg-[#2f3036] p-6 rounded-xl col-span-1 md:col-span-1 lg:col-span-1">
              <div className="flex items-center mb-4 gap-3">
                <img src="/HomePage/icons/cards.png" className="w-10 h-10 flex items-center justify-center mb-4" alt="cardsIcon" />
                <h3 className="text-lg font-title font-bold mb-2">UX Writing</h3>
              </div>
              <p className="text-sm font-body text-[#4f4c4c] dark:text-[#e2e2e5]">
                Creation of clear content to enhance the overall user experience.
              </p>
            </div>

            <div className="bg-[#e6f4ff] dark:bg-[#2f3036] p-6 rounded-xl col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4 gap-3">
                <img src="/HomePage/icons/brush.png" className="w-10 h-10 flex items-center justify-center mb-4" alt="brushIcon" />
                <h3 className="text-lg font-title font-bold mb-2">UI Design</h3>
              </div>
              <p className="text-sm font-body text-[#4f4c4c] dark:text-[#e2e2e5]">
                Prototyping of visual interfaces that are both engaging and functional.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section>
          <h2 className="text-2xl font-title font-bold mb-12 text-[#0004a4]">Explore my work</h2>

          {/* Project 1 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
              <div className="order 1">
                <img
                  src="/HomePage/Board-Game-Friends-App.png"
                  alt="Board Game Friends App"
                  className="mx-auto rounded-lg"
                />
              </div>
              <div className="order-1 md:order-2 relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1] "></div>
                <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-10  rounded-xl md:rounded-l-xl md:rounded-r-none lg:-mx-16 h-full flex flex-col justify-around">
                  <div>
                    <h3 className="text-xl font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mb-3">
                      Board Game Friends
                    </h3>
                    <p className="text-sm font-body mb-4 text-[#4f4c4c] dark:text-[#e2e2e5]">
                      An app that offers a seamless platform to create and join in-person board game meetings.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Adobe Xd
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Adobe Photoshop
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Whimsical
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Optimal Workshop
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link href='projects/bgf'>
                      <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white min-w-[200px] rounded-xl">
                        Dive In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:hidden">
                {/* <img src="/HomePage/YOPuedo-App.png" alt="YOPuedo App" className="mx-auto rounded-lg" /> */}
                {/* <video
                  src="/YoPuedo/animate.mp4"
                  className="mx-auto rounded-4xl w-1/4 h-auto"
                  autoPlay
                  muted
                  loop
                /> */}
                <div className="flex justify-center items-center my-8">
                  <div className="relative">
                    {/* Marco del teléfono */}
                    <div className="relative w-[300px] h-[600px]">
                      {/* Contenido de la app con scroll animado */}
                      <div
                        ref={contentRef}
                        className="absolute top-[15px] left-[30px] w-[250px] h-[570px] overflow-hidden rounded-[32px] hide-scroll"
                      >
                        <img
                          src="/YoPuedo/img.png" // Asegúrate de que esta ruta sea correcta
                          alt="App content"
                          className="scroll-image w-full object-cover"
                        />
                      </div>

                      {/* Marco del teléfono */}
                      <img
                        src="/YoPuedo/PhoneMark.png" // Asegúrate de que esta ruta sea correcta
                        alt="Phone frame"
                        className="absolute top-0 left-0 z-10 pointer-events-none w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-full">
                <div className="relative h-full">
                  <div className="md:absolute md:top-0 md:bottom-0 md:right-0 md:left-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                  <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-10 lg:pl-20 rounded-xl md:rounded-r-xl md:rounded-l-none lg:-mx-16 h-full flex flex-col justify-around">
                    <div>
                      <h3 className="text-xl font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mb-3">
                        YOPuedo app
                      </h3>
                      <p className="text-sm font-body mb-4 text-[#4f4c4c] dark:text-[#e2e2e5]">
                        Mobile/web design that enables the elderly to access remote assistance sessions provided by
                        volunteers in a simple way.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Figma
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Adobe Illustrator
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Adobe Photoshop
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Marvel
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Maze
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Optimal Workshop
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link href='/projects/yo-puedo'>
                        <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white min-w-[200px] rounded-xl">
                          Find Out More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden">
                {/* <img src="/HomePage/YOPuedo-App.png" alt="YOPuedo App" className="mx-auto rounded-lg" /> */}
                {/* <video
                  src="/YoPuedo/animate.mp4"
                  className="mx-auto rounded-2xl w-1/4 h-auto"
                  autoPlay
                  muted
                  loop
                /> */}
                <div className="flex justify-center items-center my-8">
                  <div className="relative">
                    {/* Marco del teléfono */}
                    <div className="relative w-[240px] h-[480px]">
                      {/* Contenido de la app con scroll animado */}
                      <div
                        ref={contentRef}
                        className="absolute top-[15px] left-[21px] w-[200px] h-[456px] overflow-hidden rounded-[32px] hide-scroll"
                      >
                        <img
                          src="/YoPuedo/img.png" // Asegúrate de que esta ruta sea correcta
                          alt="App content"
                          className="scroll-image w-full object-cover"
                        />
                      </div>

                      {/* Marco del teléfono */}
                      <img
                        src="/YoPuedo/PhoneMark.png" // Asegúrate de que esta ruta sea correcta
                        alt="Phone frame"
                        className="absolute top-0 left-0 z-10 pointer-events-none w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-1">
                <div className="max-lg:p-10 lg:pr-16 lg:py-5 ">
                  <p className="text-lg text-start font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mb-3">Current Design</p>
                  <img src="/HomePage/NOUS-Latam.gif" alt="NOUS Latam" className="mx-auto rounded-lg" />
                  <p className="text-lg text-end w-full font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mt-3">New Proposal</p>
                </div>
              </div>
              <div className="order-1 md:order-2 relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-10  rounded-xl md:rounded-l-xl md:rounded-r-none lg:-mx-16 h-full flex flex-col justify-around">
                  <div className="">
                    <h3 className="text-xl font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mb-3">NOUS Latam</h3>
                    <p className="text-sm font-body mb-4 text-[#4f4c4c] dark:text-[#e2e2e5]">
                      Homepage redesign with a human-centered approach, featuring UI enhancements, animations, icons,
                      images and more.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Figma
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                      >
                        Adobe Illustrator
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/projects/nous">
                      <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white text-white min-w-[200px] rounded-xl">
                        View Insights
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:hidden">
                <video
                  src="/sanamente/sanamenteVideo.MP4"
                  className="mx-auto rounded-xl md:rounded-3xl w-1/4 h-auto"
                  autoPlay
                  muted
                  loop
                />
              </div>
              <div className="relative h-full">
                <div className="relative h-full">
                  <div className="md:absolute md:top-0 md:bottom-0 md:right-0 md:left-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                  <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-10 lg:pl-20 rounded-xl md:rounded-r-xl md:rounded-l-none lg:-mx-16 h-full flex flex-col justify-around">
                    <div>
                      <h3 className="text-xl font-title font-bold text-[#0091fb] dark:text-[#0b9ff0] mb-3">SanaMente</h3>
                      <p className="text-sm font-body mb-4 text-[#4f4c4c] dark:text-[#e2e2e5]">
                        Anxiety app with a neomorphism design, featuring an AI companion, a forum and relaxation tools for
                        a calming experience.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Figma
                        </Badge>
                        <Badge
                          variant="outline"
                          className="font-body bg-[#e6f4ff] dark:bg-[#2f3036] text-[#0091fb] dark:text-[#0b9ff0] border-[#0091fb] dark:border-[#0b9ff0]"
                        >
                          Adobe Photoshop
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link href="/projects/sanamente">
                        <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white min-w-[200px] rounded-xl">
                          See More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden lg:py-5">
                <video
                  src="/sanamente/sanamenteVideo.MP4"
                  className="mx-auto rounded-2xl w-1/4 h-auto"
                  autoPlay
                  muted
                  loop
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

