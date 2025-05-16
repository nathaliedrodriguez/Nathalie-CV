"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import MobileMenuButton from "@/components/mobile-menu-button"
import MobileMenu from "@/components/mobile-menu"
import OrigamiAnimation from "@/components/sanamente/origami-animation"
import AnimatedButtons from "@/components/sanamente/button-animation"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export default function SanaMenteProject() {
    const [sections, setSections] = useState({
        about: true,
        discover: true,
        programs: true,
        keyAreas: true,
        uiDesign: true,
    })

    // Dropdown de proyectos (solo desktop)
    const [showProjects, setShowProjects] = useState(false)
    const projectsDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!showProjects) return
        function handleClickOutside(event: MouseEvent) {
            if (
                projectsDropdownRef.current &&
                !projectsDropdownRef.current.contains(event.target as Node)
            ) {
                setShowProjects(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showProjects])

    const projects = [
        { name: "• Camelot Insurance", href: "/projects/camelot" },
        { name: "• Board Game Friends", href: "/projects/bgf" },
        { name: "• YOPuedo app", href: "/projects/yo-puedo" },
        { name: "• NOUS Latam", href: "/projects/nous" },
        { name: "• Sanamente", href: "/projects/sanamente" }
    ]

    const router = useRouter();

    const toggleSection = (section: string) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }

    return (
        <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3">
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
                            Sana <span className="text-[#0091fb]">Mente</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* About the Project */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("about")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.about && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-6 leading-relaxed">
                                A new anxiety management app with a neomorphism design aims to bring daily calm. It offers fresh perspectives on routines with an AI companion plus useful tools for relaxation activities.
                            </p>

                            <div className="flex justify-center mt-6">
                                <OrigamiAnimation />
                            </div>
                        </div>
                    )}
                </div>

                {/* Discover Phase */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("discover")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Discovery Phase</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.discover ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.discover && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-4 leading-relaxed">
                                Usually, neomorphism designs are associated with tech projects like music players, financial dashboards, and smart home controls, thanks to their clean, elegant, and futuristic look. But what if we used it for something completely different? I decided to challenge myself by breaking away from the ordinary and opening up something different, with empathy.
                            </p>
                        </div>
                    )}
                </div>

                {/* Programs Used */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("programs")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Programs Used</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.programs ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.programs && (
                        <div className="mt-3">
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

                            <div className="flex justify-center my-6">
                                <div className="w-64 h-auto relative overflow-hidden rounded-4xl">
                                    <video
                                        src="/sanamente/sanamente.MP4"
                                        className="w-full h-auto pointer-events-none"
                                        controls={false}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Key Areas */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("keyAreas")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Key areas</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.keyAreas ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.keyAreas && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-2 text-[#101113]">
                                <span
                                    className="font-bold"
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Empowerment:
                                </span>{" "}
                                <span
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 300,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                        // @ts-expect-error leadingTrim is not a standard CSS property
                                        leadingTrim: "cap-height",
                                    }}
                                >
                                    providing tools to enhance self-esteem and reduce daily stress levels.
                                </span>
                            </p>
                            <p className="mb-2 text-[#101113]">
                                <span
                                    className="font-bold"
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Community:
                                </span>{" "}
                                <span
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 300,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                        // @ts-expect-error leadingTrim is not a standard CSS property
                                        leadingTrim: "cap-height",
                                    }}
                                >
                                    featuring a Discussion Forum and Group Chats for thematic support.
                                </span>
                            </p>
                            <p className="mb-4 text-[#101113]">
                                <span
                                    className="font-bold"
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Companion:
                                </span>{" "}
                                <span
                                    style={{
                                        fontFamily: "Epilogue",
                                        fontWeight: 300,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                        // @ts-expect-error leadingTrim is not a standard CSS property
                                        leadingTrim: "cap-height",
                                    }}
                                >
                                    a virtual assistant offering personalized recommendations during anxiety crises using AI.
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                {sections.keyAreas && (
                    <AnimatedButtons />
                )}

                {/* UI Design */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("uiDesign")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">UI Design</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.uiDesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.uiDesign && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-6 leading-relaxed">
                                The app design goes beyond static visuals, incorporating smooth transitions and state changes to keep
                                users engaged. This approach invites clear, dynamic, and intuitive interaction with suggested activities
                                and exercises.
                            </p>

                            <div className="flex justify-center my-6">
                                <div className="w-64 h-auto">
                                    <img
                                        src="/sanamente/img-4.png"
                                        alt="Anxiety Relief Forum"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Image */}
            <footer className="-mx-3 md:-mx-8 h-64 mt-12">
                <img src="/sanamente/img-5.png" alt="Origami Pattern" className="w-full h-full object-cover" />
            </footer>
        </div>
    )
}

