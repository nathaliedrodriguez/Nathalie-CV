"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DesktopSidebar from "@/components/desktop-sidebar"
import Link from "next/link"
import MobileMenuButton from "@/components/mobile-menu-button"
import MobileMenu from "@/components/mobile-menu"
import OrigamiAnimation from "@/components/sanamente/origami-animation"
import AnimatedButtons from "@/components/sanamente/button-animation"

export default function SanaMenteProject() {
    const [sections, setSections] = useState({
        about: true,
        discover: true,
        programs: true,
        keyAreas: true,
        uiDesign: true,
    })

    const toggleSection = (section: string) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }

    return (
        <div className="min-h-screen bg-[#ffffff] font-body pt-3 md:pt-8 px-3 md:px-8">
            {/* Header */}
            <header className="container bg-[#edf5fa] py-6 px-4 md:px-8 rounded-3xl mx-auto max-w-7xl">
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
                    {/* Fila 1: Enlaces de navegación alineados a la derecha */}
                    <div className="col-span-3 flex justify-between items-start gap-6">
                        <Link href="/projects">
                            <Button variant="ghost" className="">
                                <ChevronLeft className="h-10 w-10 text-[#0B9FF0]" />
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
                        <h1 className="text-3xl font-title font-bold">
                            <span>Sana</span>
                            <span className="text-[#0091fb]">Mente</span>
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
                        <h2 className="text-[#0091fb] text-2xl missiri font-medium">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.about && (
                        <div className="mt-3 text-[#4f4c4c] text-base">
                            <p className="mb-6 leading-relaxed">
                                A new anxiety management app with a neomorphism design aims to bring daily calm. It offers fresh perspectives on routines with an AI companion plus useful tools for relaxation activities.
                            </p>

                            <div className="flex justify-center mt-6">
                                <OrigamiAnimation />
                                {/* <img src="/sanamente/img-1.png" alt="Sanamente ui" /> */}
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
                        <h2 className="text-[#0091fb] text-2xl missiri font-medium">Discover Phase</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.discover ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.discover && (
                        <div className="mt-3 text-[#4f4c4c] text-base">
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
                        <h2 className="text-[#0091fb] text-2xl missiri font-medium">Programs Used</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.programs ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.programs && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2 mb-6">
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
                                    Adobe Photoshop
                                </Badge>
                            </div>

                            <div className="flex justify-center my-6">
                                <div className="w-64 h-auto">
                                    <video
                                        src="/sanamente/sanamente.MP4"
                                        className="w-full h-auto rounded-4xl"
                                        autoPlay
                                        muted
                                        loop
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
                        <h2 className="text-[#0091fb] text-2xl missiri font-medium">Key areas</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.keyAreas ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.keyAreas && (
                        <div className="mt-3 text-[#4f4c4c] text-base">
                            <p className="mb-2">
                                <span className="font-bold">Empowerment:</span> providing tools to enhance self-esteem and reduce daily
                                stress levels.
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Community:</span> featuring a Discussion Forum and Group Chats for thematic
                                support.
                            </p>
                            <p className="mb-4">
                                <span className="font-bold">Companion:</span> a virtual assistant offering personalized recommendations
                                during anxiety crises using AI.
                            </p>

                        </div>
                    )}
                </div>

                <AnimatedButtons />
                
                {/* UI Design */}
                <div className="mb-6">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-[#e6e6e6] pb-2"
                        onClick={() => toggleSection("uiDesign")}
                    >
                        <h2 className="text-[#0091fb] text-2xl missiri font-medium">UI Design</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.uiDesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.uiDesign && (
                        <div className="mt-3 text-[#4f4c4c] text-base">
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

