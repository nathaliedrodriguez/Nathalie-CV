"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import MobileMenuButton from "@/components/mobile-menu-button";
import Link from "next/link";
import TestingResults from "@/components/yo-puedo/dynamic-height-component";
import ChevronLeftRoute from "@/components/ChevronLeftRoute";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function YOPuedoProject() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState({
    about: true,
    programs: true,
    discover: true,
    goals: true,
    challenges: true,
    uiDesign: true,
    abTesting: true,
    testingResults: true,
    livePrototype: true
  });

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
    { name: "• Camelot Insurance", href: "/projects/camelot" },
    { name: "• Board Game Friends", href: "/projects/bgf" },
    { name: "• YOPuedo app", href: "/projects/yo-puedo" },
    { name: "• NOUS Latam", href: "/projects/nous" },
    { name: "• Sanamente", href: "/projects/sanamente" }
  ];

  const toggleSection = (section: string) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 ">
      {/* Mobile Menu Overlay */}
      <MobileMenu />
      {/* Header */}
      <header className="container bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4 relative">
        {/* MobileMenuButton: top right, only on mobile/tablet */}
        <div className="absolute right-6 top-6 lg:hidden z-50">
          <MobileMenuButton />
        </div>
        <div className={`grid grid-cols-3 ${showProjects ? 'grid-rows-2' : 'grid-rows-3'} min-h-32`}>
          {/* Fila 1: Enlaces de navegación alineados a la derecha */}
          <div className="col-span-3 flex justify-between items-start gap-6">
            <ChevronLeftRoute onClick={() => router.back()} />
            <div className="flex gap-6 max-md:hidden px-10">
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
                  className="cursor-pointer text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0 flex items-center gap-2"
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
          <div className="col-span-3 flex items-center gap-4 pb-5">
            <h1 className="text-3xl font-title font-bold">
              YOPuedo <span className="text-[#0091fb]">app</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* About Section */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("about")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              About the Project
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.about ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.about && (
            <div className="flex flex-col justify-center pt-8">
              <p className="text-[#101113] font-light text-base">
                Mobile/web design that enables the elderly to access remote
                assistance sessions provided by volunteers in a simple way.
              </p>
              <img src="/YoPuedo/img-1.png" alt="HeroBanner" />
            </div>
          )}
        </div>

        {/* Programs Used Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("programs")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Programs Used
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.programs ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.programs && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Adobe Xd
                </span>
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Adobe Photoshop
                </span>
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Whimsical
                </span>
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Optimal Workshop
                </span>
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Marvel
                </span>
                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                  Maze
                </span>
              </div>

              <div className="flex justify-center items-center my-8 relative">
                <div className="relative">
                  {/* Marco del teléfono */}
                  <div className="relative w-[300px] h-[600px]">
                    {/* Contenido de la app con scroll manual */}
                    <div
                      ref={contentRef}
                      className="absolute top-[15px] left-[30px] w-[250px] h-[570px] overflow-auto rounded-[32px] hide-scroll"
                      style={{
                        // Aseguramos que el scrollbar esté oculto pero el scroll funcione
                        scrollbarWidth: "none",
                        msOverflowStyle: "none"
                      }}
                    >
                      <img
                        src="/YoPuedo/img.png"
                        alt="App content"
                        className="w-full object-cover"
                        style={{
                          // Eliminamos la animación para permitir scroll manual
                          position: "relative" // Cambiamos de absolute a relative
                        }}
                      />
                    </div>

                    {/* Marco del teléfono */}
                    <img
                      src="/YoPuedo/PhoneMark.png"
                      alt="Phone frame"
                      className="absolute top-0 left-0 z-10 pointer-events-none w-full h-full"
                    />
                  </div>
                  
                  <div className="absolute bottom-[20px] right-[-35]">
                    <img
                      src="/YoPuedo/hand-md.svg"
                      alt="Hand"
                      className="w-10 h-13 hidden md:block lg:hidden"
                    />
                    <img
                      src="/YoPuedo/mouse-lg.svg"
                      alt="Mouse"
                      className="w-10 h-13 hidden lg:block"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Discover Phase Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("discover")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Discover Phase
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.discover ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.discover && (
            <div className="mt-3">
              <p className="mb-4 text-[#101113] font-light text-base">
                Going through this stage was a rewarding challenge. I delved
                into a world that demands a great deal of empathy and
                understanding. Considering the age and digital literacy level of
                the target users, it was essential to deeply research their
                consumption habits, routines, and the barriers or fears older
                adults face when using mobile devices. This provided incredibly
                valuable insights for designing an app that is extremely
                intuitive, easy to use, and meets the users&apos; needs.
              </p>

              <div className="flex justify-center mt-4 relative">
                <img src="/YoPuedo/img-3.png" alt="Abuelo leyendo" />
              </div>
            </div>
          )}
        </div>

        {/* Goals Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("goals")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Goals
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.goals ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.goals && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Empowering Older Adults:</span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">An easy-to-use app to build confidence and independence.</span>
                </li>
                <li>
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">
                    Enhancing User Interaction:
                  </span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Simple design with big buttons and clear instructions.</span>
                </li>
                <li>
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">
                    Improving Accessibility:
                  </span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Features that meet the needs of older users for greater comfort.</span>
                </li>
              </ol>

              <div className="mt-6 flex justify-center">
                <img src="/YoPuedo/img-4.png" alt="Phone image" />
              </div>
            </div>
          )}
        </div>

        {/* Challenges Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("challenges")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Challenges
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.challenges ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.challenges && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4">
                Designing an app to connect seniors with volunteer remote
                assistance brings unique challenges. To make it effective, I
                focused on keeping it simple and accessible, with intuitive,
                user-friendly features. That&apos;s why I chose large buttons,
                clear text, and a straightforward layout, which make it easier
                for elderly users, especially those who may struggle with
                technology. I also conducted extensive testing with seniors to
                ensure the app meets their needs and works effectively for them.
              </p>

              <div className="flex justify-center mt-4">
                <img src="/YoPuedo/img-5.png" alt="Music Grandma" />
              </div>
            </div>
          )}
        </div>

        {/* UI Design Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("uiDesign")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              UI Design
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.uiDesign ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.uiDesign && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p>
                I choose specific fonts and color styles to enhance readability,
                establish visual hierarchies, and create an attractive and
                consistent experience. Additionally, these elements contribute
                to accessibility and facilitate the communication of states,
                promoting an emotional connection that leads to greater
                retention and participation.
              </p>
            </div>
          )}
        </div>

        {/* A/B Testing Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("abTesting")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              A/B Testing
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.abTesting ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.abTesting && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4">
                I ran an A/B test in the YOPUEDO app to find the best way to
                improve the Assistance Sessions section, a key part of the app.
                I compared keeping the list of cards visible, which works well
                for older adults who prefer straightforward navigation, with two
                new options: adding a search bar feature by name and categories
                for quicker access and introducing a floating button to make
                things easier.
              </p>

              <div className="flex justify-center mt-4">
                <img src="/YoPuedo/img-6.png" alt="HotMap" />
              </div>
            </div>
          )}
        </div>

        {/* Testing Results Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("testingResults")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Testing Results
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.testingResults ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.testingResults && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="py-4">
                I added the search bars as tests showed they improve option
                selection for seniors, making it smoother and more
                user-friendly.
              </p>
              <div className="flex justify-between items-center mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0004A4] dark:text-[#0F15FF] missiri">
                    60%
                  </div>
                  <div className="text-xs">
                    Scrolled to find the option.
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#004AF5] missiri">
                    40%
                  </div>
                  <div className="text-xs">Used the search bar.</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0091fb] missiri">
                    0%
                  </div>
                  <div className="text-xs">Interacted with the floating button.</div>
                </div>
              </div>

              <TestingResults />
            </div>
          )}
        </div>

        {/* Live Prototype Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("livePrototype")}
          >
            <h2 className="text-[#0679B8] text-2xl missiri font-semibold">
              Live Prototype
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.livePrototype ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.livePrototype && (
            <div className="flex justify-center pt-4">
              <iframe
                width="360"
                height="800"
                src="https://embed.figma.com/proto/uxsg5e3nxz0u92YMi7ey8X/YOPUEDO_Rodriguez?page-id=290%3A1197&node-id=733-24575&p=f&viewport=536%2C3186%2C0.07&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=528%3A23817&embed-host=share"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Footer Images */}
      <footer className="-mx-3 md:-mx-8 mt-8">
        <img src="/YoPuedo/img-8.png" alt="Footer image" className="w-screen" />
      </footer>
    </div>
  );
}
