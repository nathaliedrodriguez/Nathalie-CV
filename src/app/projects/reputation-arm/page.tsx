"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import EmblaLogosCarousel from '@/components/ui/embla-logos-carousel'
import { useRouter } from "next/navigation"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Footer from "@/components/footer"

export default function ReputationArm() {
    const [sections, setSections] = useState({
        about: true,
        visitWebsite: true,
        programs: true,
        step1: true,
        step2: true,
        step3: true,
        whyThisVersion: true,
        step4: true,
        step5: true,
        step6: true,
        finalResults: true,
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
        { name: "• My projects", href: "/projects" },
        { name: "• Reputation Arm", href: "/projects/reputation-arm" },
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
                            Reputation <span className="text-[#0091fb]">Arm</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="mb-4">
                    {/* Selecting buttons */}
                    <div className="flex max-md:flex-col max-md:w-full gap-4 justify-start">
                        <div className="w-full max-w-[160px]">
                            <Button className="w-full flex items-center justify-center cursor-pointer bg-[#edf5fa] text-[#0091fb] border border-0091fb h-10 rounded-2xl text-lg font-title leading-none">
                                SaaS
                            </Button>
                        </div>
                        <Link href="/content-creator" className="w-full max-w-[160px]">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center cursor-pointer border border-0091fb text-[#0091fb] hover:bg-[#edf5fa] h-10 rounded-2xl text-lg font-title leading-none"
                            >
                                Website (TBU)
                            </Button>
                        </Link>
                    </div>               

                {/* Disclaimer */}
                <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
                    TBU. This section showcases two different approaches for digital platforms, <span className="not-italic font-normal">illustrative purposes</span>, each tailored to unique user needs and business goals.
                </div>

                <div className="mt-4 text-left text-[#101113] font-light text-base leading-relaxed">
                    <span className="font-bold">TBU. Key considerations guided the design process:</span><br/>
                    User feedback was carefully analyzed to identify pain points and opportunities for improvement.<br/>
                    The visual hierarchy was refined to ensure clarity and ease of navigation.<br/>
                    Collaboration with stakeholders helped align the final solution with business objectives.
                </div>

                {/* Spacer */}
                <div className="my-8"></div>

                {/* About the Project */}
                    {/* Header */}
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("about")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>
                    {/* Inside the section */}
                    {sections.about && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                TBU.
                            </p>
                            {/* Image Before/After */}
                            <div className="mt-20">
                                <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    Before
                                    </p>
                                    <img
                                    src="/camelot/before.svg"
                                    alt="before"
                                    className="w-full max-w-xl max-h-[500px]"
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    After
                                    </p>
                                    <img
                                    src="/camelot/after.svg"
                                    alt="after"
                                    className="w-full max-w-2xl max-h-[500px]"
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Visit the website Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("visitWebsite")}
                    >
                        <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
                        Visit the Website
                        </h2>
                        <ChevronDown
                        className={`text-[#0679B8] w-8 h-8 transition-transform ${
                            sections.visitWebsite ? "rotate-180" : ""
                        }`}
                        />
                    </div>

                    {sections.visitWebsite && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Feel free to check out{" "}
                                <a
                                href="https://reputationarm.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                >
                                reputationarm.com
                                </a>
                                .
                            </p>
                        </div>
                    )}
                </div>             

                {/* Programs Used */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("programs")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Programs Used</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.programs ? "rotate-180" : ""}`}
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
                        </div>
                    )}
                </div>

                {/* Step 1 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step1")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 1: TBU</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step1 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step1 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                TBU:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><span className="font-bold">TBU:</span> TBU.</li>
                                <li><span className="font-bold">TBU:</span> TBU.</li>
                                <li><span className="font-bold">TBU:</span> TBU.</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                TBU.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/Nous/img-3.png" alt="Before and after" className="hidden lg:block" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Old Footer Images */}
            {/* <footer className="max-md:-mt-3 md:-mx-8">
                <img src="/Nous/img-8.png" alt="footer image" className="w-full" />
            </footer> */}

            {/* Footer */}
            <Footer />

        </div>
    )
}

