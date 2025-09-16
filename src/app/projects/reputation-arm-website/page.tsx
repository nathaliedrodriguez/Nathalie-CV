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
        websiteRedesign: true,
        programs: true,
        UIdesign: true,
        keyHighlights: true,
        SEO: true,
        Challenges: true,
        PCsize: true,
        MobileSize: true,
        visitWebsite: true,
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
                            <span className="text-[#0091fb]">Responsive Website</span> & SaaS Review Platform
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="mb-4">
                    {/* Selecting buttons */}
                    <div className="flex max-md:flex-col max-md:w-full gap-4 justify-start">
                        <Link href="/projects/reputation-arm" className="w-full max-w-[160px]">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center cursor-pointer border border-0091fb text-[#0091fb] hover:bg-[#edf5fa] h-10 rounded-2xl text-lg font-title leading-none"
                            >
                                SaaS
                            </Button>
                        </Link>
                        <div className="w-full max-w-[160px]">
                            <Button className="w-full flex items-center justify-center cursor-pointer bg-[#edf5fa] text-[#0091fb] border border-0091fb h-10 rounded-2xl text-lg font-title leading-none">
                                Website
                            </Button>
                        </div>
                    </div>               

                {/* Disclaimer */}
                <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
                    This project was developed as part of my work at Alpha Efficiency for the client Reputation Arm. All content is protected by copyright and subject to confidentiality agreements. It is presented here for <span className="not-italic font-normal">illustrative purposes</span> only to showcase my involvement in the design process. It may not be reproduced or distributed without the express authorization of the parties involved.
                </div>

                <div className="mt-4 text-left text-[#101113] font-light text-base leading-relaxed">
                    <span className="font-bold">Alpha Efficiency Team Members:</span><br/>
                    UX UI Designer: Nathalie D. Rodriguez<br/>
                    Project Manager: Lourdes Romero<br/>
                    Developer: Federica Ulzurrum<br/>
                    Chief Executive Officer: Brian Dordevic<br/>
                    Client: Reputation Arm
                </div>

                {/* Spacer */}
                <div className="my-8"></div>

                {/* Website Redesign */}
                    {/* Header */}
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("websiteRedesign")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Website Redesign</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.websiteRedesign ? "rotate-180" : ""}`}
                        />
                    </div>
                    {/* Inside the section */}
                    {sections.websiteRedesign && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                As part of the Alpha Efficiency team, I led the full redesign of Reputation Arm’s website with the goal of enhancing the user experience and supporting the company’s growth.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                The previous version had a limited structure, minimal content and an unclear user journey.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                After analyzing the site, I designed a new structure with more strategically organized sections, greater content depth and a more intuitive, streamlined and conversion-oriented user path.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                The redesign includes a stronger presence of call-to-action buttons at key points in the journey, as well as newly placed contact forms that make it easier for users to reach out and generate leads. A newsletter subscription option was also implemented, providing an additional channel for direct communication with users.
                            </p>
                            {/* Image Before/After */}
                            <div className="mt-20">
                                <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    Before
                                    </p>
                                    <img
                                    src="/ReputationArm-website/ra_beforedashboard.png"
                                    alt="before"
                                    className="max-w-full max-w-xl"
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    After
                                    </p>
                                    <img
                                    src="/ReputationArm-website/ra_afterdashboard.png"
                                    alt="after"
                                    className="max-w-full max-w-2xl"
                                    />
                                </div>
                                </div>
                            </div>
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

                {/* UI Design */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("UIdesign")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">UI Design</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.UIdesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.UIdesign && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                From a UI perspective, I developed a renewed visual system that reinforces brand identity through readable typography, a modern and professional color palette, and reusable components that ensure consistency and scalability. The high-fidelity sections reflect clear visual hierarchies, coherent navigation, and microinteractions that elevate the overall user experience.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm-website/ra_uidesign.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* 10 Key UI Highlights */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("keyHighlights")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">10 Key UI Highlights</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.keyHighlights ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.keyHighlights && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                I carefully shaped the interface of this site to balance clarity, flow and visual harmony. My goal was to create an experience where every element feels intentional and aligned with current design standards, so navigating becomes effortless, engaging and encourages visitors to take action with confidence:
                            </p>
                            <ul className="pl-5 space-y-2 mb-4">
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Clear hero headlines
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Prominent CTAs
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Clear navigation flow
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Service blocks with short descriptions
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Credibility Through Stats & Visual Proof
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Consistent visual design
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Easy-to-compare pricing layout
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Accessible contact form
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    Effortless Resource Browsing
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#25b6ce] text-lg">★</span>
                                    TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.TBU.
                                </li>
                            </ul>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm-website/ra_10keyuihighlights.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* SEO Improvements */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("SEO")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">SEO Improvements</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.SEO ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.SEO && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <ol className="pl-5 space-y-2 mb-4 list-decimal">
                                <li>Optimize title tags with local keywords</li>
                                <li>Unique meta descriptions for each page</li>
                                <li>Proper H1, H2, H3 structure with relevant keywords</li>
                                <li>Keyword-rich, clear content on all pages</li>
                                <li>Improve site loading speed</li>
                                <li>Ensure mobile-first responsiveness</li>
                                <li>Internal linking between pages and blog</li>
                            </ol>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm-website/ra_SEOimprovements.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>         

                {/* Challenges */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Challenges")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Challenges</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.Challenges ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.Challenges && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                The main challenge of this project was ensuring the site was fully responsive without compromising quality, while integrating creative elements that showcased and organized a large amount of information. I had to balance visual creativity with clarity, making sure every section remained engaging and easy to navigate on any device.
                            </p>
                        </div>
                    )}
                </div>

                {/* PC Size */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("PCsize")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">PC Size</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.PCsize ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.PCsize && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm-website/ra_challengespcsize.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Size */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("MobileSize")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Mobile Size</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.MobileSize ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.MobileSize && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm-website/ra_challengesmobilesize.png" alt="TBC" className="max-w-full h-auto mx-auto" />
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

