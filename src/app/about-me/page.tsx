"use client"

import { useState } from "react"
import { ChevronLeft, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DesktopSidebar from "@/components/desktop-sidebar"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Footer from "@/components/footer"

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#000068] font-body pt-8">
            {/* Header */}
            <header className="container bg-[#e6f4ff] dark:bg-[#2f3036] py-6 px-4 md:px-8 rounded-3xl mx-auto max-w-7xl">
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
                    {/* Fila 1: Enlaces de navegación alineados a la derecha */}
                    <div className="col-span-3 flex justify-between items-start gap-6">
                        <Link href="/">
                            <Button variant="ghost" className="">
                                <ChevronLeft className="h-10 w-10" />
                            </Button>
                        </Link>
                        <div className="md:hidden flex gap-6 relative">
                            <MobileMenu />
                            <MobileMenuButton />
                        </div>
                        <div className="flex gap-6 max-md:hidden">
                            <DesktopSidebar />
                        </div>
                    </div>

                    {/* Fila 2: Vacía para mantener el espacio */}
                    <div className="col-span-3"></div>

                    {/* Fila 3: Texto alineado a la izquierda */}
                    <div className="col-span-3 flex items-center gap-4 self-end">
                        <h1 className="text-xl font-title font-bold">
                            About <span className="text-[#0091fb] missiri dark:text-[#0b9ff0]">me</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* My Career */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">My Career</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Journey Card */}
                        <div className="bg-[#e6f4ff] p-4 rounded-xl shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-1.png" alt="Journey" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold text-[#0004a4] missiri">Journey</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                I am a Jr. UX/UI designer and Sr. digital content creator with over 10 years of experience in digital communication.
                            </p>
                        </div>

                        {/* Methodology Card */}
                        <div className="bg-[#e6f4ff] p-4 rounded-xl shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-2.png" alt="Methodology" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold text-[#0004a4] missiri">Methodology</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                I enjoy applying my knowledge to provide user-centered design solutions that create meaningful experiences.
                            </p>
                        </div>

                        {/* Focus Card */}
                        <div className="bg-[#e6f4ff] p-4 rounded-xl shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-3.png" alt="Focus" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold text-[#0004a4] missiri">Focus</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                My approach is defined by attentive listening, interdisciplinary collaboration, and a commitment to continuous improvement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">Skills</h2>

                    {/* Design */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("design")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Design:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.design ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.design && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Product Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Interaction Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    User Interface
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Prototyping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Visual Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Wireframing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Research */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("research")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Research:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.research ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.research && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    User Interviews
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    User Testing
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Information Architecture
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Journey Mapping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Qualitative and Quantitative analysis
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    A/B Testing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Software */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("software")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Software:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.software ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.software && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Figma
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Adobe Ps, Ai, Id
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Whimsical
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Notion
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Miro
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Marvel
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Optimal Workshop
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Google Analytics
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="font-body bg-[#e6f4ff] text-[#0091fb] rounded-2xl dark:text-[#e2e2e5] border-[#e6e6e6] dark:border-[#032561]"
                                >
                                    Jira
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">Education</h2>

                    {/* Courses and degrees */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("courses")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Courses and degrees:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.courses ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.courses && (
                            <div className="mt-3">
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                    <li>Advanced UX UI Design | Coder House</li>
                                    <li>Prototyping | Coder House</li>
                                    <li>User Interface Design | UTN BA</li>
                                </ul>

                                <div className="mt-4">
                                    <p className="font-medium text-[#4f4c4c] missiri"><b>Social Communication Bachelor&apos;s Degree</b></p>
                                    <p className="text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                        Catholic University of Santiago del Estero, Argentina
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="font-medium text-[#4f4c4c] missiri"><b>Professional Journalist</b></p>
                                    <p className="text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                        University College of Journalism Bishop Trejo and Sanabria, Córdoba, Argentina
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">Languages</h2>

                    {/* English */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("english")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">English:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.english ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.english && (
                            <div className="mt-3 text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                <p>C2 Proficient - 74/100</p>
                                <p><b>EF SET English Certificate</b></p>
                            </div>
                        )}
                    </div>

                    {/* Spanish */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("spanish")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Spanish:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.spanish ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.spanish && (
                            <div className="mt-3 text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                <p>Native</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Awards */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">Awards</h2>

                    {/* Eikon Awards */}
                    <div className="mb-4 border-b border-[#e6e6e6] dark:border-[#032561] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("eikon")}>
                            <h3 className="text-[#0091fb] missiri dark:text-[#0b9ff0] font-medium">Eikon Awards:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri dark:text-[#0b9ff0] transition-transform ${expandedSections.eikon ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.eikon && (
                            <div className="mt-3 text-sm text-[#4f4c4c] dark:text-[#e2e2e5]">
                                <p className="mb-2">2018 - 1st Place Category: Events.</p>
                                <p className="mb-4">Case: Green Economy Summit.</p>

                                <p className="mb-2">2019 - 2nd Place Category: General Institutional Communication Campaign.</p>
                                <p>Case: Coverage of Provincial Gas Network Works</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explore My Projects */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold text-[#0004a4] missiri mb-4">Explore My Projects as</h2>

                    <div className="flex gap-4 justify-center">
                        <Link href="/projects">
                            <Button className="bg-[#0091fb] hover:bg-[#0679b8] text-white px-6 py-2 rounded-full text-sm">
                                UX UI Designer
                            </Button>
                        </Link>
                        <Link href="/content-creator">
                            <Button
                                variant="outline"
                                className="border border-[#0091fb] text-[#0091fb] hover:bg-[#e6f4ff] px-6 py-2 rounded-full text-sm"
                            >
                                Content Creator
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Scroll to top button */}
                <div className="fixed bottom-6 right-6">
                    <Button
                        onClick={scrollToTop}
                        className="bg-[#e6f4ff] hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a3e] w-10 h-10 rounded-full flex items-center justify-center shadow-md p-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 19V5M12 5L5 12M12 5L19 12"
                                stroke="#0091fb"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Button>
                </div>

            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

