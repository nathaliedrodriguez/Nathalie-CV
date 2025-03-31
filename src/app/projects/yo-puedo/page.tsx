"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import DesktopSidebar from "@/components/desktop-sidebar"
import Link from "next/link"

export default function YOPuedoProject() {
    const contentRef = useRef<HTMLDivElement>(null)
    const [sections, setSections] = useState({
        about: true,
        programs: false,
        discover: false,
        goals: false,
        challenges: false,
        uiDesign: false,
        abTesting: false,
        testingResults: false,
        livePrototype: false,
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
            <header className="container bg-[#e6f4ff] py-6 px-4 md:px-8 rounded-3xl mx-auto max-w-7xl">
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
                    {/* Fila 1: Enlaces de navegación alineados a la derecha */}
                    <div className="col-span-3 flex justify-between items-start gap-6">
                        <Link href="/projects">
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

                    {/* Fila 3: Foto de perfil y texto alineados a la izquierda */}
                    <div className="col-span-3 flex items-center gap-4 self-end">
                        <h1 className="text-xl font-title font-bold">
                            YOPuedo <span className="text-[#0091fb]">app</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* About Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("about")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.about && (
                        <div className="flex flex-col justify-center pt-8">
                            <p>Mobile/web design that enables the elderly to access remote assistance sessions provided by volunteers in a simple way.</p>
                            <img src="/YoPuedo/img-1.png" alt="HeroBanner" />
                        </div>
                    )}
                </div>

                {/* Programs Used Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("programs")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">Programs Used</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.programs ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.programs && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Adobe Xd
                                </span>
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Adobe Photoshop
                                </span>
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Whimsical
                                </span>
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Optimal Workshop
                                </span>
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Marvel
                                </span>
                                <span className="bg-[#e6f4ff] text-[#0091fb] text-xs px-3 py-1 rounded-full">
                                    Maze
                                </span>
                            </div>

                            <div className="flex justify-center items-center my-8">
                                <div className="relative">
                                    {/* Marco del teléfono */}
                                    <div className="relative w-[300px] h-[600px]">
                                        {/* Contenido de la app con scroll manual */}
                                        <div
                                            ref={contentRef}
                                            className="absolute top-[15px] left-[30px] w-[250px] h-[570px] overflow-auto rounded-[32px] hide-scroll"
                                            style={{
                                                // Aseguramos que el scrollbar esté oculto pero el scroll funcione
                                                scrollbarWidth: "none",
                                                msOverflowStyle: "none",
                                            }}
                                        >
                                            <img
                                                src="/YoPuedo/img.png"
                                                alt="App content"
                                                className="w-full object-cover"
                                                style={{
                                                    // Eliminamos la animación para permitir scroll manual
                                                    position: "relative", // Cambiamos de absolute a relative
                                                }}
                                            />
                                        </div>

                                        {/* Marco del teléfono */}
                                        <img
                                            src="/YoPuedo/PhoneMark.png"
                                            alt="Phone frame"
                                            className="absolute top-0 left-0 z-10 pointer-events-none w-full h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Discover Phase Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("discover")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">Discover Phase</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.discover ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.discover && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <p className="mb-4">
                                Going through this stage was a rewarding challenge. I delved into a world that demands a great deal of empathy and understanding. Considering the age and digital literacy level of the target users, it was essential to deeply research their consumption habits, routines, and the barriers or fears older adults face when using mobile devices. This provided incredibly valuable insights for designing an app that is extremely intuitive, easy to use, and meets the users&apos; needs.
                            </p>

                            <div className="flex justify-center mt-4">
                                <img src="/YoPuedo/img-3.png" alt="Abuelo leyendo" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Goals Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("goals")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">Goals</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.goals ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.goals && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <span className="font-medium">Empowering Older Adults:</span> An easy-to-use app to build confidence and independence.
                                </li>
                                <li>
                                    <span className="font-medium">Enhancing User Interaction:</span> Simple design with big buttons and clear instructions.
                                </li>
                                <li>
                                    <span className="font-medium">Improving Accessibility:</span> Features that meet the needs of older users for greater comfort.
                                </li>
                            </ol>

                            <div className="mt-6 flex justify-center">
                                <img src="/YoPuedo/img-4.png" alt="Phone image" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Challenges Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("challenges")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">Challenges</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.challenges ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.challenges && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <p className="mb-4">
                                Designing an app to connect seniors with volunteer remote assistance brings unique challenges. To make it effective, I focused on keeping it simple and accessible, with intuitive, user-friendly features. That&apos;s why I chose large buttons, clear text, and a straightforward layout, which make it easier for elderly users, especially those who may struggle with technology. I also conducted extensive testing with seniors to ensure the app meets their needs and works effectively for them.
                            </p>

                            <div className="flex justify-center mt-4">
                                <img src="/YoPuedo/img-5.png" alt="Music Grandma" />
                            </div>
                        </div>
                    )}
                </div>

                {/* UI Design Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("uiDesign")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">UI Design</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.uiDesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.uiDesign && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <p>I choose specific fonts and color styles to enhance readability, establish visual hierarchies, and create an attractive and consistent experience. Additionally, these elements contribute to accessibility and facilitate the communication of states, promoting an emotional connection that leads to greater retention and participation.</p>
                        </div>
                    )}
                </div>

                {/* A/B Testing Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("abTesting")}>
                        <h2 className="text-[#0091fb] text-lg font-medium">A/B Testing</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.abTesting ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.abTesting && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <p className="mb-4">
                                I ran an A/B test in the YOPUEDO app to find the best way to improve the Assistance Sessions section, a key part of the app. I compared keeping the list of cards visible, which works well for older adults who prefer straightforward navigation, with two new options: adding a search bar feature by name and categories for quicker access and introducing a floating button to make things easier.
                            </p>

                            <div className="flex justify-center mt-4">
                                <img src="/YoPuedo/img-6.png" alt="HotMap" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Testing Results Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("testingResults")}
                    >
                        <h2 className="text-[#0091fb] text-lg font-medium">Testing Results</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.testingResults ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.testingResults && (
                        <div className="mt-3 text-[#4f4c4c] text-sm">
                            <p className="py-4">I added the search bars as tests showed they improve option selection for seniors, making it smoother and more user-friendly.</p>
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#0091fb] missiri">60%</div>
                                    <div className="text-xs">Successfully used the app with no help</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#0091fb] missiri">40%</div>
                                    <div className="text-xs">Needed minimal guidance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#0091fb] missiri">0%</div>
                                    <div className="text-xs">Unable to complete tasks</div>
                                </div>
                            </div>

                            <div className="flex justify-around gap-3">
                                <img src="/YoPuedo/img-7.png" alt="Phone Image" />
                                <div className="p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">Search Bars:</h3>
                                    <h4 className="font-bold mb-2 text-[#0091fb]">By Name</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Improves navigation</li>
                                        <li>Saves time</li>
                                        <li>Adapts to context</li>
                                        <li>Enhances experience</li>
                                    </ul>
                                    <h4 className="font-bold mb-2 text-[#0091fb]">By Categories</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Organizes content</li>
                                        <li>Filters efficiently</li>
                                        <li>Reduces clutter</li>
                                        <li>Supports themes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Prototype Section */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("livePrototype")}
                    >
                        <h2 className="text-[#0091fb] text-lg font-medium">Live Prototype</h2>
                        <ChevronDown
                            className={`text-[#0091fb] w-5 h-5 transition-transform ${sections.livePrototype ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.livePrototype && (
                        <div className="flex justify-center pt-4">
                            <iframe width="360" height="800" src="https://embed.figma.com/proto/uxsg5e3nxz0u92YMi7ey8X/YOPUEDO_Rodriguez?page-id=290%3A1197&node-id=733-24575&p=f&viewport=536%2C3186%2C0.07&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=528%3A23817&embed-host=share"></iframe>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Images */}
            <div className="-mx-3 md:-mx-8 mt-8">
                <img src="/YoPuedo/img-8.png" alt="Footer image" className="w-screen" />
            </div>
        </div>
    )
}

