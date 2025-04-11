"use client"

import { useState } from "react"
import {  ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DesktopSidebar from "@/components/desktop-sidebar"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Footer from "@/components/footer"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"

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

    return (
        <div className="min-h-screen bg-[#ffffff] font-body pt-3 md:pt-8 px-3  md:px-8">
            {/* Header */}
            <header className="container bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4">
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
                    {/* Fila 1: Enlaces de navegación alineados a la derecha */}
                    <div className="col-span-3 flex justify-between items-start gap-6">
                        <Link href="/">
                            <ChevronLeftRoute />
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
                        <div className="bg-[#edf5fa] p-4 rounded-xl shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-1.png" alt="Journey" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold missiri text-xl">Journey</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c]">
                                I am a Jr. UX/UI designer and Sr. digital content creator with over 10 years of experience in digital communication.
                            </p>
                        </div>

                        {/* Methodology Card */}
                        <div className="bg-[#edf5fa] p-4 rounded-xl shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-2.png" alt="Methodology" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold missiri text-xl">Methodology</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c]">
                                I enjoy applying my knowledge to provide user-centered design solutions that create meaningful experiences.
                            </p>
                        </div>

                        {/* Focus Card */}
                        <div className="bg-[#edf5fa] p-4 rounded-xl shadow-sm md:col-span-2 lg:col-span-1">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-auto mr-2">
                                    <img src="/aboutMe/img-3.png" alt="Focus" className="w-12 h-auto" />
                                </div>
                                <h3 className="font-semibold missiri text-xl">Focus</h3>
                            </div>
                            <p className="text-sm text-[#4f4c4c]">
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
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Design:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.design ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.design && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Product Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Interaction Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    User Interface
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Prototyping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Visual Design
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Wireframing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Research */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("research")}>
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Research:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.research ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.research && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    User Interviews
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    User Testing
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Information Architecture
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Journey Mapping
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Qualitative and Quantitative analysis
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    A/B Testing
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Software */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("software")}>
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Software:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.software ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.software && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Figma
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Adobe Ps, Ai, Id
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Whimsical
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Notion
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Maze
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Marvel
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Optimal Workshop
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
                                >
                                    Google Analytics
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-transparent border-1 border-0091fb text-[#0091fb] text-xs px-3 py-1 rounded-full"
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
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Courses and degrees:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.courses ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.courses && (
                            <div className="mt-3">
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#4f4c4c]">
                                    <li>Advanced UX UI Design | Coder House</li>
                                    <li>Prototyping | Coder House</li>
                                    <li>User Interface Design | UTN BA</li>
                                </ul>

                                <div className="mt-4">
                                    <p className="font-medium text-[#4f4c4c] missiri"><b>Social Communication Bachelor&apos;s Degree</b></p>
                                    <p className="text-sm text-[#4f4c4c]">
                                        Catholic University of Santiago del Estero, Argentina
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="font-medium text-[#4f4c4c] missiri"><b>Professional Journalist</b></p>
                                    <p className="text-sm text-[#4f4c4c]">
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
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">English:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.english ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.english && (
                            <div className="mt-3 text-sm text-[#4f4c4c]">
                                <p>C2 Proficient - 74/100</p>
                                <p className="text-[#000]"><b>EF SET English Certificate</b></p>
                            </div>
                        )}
                    </div>

                    {/* Spanish */}
                    <div className="mb-4 border-b border-[#e6e6e6] pb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("spanish")}>
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Spanish:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.spanish ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.spanish && (
                            <div className="mt-3 text-sm text-[#4f4c4c]">
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
                            <h3 className="text-[#0091fb] missiri font-medium text-2xl">Eikon Awards:</h3>
                            <ChevronUp
                                className={`h-5 w-5 text-[#0091fb] missiri transition-transform ${expandedSections.eikon ? "" : "rotate-180"}`}
                            />
                        </div>

                        {expandedSections.eikon && (
                            <div className="mt-3 text-sm text-[#4f4c4c]">
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
                    <h2 className="text-2xl font-semibold text-[#0004a4] missiri mb-4">Explore My Projects as</h2>

                    <div className="flex max-md:flex-col max-md:w-full gap-4 justify-center">
                        <Link href="/projects">
                            <Button className="bg-[#0091fb] hover:bg-[#0679b8] max-md:w-full text-white px-6 py-2 rounded-2xl p-6 text-lg">
                                UX UI Designer
                            </Button>
                        </Link>
                        <Link href="/content-creator">
                            <Button
                                variant="outline"
                                className="border border-0091fb text-[#0091fb] max-md:w-full hover:bg-[#e6f4ff] px-6 py-2 rounded-2xl p-6 text-lg"
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

