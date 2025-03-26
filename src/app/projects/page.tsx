"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Link from "next/link"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

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
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#2f2f3b] overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#e6f4ff] dark:bg-[#2f3036] py-6 px-4 md:px-8 lg:px-16 rounded-3xl mx-4 md:mx-8 lg:mx-16 mt-8">
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


      <main className="max-md:max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Approach Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-title font-bold mb-8 text-[#000000] dark:text-white">
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
          <h2 className="text-2xl font-title font-bold mb-12 text-[#000000] dark:text-white">Explore my work</h2>

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
                <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-6 rounded-xl md:rounded-l-xl md:rounded-r-none lg:-mx-16 h-full flex flex-col justify-around">
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
                      <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white">
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
                <img src="/HomePage/YOPuedo-App.png" alt="YOPuedo App" className="mx-auto rounded-lg" />
              </div>
              <div className="relative h-full">
                <div className="relative h-full">
                  <div className="md:absolute md:top-0 md:bottom-0 md:right-0 md:left-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                  <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-6 rounded-xl md:rounded-r-xl md:rounded-l-none lg:-mx-16 h-full flex flex-col justify-around">
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
                        <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white">
                          Find Out More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden">
                <img src="/HomePage/YOPuedo-App.png" alt="YOPuedo App" className="mx-auto rounded-lg" />
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-1">
                <img src="/HomePage/NOUS-Latam.png" alt="NOUS Latam" className="mx-auto rounded-lg" />
              </div>
              <div className="order-1 md:order-2 relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-6 rounded-xl md:rounded-l-xl md:rounded-r-none lg:-mx-16 h-full flex flex-col justify-around">
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
                      <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white">
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
                <img src="/HomePage/SanaMente-App.png" alt="SanaMente App" className="mx-auto rounded-lg" />
              </div>
              <div className="relative h-full">
                <div className="relative h-full">
                  <div className="md:absolute md:top-0 md:bottom-0 md:right-0 md:left-[-100vw] md:bg-[#f2f8fb] dark:md:bg-[#2f3036] md:z-[-1]"></div>
                  <div className="bg-[#f2f8fb] dark:bg-[#2f3036] p-6 rounded-xl md:rounded-r-xl md:rounded-l-none lg:-mx-16 h-full flex flex-col justify-around">
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
                        <Button className="font-body bg-[#0091fb] hover:bg-[#0679b8] dark:bg-[#0b9ff0] dark:hover:bg-[#0091fb] text-white">
                          See More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden">
                <img src="/HomePage/SanaMente-App.png" alt="SanaMente App" className="mx-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#e6f4ff] dark:bg-[#2f3036] py-8 px-4 md:px-8 lg:px-16 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pb-16">
          <div className="flex flex-col items-center gap-4 mb-4 md:mb-0">
            <img src="/HomePage/icons/star.png" className="w-24 h-24" alt="StarIcon" />
            <div>
              <h3 className="font-title font-bold text-lg text-[#0679B8]">Nathalie D. Rodriguez</h3>
              <p className="font-body text-xs text-[#4f4c4c] dark:text-[#e2e2e5]">
                UX / UI Designer - B.A. in Social Communication
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-center font-body text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">Copyright © 2024 nathalie</div>
      </footer>
    </div>
  )
}

