"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Footer from "@/components/footer"

export default function ReputationArm() {
    const [sections, setSections] = useState({
        about: true,
        visitWebsite: true,
        interface: true,
        mobile: true,
        programs: true,
        SEO: true,
        results: true,
        visitWebsite2: true,
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
        { name: "• VendiSmart", href: "/projects/vendismart" },
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
                            Vendi<span className="text-[#0091fb]">Smart</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="mb-4">            
                {/* Disclaimer */}
                <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
                    This project was developed as part of my work at Alpha Efficiency for the client Reputation Arm. All content is protected by copyright and subject to confidentiality agreements. It is presented here for <span className="not-italic font-normal">illustrative purposes</span> only to showcase my involvement in the design process. It may not be reproduced or distributed without the express authorization of the parties involved.
                </div>

                <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
                    <span className="font-normal">Alpha Efficiency Team Members:</span><br/>
                    UX UI Designers: Nathalie D. Rodriguez and Malena Pereyra<br/>
                    Project Manager: Lourdes Romero<br/>
                    Developer: Lien Sanchez<br/>
                    Chief Executive Officer: Brian Dordevic<br/>
                    Client: VendiSmart
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
                                DELETE THIS LINE BEFORE PUBLISHING 's.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                I designed a landing page for VendiSmart aimed at businesses on HubSpot, with the main goal of attracting clients interested in using their smart vending machines. The page needed to clearly explain how the service works, what types of businesses qualify, answer common questions and motivate visitors to submit the inquiry form.
                            </p>
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
                                href="https://vendismart.com/forbusiness/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                >
                                vendismart.com/forbusiness
                                </a>
                                .
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/vendismart/vendismart_Landing_Page-WIP.png" alt="VendiSmart Landing Page" className="w-3/4 max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>   

                {/* Interface & User Flow Design */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("interface")}
                    >
                        <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
                        Interface & User Flow Design
                        </h2>
                        <ChevronDown
                        className={`text-[#0679B8] w-8 h-8 transition-transform ${
                            sections.interface ? "rotate-180" : ""
                        }`}
                        />
                    </div>

                    {sections.interface && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <ul className="list-disc pl-5 space-y-2 mb-4 [&>li]:marker:text-[#6230F7] [&>li]:marker:text-2xl">
                                <li>
                                    <span className="font-normal">Structured layout guiding the user: </span> value proposition first (“Zero cost …”), then step-by-step explanation, use cases, FAQs and finally a simple form to convert visitors into leads.
                                </li>
                                <li>
                                    Use of <span className="font-normal">descriptive visuals</span> and strategically placed <span className="font-normal">CTAs</span> (“Get Started”, “Claim Yours”) to drive conversions.
                                </li>
                                <li>
                                    <span className="font-normal">Implemented SEO strategies </span> to improve organic visibility, including keyword selection, headings and metadata optimization.
                                </li>
                                <li>
                                    Designed <span className="font-normal">fully responsive</span> layouts that adapt seamlessly to desktop and mobile screens.
                                </li>
                            </ul>
                        </div>
                    )}
                </div>          

                {/* Mobile Size */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("mobile")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Mobile Size</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.mobile ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.mobile && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/vendismart/vendismart_Landing_page_Mobile.png" alt="Mobile Size" className="max-w-full h-auto mx-auto" />
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
                                    Adobe Photoshop
                                </span>
                                <span className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full">
                                    Adobe Illustrator
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* SEO Strategy */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("SEO")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">SEO Strategy</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.SEO ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.SEO && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                <span className="font-normal">Keyword research</span> for terms like “smart vending machines”, “free vending machine”, “machine leasing free” and “automated sales for businesses”.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                <span className="font-normal">Optimized titles</span>, meta descriptions and subheadings (h2/h3) to target relevant searches.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                <span className="font-normal">Clear, structured content</span> with headings and FAQs to capture informational searches and answer key user questions.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/vendismart/vendismart_Confirmation_Modal_Window_Mobile.png" alt="Confirmation Window Mobile" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>   
                    )}
                </div>

                {/* Results & Achievements */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("results")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Results & Achievements</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.results ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.results && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Overall, the landing page successfully combined clear UX/UI design, HubSpot integration and SEO strategies to attract qualified leads, improve conversions and deliver measurable results, leaving the client highly satisfied.
                            </p>
                            {/* Images: stats */}
                            <div className="w-full my-8">
                                {/* Large screens: 1 row, 3 columns; Medium: 2 rows (2+1); Small: 3 rows */}
                                <div className="
                                    flex flex-col items-center
                                    sm:grid sm:grid-cols-2 sm:gap-8 sm:place-items-center
                                    lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-8
                                ">
                                    {[
                                        {
                                            src: "/vendismart/vendismart_results_plus_40.svg",
                                            alt: "+40% Organic Traffic",
                                        },
                                        {
                                            src: "/vendismart/vendismart_results_plus_25.png",
                                            alt: "+25% Conversion Rate",
                                        },
                                        {
                                            src: "/vendismart/vendismart_results_minus_20.png",
                                            alt: "-20% Irrelevant Leads",
                                        },
                                    ].map(({ src, alt }, idx, arr) => {
                                        // For sm screens, center the last image in its row
                                        const isLast = idx === arr.length - 1;
                                        return (
                                            <div
                                                key={alt}
                                                className={
                                                    "flex items-center justify-center my-2" +
                                                    (isLast ? " sm:col-span-2 sm:justify-center" : "")
                                                }
                                                style={{
                                                    // On mobile, shrink images to fit if needed
                                                    width: "auto",
                                                    maxWidth: "100%",
                                                }}
                                            >
                                                <img
                                                    src={src}
                                                    alt={alt}
                                                    className={
                                                        "object-contain" +
                                                        " max-w-full h-auto" +
                                                        " " +
                                                        // On mobile, reduce size for single-column layout
                                                        " " + (window.innerWidth < 640 ? "w-4/5" : "")
                                                    }
                                                    style={{
                                                        // On mobile, shrink images if needed
                                                        maxWidth: window.innerWidth < 640 ? "80vw" : "auto",
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Image: card */}
                            <div className="mt-6">
                                <img src="/vendismart/vendismart_100_satisfaction.png" alt="100% Satisfaction" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Visit the website Section, 2 (again)*/}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("visitWebsite2")}
                    >
                        <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
                        Visit the Website
                        </h2>
                        <ChevronDown
                        className={`text-[#0679B8] w-8 h-8 transition-transform ${
                            sections.visitWebsite2 ? "rotate-180" : ""
                        }`}
                        />
                    </div>

                    {sections.visitWebsite2 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Feel free to check out{" "}
                                <a
                                href="https://vendismart.com/forbusiness/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                >
                                vendismart.com/forbusiness
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

