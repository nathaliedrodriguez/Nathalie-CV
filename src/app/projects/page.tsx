"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "@/components/mobile-menu";
import MobileMenuButton from "@/components/mobile-menu-button";
import Link from "next/link";
import Footer from "@/components/footer";
import PhoneScrollComponent from "@/components/yo-puedo/phone-scroll-component";
import ChevronLeftRoute from "@/components/ChevronLeftRoute";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const animationRef = useRef<number | null>(null);
  const scrollSpeed = 0.5;
  const pauseAtEnds = 1000;
  const router = useRouter();

  // Dropdown de proyectos (solo desktop)
  const [showProjects, setShowProjects] = useState(false);
  const projectsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showProjects) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProjects(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProjects]);

  const projects = [
    { name: "• My projects", href: "/projects" },
    { name: "• Camelot Insurance", href: "/projects/camelot" },
    { name: "• Board Game Friends", href: "/projects/bgf" },
    { name: "• YOPuedo app", href: "/projects/yo-puedo" },
    { name: "• NOUS Latam", href: "/projects/nous" },
    { name: "• Sanamente", href: "/projects/sanamente" }
  ];

  // Calcular la altura máxima de scroll cuando el componente se monta
  useEffect(() => {
    if (!contentRef.current) return;

    const updateMaxScroll = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const containerHeight = contentRef.current.clientHeight;
        setMaxScroll(contentHeight - containerHeight);
      }
    };

    // Actualizar al montar y cuando la imagen se cargue
    updateMaxScroll();

    // Asegurarnos de que la imagen esté cargada
    const images = contentRef.current.querySelectorAll("img");
    if (images.length > 0) {
      images.forEach((img) => {
        if (!img.complete) {
          img.onload = updateMaxScroll;
        }
      });
    }

    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", updateMaxScroll);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, []);

  // Efecto para manejar la animación automática
  useEffect(() => {
    if (!contentRef.current || maxScroll <= 0) return;

    let scrollingDown = true;
    let currentPosition = 0;
    let isPaused = false;
    let pauseTimeoutId: NodeJS.Timeout | null = null;

    const animate = () => {
      if (!contentRef.current) return;

      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (scrollingDown) {
        // Scroll hacia abajo
        currentPosition = Math.min(currentPosition + scrollSpeed, maxScroll);
        if (contentRef.current) {
          contentRef.current.scrollTop = currentPosition;
        }

        // Si llegamos al final, pausamos y luego cambiamos dirección
        if (currentPosition >= maxScroll) {
          isPaused = true;
          pauseTimeoutId = setTimeout(() => {
            scrollingDown = false;
            isPaused = false;
          }, pauseAtEnds);
        }
      } else {
        // Scroll hacia arriba
        currentPosition = Math.max(currentPosition - scrollSpeed, 0);
        if (contentRef.current) {
          contentRef.current.scrollTop = currentPosition;
        }

        // Si llegamos al inicio, pausamos y luego cambiamos dirección
        if (currentPosition <= 0) {
          isPaused = true;
          pauseTimeoutId = setTimeout(() => {
            scrollingDown = true;
            isPaused = false;
          }, pauseAtEnds);
        }
      }

      // Continuar la animación
      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar la animación
    animationRef.current = requestAnimationFrame(animate);

    // Limpiar al desmontar
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (pauseTimeoutId) {
        clearTimeout(pauseTimeoutId);
      }
    };
  }, [maxScroll]);

  // Importante: Necesitamos esperar a que el componente esté montado
  // para acceder al tema actual, ya que next-themes es hidratado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Si no está montado, mostramos un placeholder para evitar saltos de UI
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#ffffff]">
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      <MobileMenu />
      {/* Header */}
      <header className="bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4 relative">
        {/* MobileMenuButton: top right, only on mobile/tablet */}
        <div className="absolute right-6 top-6 lg:hidden z-50">
          <MobileMenuButton />
        </div>
        <div
          className={`grid grid-cols-3 ${
            showProjects ? "grid-rows-2" : "grid-rows-3"
          } min-h-32`}
        >
          {/* Fila 1: Enlaces de navegación alineados a la derecha */}
          <div className="col-span-3 flex justify-between items-start gap-6">
            <ChevronLeftRoute onClick={() => router.back()} />
            {/* Solo mostrar navegación en lg o mayor */}
            <div className="hidden lg:flex gap-6 px-10">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="cursor-pointer text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
                >
                  Home
                </Button>
              </Link>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="cursor-pointer text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0 flex items-center gap-2 px-4"
                  onClick={() => setShowProjects(!showProjects)}
                  aria-expanded={showProjects}
                  aria-haspopup="true"
                >
                  UX UI Designs
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showProjects ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {showProjects && (
                  <div className="col-span-3">
                    <div className="flex flex-col gap-2">
                      {projects.map((project) => (
                        <Link
                          key={project.href}
                          href={project.href}
                          className="cursor-pointer px-1 py-0.5 text-[#101113] hover:text-[#0091fb] font-epilogue text-xs leading-none tracking-normal text-left transition-colors whitespace-nowrap"
                        >
                          {project.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/about-me">
                <Button
                  variant="ghost"
                  className="cursor-pointer text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
                >
                  About Me
                </Button>
              </Link>
              <Link href="/content-creator">
                <Button
                  variant="ghost"
                  className="cursor-pointer text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
                >
                  Content Creator
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>

          {/* Fila 2: Vacía para mantener el espacio */}
          {!showProjects && <div className="col-span-3"></div>}

          {/* Fila 3: Foto de perfil y texto alineados a la izquierda */}
          <div className="col-span-3 flex items-center gap-4 pb-5 pl-10">
            <h1 className="text-3xl font-title font-bold">
              My UX UI <span className="text-[#0091fb]">designs</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto py-12 max-w-7xl px-4">
        {/* Approach Section */}
        <section className="mb-16 mx-auto py-6 max-w-7xl px-4">
          <h2 className="text-2xl font-title font-bold mb-8 text-[#000068]">
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
          <h2 className="text-2xl font-title font-bold mb-12 text-[#000068]">
            Explore my work
          </h2>
        </div>

        {/* Portfolio Section */}
        <section className="mx-auto max-w-6xl px-4">
          {/* Project 1 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 relative h-full">
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1]"></div>
                <div className="bg-[#f2f8fb] p-10 rounded-4xl lg:-mx-16 h-full flex flex-col justify-around">
                  <div>
                    <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                      Camelot Insurance
                    </h3>
                    <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                      Responsive redesign of this outdated website to improve
                      usability and showcase company information effectively.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Figma
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Adobe Illustrator
                      </Badge>
                    </div>
                  </div>
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
              <div className="order-1 lg:order-2">
                <img
                  src="/HomePage/camelot-insurance.png"
                  alt="Board Game Friends App"
                  className="mx-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Project 2 */}
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
                <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
                <div className="bg-[#f2f8fb] p-10 rounded-4xl lg:-mx-16 h-full flex flex-col justify-around">
                  <div>
                    <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                      Board Game Friends
                    </h3>
                    <p className="text-base font-light mb-4 text-[#101113] lg:pr-14">
                      An app that offers a seamless platform to create and join
                      in-person board game meetings.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Adobe Xd
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Adobe Photoshop
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Whimsical
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Optimal Workshop
                      </Badge>
                    </div>
                  </div>
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

          {/* Project 3 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
              <div className="lg:hidden">
                <PhoneScrollComponent />
              </div>
              <div className="relative h-full">
                <div className="relative h-full">
                  <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-[-100vw] md:bg-[#f2f8fb] md:z-[-1] "></div>
                  <div className="bg-[#f2f8fb] p-10 rounded-4xl lg:-mx-16 h-full flex flex-col justify-around">
                    <div>
                      <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                        YOPuedo app
                      </h3>
                      <p className="text-base font-light mb-4 text-[#101113]">
                        Mobile/web design that enables the elderly to access
                        remote assistance sessions provided by volunteers in a
                        simple way.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Figma
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Adobe Illustrator
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Adobe Photoshop
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Marvel
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Maze
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Optimal Workshop
                        </Badge>
                      </div>
                    </div>
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
              <div className="max-lg:hidden">
                <PhoneScrollComponent />
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <div className="bg-[#f2f8fb] p-10 rounded-4xl lg:-mx-16 h-full flex flex-col justify-around">
                  <div className="">
                    <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                      NOUS Latam
                    </h3>
                    <p className="text-base font-light mb-4 text-[#101113]">
                      Homepage redesign with a human-centered approach,
                      featuring UI enhancements, animations, icons, images and
                      more.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Figma
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                      >
                        Adobe Illustrator
                      </Badge>
                    </div>
                  </div>
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

          {/* Project 5 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="lg:hidden">
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
                  <div className="bg-[#f2f8fb] p-10 rounded-4xl lg:-mx-16 h-full flex flex-col justify-around">
                    <div>
                      <h3 className="text-[32px] font-title font-bold text-[#0679B8] mb-3">
                        SanaMente
                      </h3>
                      <p className="text-base font-light mb-4 text-[#101113]">
                        Anxiety app with a neomorphism design, featuring an AI
                        companion, a forum and relaxation tools for a calming
                        experience.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Figma
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                        >
                          Adobe Photoshop
                        </Badge>
                      </div>
                    </div>
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
