"use client"

import { useState, useRef, useEffect } from "react"
import {  ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"
import Footer from "@/components/footer"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import ThemeToggle from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import MobileMenuButton from "@/components/mobile-menu-button"

export default function AboutMe() {
    const [expandedSections, setExpandedSections] = useState({
        design: true,
        research: true,
        software: true,
        courses: true,
        english: true,
        spanish: true,
        eikon: true,
    })

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }

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

    const router = useRouter();

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
                            About <span className="text-[#0091fb] missiri">me</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* My Career */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">My Career</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Journey Card */}
                        <div className="bg-[#edf5fa] p-9 rounded-4xl shadow-base">
                            <div className="flex items-center mb-3">
                                <div className="w-[46px] h-[42px] mr-4">
                                    <img src="/aboutMe/img-1.png" alt="Journey" className="w-[46px] h-[42px]" />
                                </div>
                                <h3 className="font-semibold missiri text-2xl">Journey</h3>
                            </div>
                            <p className="text-[#101113] font-light text-base">
                                I am a Jr. UX/UI designer and Sr. digital content creator with over 10 years of experience in digital communication.
                            </p>
                        </div>

                        {/* Methodology Card */}
                        <div className="bg-[#edf5fa] p-9 rounded-4xl shadow-base">
                            <div className="flex items-center mb-3">
                                <div className="w-[46px] h-[42px] mr-4">
                                    <img src="/aboutMe/img-2.png" alt="Methodology" className="w-[46px] h-[42px]" />
                                </div>
                                <h3 className="font-semibold missiri text-2xl">Methodology</h3>
                            </div>
                            <p className="text-[#101113] font-light text-base">
                                I enjoy applying my knowledge to provide user-centered design solutions that create meaningful experiences.
                            </p>
                        </div>

                        {/* Focus Card */}
                        <div className="bg-[#edf5fa] p-9 rounded-4xl shadow-base md:col-span-2 lg:col-span-1">
                            <div className="flex items-center mb-3">
                                <div className="w-[46px] h-[42px] mr-4">
                                    <img src="/aboutMe/img-3.png" alt="Focus" className="w-[46px] h-[42px]" />
                                </div>
                                <h3 className="font-semibold missiri text-2xl">Focus</h3>
                            </div>
                            <p className="text-[#101113] font-light text-base">
                                My approach is defined by attentive listening, interdisciplinary collaboration, and a commitment to continuous improvement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Skills</h2>

                    {/* Design */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("design")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Design:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.design ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.design && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Product Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Interaction Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    User Interface
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Prototyping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Visual Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Wireframing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Research */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("research")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Research:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.research ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.research && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    User Interviews
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    User Testing
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Information Architecture
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Journey Mapping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Qualitative and Quantitative analysis
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    A/B Testing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Software */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("software")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Software:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.software ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.software && (
                            <div className="flex flex-wrap gap-2 mt-3">
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
                                    Adobe Ps, Ai, Id
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
                                    Notion
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
                                    Marvel
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Optimal Workshop
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Google Analytics
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0679B8 text-[#0679B8] text-xs px-3 py-1 rounded-full"
                                >
                                    Jira
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Education</h2>

                    {/* Courses and degrees */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("courses")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Courses and degrees:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.courses ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.courses && (
                            <div className="mt-3">
                                <ul className="list-disc pl-5 space-y-1 text-base text-[#101113]">
                                    <li className="font-light"><span className="font-normal text-[#101113]">Advanced UX UI Design</span> | Coder House</li>
                                    <li className="font-light"><span className="font-normal text-[#101113]">Prototyping</span> | Coder House</li>
                                    <li className="font-light"><span className="font-normal text-[#101113]">User Interface Design</span> | UTN BA</li>
                                </ul>

                                <div className="mt-4">
                                    <p className="font-medium text-[#101113]"><b>Social Communication Bachelor&apos;s Degree</b></p>
                                    <p className="text-base text-[#101113] font-light">
                                        Catholic University of Santiago del Estero, Santiago del Estero, Argentina
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="font-medium text-[#101113]"><b>Professional Journalist</b></p>
                                    <p className="text-base text-[#101113] font-light">
                                        University College of Journalism Bishop Trejo and Sanabria, Córdoba, Argentina
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Languages</h2>

                    {/* English */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("english")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">English:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.english ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.english && (
                            <div className="mt-3 text-base text-[#101113]">
                                <p className="font-light">C2 Proficient - 74/100</p>
                                <p className="text-[#101113]"><b>EF SET English Certificate</b></p>
                            </div>
                        )}
                    </div>

                    {/* Spanish */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("spanish")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Spanish:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.spanish ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.spanish && (
                            <div className="mt-3 text-base text-[#101113] font-bold">
                                <p>Native</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Awards */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Awards</h2>

                    {/* Eikon Awards */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("eikon")}>
                            <h3 className="text-[#0679B8] missiri font-medium text-2xl">Eikon Awards:</h3>
                            <ChevronUp
                                className={`h-8 w-8 text-[#0679B8] missiri transition-transform ${expandedSections.eikon ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.eikon && (
                            <div className="mt-3 text-base text-[#101113]">
                                <p className="mb-2">2018 - 1st Place Category: Events.</p>
                                <p className="mb-4">
                                    Case: <a href="https://cordoba.premioseikon.com/2018-cordoba-2/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0679b8]">Green Economy Summit</a>.
                                </p>

                                <p className="mb-2">2019 - 2nd Place Category: General Institutional Communication Campaign.</p>
                                <p className="font-light">
                                    Case: <a href="https://cordoba.premioseikon.com/2019-cordoba/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0679b8]">Coverage of Provincial Gas Network Works</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explore My Projects */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Explore My Projects as</h2>

                    <div className="flex max-md:flex-col max-md:w-full gap-4 justify-center">
                        <Link href="/projects">
                            <Button className="cursor-pointer bg-[#0091fb] hover:bg-[#0679b8] max-md:w-full text-white px-6 py-2 rounded-2xl p-6 text-lg">
                                UX UI Designer
                            </Button>
                        </Link>
                        <Link href="/content-creator">
                            <Button
                                variant="outline"
                                className="cursor-pointer border border-0091fb text-[#0091fb] max-md:w-full hover:bg-[#e6f4ff] px-6 py-2 rounded-2xl p-6 text-lg"
                            >
                                Content Creator
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

