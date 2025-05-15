"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import EmblaLogosCarousel from '@/components/ui/embla-logos-carousel'
import { useRouter } from "next/navigation"

export default function NOUSLatamProject() {
    const [sections, setSections] = useState({
        about: true,
        discover: true,
        programs: true,
        goals: true,
        challenges: true,
        uiDesign: true,
        freshLook: true,
        livePrototype: true,
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

    const { theme } = useTheme()
    const router = useRouter();

    const toggleSection = (section: string) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }

    return (
        <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3">
            {/* Header */}
            <header className="container bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4">
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
                            NOUS <span className="text-[#0091fb]">Latam</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* About the Project */}
                <div className="mb-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("about")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.about && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-4 leading-relaxed">
                                I redesigned the Home page of NOUS Latam to enhance the user experience while preserving its original sections and aesthetics as well as the architecture design. By making a few strategic adjustments, I improved the page&apos;s visual appeal and user engagement, effectively supporting its primary goal: connecting companies and professionals in the IT sector.
                            </p>

                            <div className="mt-6">
                                <div className="flex w-full justify-around">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">Before</p>
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">After</p>
                                </div>
                                <img src="/Nous/NOUS-Latam.gif" alt="Before and after" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Discover Phase */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("discover")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Discover Phase</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.discover ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.discover && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-4 leading-relaxed">
                                Through analysis and exploration, I identified that the platform could benefit from:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Improved user experience through more intuitive information flow and navigation.</li>
                                <li>Enhanced presentation of key elements like client logos and cards to encourage engagement.</li>
                                <li>A structured approach to content layout, providing clarity and focus.</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Programs Used */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("programs")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Programs Used</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.programs ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.programs && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                                    Figma
                                </span>
                                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                                    Adobe Illustrator
                                </span>
                            </div>

                            <div className="mt-4 flex w-full justify-center">
                                <img src="/Nous/img-2.png" alt="Before and after" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Goals */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("goals")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Goals</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.goals ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.goals && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <ol className="list-decimal pl-5 space-y-2 mb-4">
                                <li>Enhance the visibility and usability of the platform.</li>
                                <li>Create a more engaging and user-friendly experience.</li>
                                <li>Increase client negotiations and organic growth.</li>
                            </ol>

                            <div className="mt-4 border-t border-[#e6e6e6] py-2 flex flex-col justify-center">
                                <p className="text-base text-center font-title font-bold text-[#000] mb-2">Clients hiring on Nous</p>
                                <EmblaLogosCarousel />
                            </div>
                        </div>
                    )}
                </div>

                {/* Challenges */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("challenges")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Challenges</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.challenges ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.challenges && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>
                                    Modify the content layout and introduce new features in sections where the reading flow was disrupted.
                                </li>
                                <li>Balance the integration of new design elements with the platform&apos;s original aesthetic.</li>
                                <li>Streamline extensive content for easy consumption while retaining key details.</li>
                            </ul>

                            <div className="mt-6">
                                <img src="/Nous/img-3.png" alt="Before and after" className="hidden lg:block" />
                                <img src="/Nous/img-3-md.png" alt="Before and after" className="block lg:hidden" />
                            </div>
                        </div>
                    )}
                </div>

                {/* UI Design Changes */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("uiDesign")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">UI Design Changes</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.uiDesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.uiDesign && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span>
                                        🆕 A new UI kit was created with components for buttons, icons, and cards to ensure design consistency.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span>
                                        🔝 The topbar stays visible as users navigate, helping build a database of professionals and businesses.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span>🌀 Logos now appear in a high-definition, animated carousel for better visibility.</span>
                                </li>
                                <li className="flex items-start">
                                    <span>✨ Large text blocks are redesigned with icons for easier scanning.</span>
                                </li>
                                <li className="flex items-start">
                                    <span>❌ &quot;Learn more&quot; buttons were removed as they only prompted logins, not navigation.</span>
                                </li>
                                <li className="flex items-start">
                                    <span>🎡 New slide and carousel cards boost engagement and curiosity.</span>
                                </li>
                                <li className="flex items-start">
                                    <span>
                                        🔽 The footer is reorganized into four columns with an animated logo for brand awareness.</span>
                                </li>
                                <li className="flex items-start">
                                    <span>
                                        📚 Text and content are structured into cards and columns for improved readability and interaction.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span>🎨 Visual hierarchy and aesthetics were refined to enhance user engagement.</span>
                                </li>
                            </ul>

                            <div className="mt-8 flex justify-center">
                                <img src="/Nous/img-4.png" alt="UI Design Changes" />
                            </div>
                        </div>
                    )}
                </div>

                {/* A Fresh Look */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("freshLook")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">A Fresh Look</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.freshLook ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.freshLook && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            <p className="mb-4 leading-relaxed">
                                After the redesign, the home page became more user-friendly and visually appealing, with a clearer layout and improved content organization. As a result, NOUS is now positioned to stand out in its field, attracting more registrations and views, fostering greater client engagement, and ultimately contributing to the company's overall growth.
                            </p>

                            <div className="flex justify-center space-x-8 mt-8">
                                <div className="flex flex-col items-center">
                                    <img src="/Nous/img-5.png" alt="Before and after" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <img src="/Nous/img-6.png" alt="Before and after" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <img src="/Nous/img-7.png" alt="Before and after" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Prototype */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("livePrototype")}
                    >
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Live Prototype</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-8 h-8 transition-transform ${sections.livePrototype ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.livePrototype && (
                        <>
                        </>
                    )}
                </div>
            </div>
            {sections.livePrototype && (
                <iframe className="h-[600px] w-full" src="https://embed.figma.com/proto/fcL4iJHz6dtgpcgtWacJih/NOUS-Borrador?content-scaling=fixed&kind=proto&node-id=2-3&page-id=0%3A1&scaling=min-zoom&starting-point-node-id=2%3A3&embed-host=share"></iframe>
            )}
            <footer className="max-md:-mt-3 md:-mx-8">
                <img src="/Nous/img-8.png" alt="footer image" className="w-full" />
            </footer>
        </div>
    )
}

