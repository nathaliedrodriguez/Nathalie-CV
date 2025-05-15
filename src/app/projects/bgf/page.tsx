"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import MobileMenuButton from "@/components/mobile-menu-button";
import Link from "next/link";
import { useTheme } from "next-themes";
import AdobeXDEmbed from "@/components/bgf/adobe-xd-embed";
import ChevronLeftRoute from "@/components/ChevronLeftRoute";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export default function BoardGameFriends() {
  const [sections, setSections] = useState({
    about: true,
    prototype: true,
    programs: true,
    discover: true,
    goals: true,
    challenges: true,
    uiDesign: true,
    livePrototype: true,
    testing: true
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

  const { theme } = useTheme();
  const router = useRouter();

  console.log(theme, "Este es el tema", typeof theme);

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
                  className="text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
                >
                  Home
                </Button>
              </Link>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0 flex items-center gap-2"
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
                          className="px-1 py-0.5 text-[#101113] hover:text-[#0091fb] font-epilogue text-xs leading-none tracking-normal text-left transition-colors whitespace-nowrap"
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
                  className="text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
                >
                  About Me
                </Button>
              </Link>
              <Link href="/content-creator">
                <Button
                  variant="ghost"
                  className="text-base font-[400] text-[#0091fb] hover:text-[#0679b8] transition-colors p-0"
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
              Board Game <span className="text-[#0091fb]">Friends</span>
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
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              About the Project
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.about ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.about && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                BGF is an app designed for board game enthusiasts, providing a
                seamless platform to create and join in-person board game
                meetings.
              </p>

              <div className="flex justify-center my-6">
                <img
                  src="/BGF/BGF-1.png"
                  alt="Board Game Friends App"
                  width={256}
                  height={320}
                />
              </div>
            </div>
          )}
        </div>

        {/* Full Prototype Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("prototype")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Full Prototype
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.prototype ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.prototype && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p>
                I&apos;ve designed a complete prototype (not an MVP) with
                extensive interconnectivity between buttons, features, and
                workflows, and fully interconnected screens.
              </p>
            </div>
          )}
        </div>

        {/* Programs Used Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("programs")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Programs I Used
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
                  Adobe XD
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
              </div>
            </div>
          )}
        </div>

        {theme != "dark" && (
          <div className="mt-6 md:-mx-8 max-md:-mx-3">
            <img
              src="/BGF/BGF-2-Desktop.png"
              alt="Example Programs"
              className="hidden lg:block"
            />
            <img
              src="/BGF/BGF-2-tablet.png"
              alt="Example Programs"
              className="hidden md:block lg:hidden"
            />
            <img
              src="/BGF/BGF-2-phone.png"
              alt="Example Programs"
              className="block md:hidden"
            />
          </div>
        )}
        {theme == "dark" && (
          <div className="mt-6 md:-mx-8 max-md:-mx-3">
            <img
              src="/BGF/BGF-2-Desktop-Dark.png"
              alt="Example Programs"
              className="hidden lg:block"
            />
            <img
              src="/BGF/BGF-2-tablet-Dark.png"
              alt="Example Programs"
              className="hidden md:block lg:hidden"
            />
            <img
              src="/BGF/BGF-2-phone-Dark.png"
              alt="Example Programs"
              className="block md:hidden"
            />
          </div>
        )}

        {/* Discover Phase Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("discover")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Discover Phase
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.discover ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.discover && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p>
                The research phase was particularly engaging, as it allowed me
                to gather and interpret valuable insights directly from board
                game players. Understanding their preferences, pain points, and
                behavior provided a solid foundation for designing the app's
                features.
              </p>
            </div>
          )}
        </div>

        {/* Goals Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("goals")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
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
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Profile Customization:</span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Tailor user profiles to reflect preferences and interests.</span>
                </li>
                <li>
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Event Participation:</span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Streamline the search and joining process for events.</span>
                </li>
                <li>
                  <span className="font-[400] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Social Interaction:</span>{" "}
                  <span className="font-[300] text-base leading-[24px] tracking-[0px] align-middle font-epilogue text-[#101113]">Enhance communication among users to foster community.</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>

      <div className="md:-mx-8 max-md:-mx-3">
        <img
          src="/BGF/BGF-3-Desktop.png"
          alt="Example Goals"
          className="w-full"
        />
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Challenges Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("challenges")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
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
              <p className="mb-4 font-light">
                The most difficult part about designing a completely functional
                app was planning the full logical roadmap, accounting for all
                possible user's choices, errors and conditional actions. For
                users participating in the same event, dynamic changes in the
                event conditions (e.g. the Host leaves, change in reserved
                seats) must be reflected in everyone's interface and trigger
                actions and notifications.
              </p>

              <div className="flex justify-center mt-6 space-x-4">
                <img src="/BGF/BGF-4.png" alt="Example challenge" />
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
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
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
                I use heuristic evaluation in my UI design because it's like
                knowing that my design is made under clear rules and
                standardized norms. It's quick, cost-effective, and catches big
                issues early. This analysis complements and accompanies the
                feedback received from real users, which is undoubtedly the most
                important.
              </p>
            </div>
          )}
        </div>

        {/* Live Prototype Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("livePrototype")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Live Prototype
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.livePrototype ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.livePrototype && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <AdobeXDEmbed />
            </div>
          )}
        </div>

        {/* Testing and Feedback Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("testing")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Testing and Feedback
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.testing ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.testing && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <ul className="list-disc pl-5 space-y-2">
                <li>All users were able to complete the assigned tasks.</li>
                <li>
                  Everyone reached the end. (Some took detours while others took
                  shortcuts).
                </li>
                <li>
                  Logging in through Google was the quickest and preferred
                  method.
                </li>
                <li>
                  Users mentioned that the path is easy to navigate and
                  intuitive.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Footer Images */}
      <footer className="mt-8 md:-mx-8 max-md:-mx-3">
        <img src="/BGF/Footer.png" alt="Footer image" className="w-screen" />
      </footer>
    </div>
  );
}
