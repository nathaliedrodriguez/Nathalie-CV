"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import DesktopSidebar from "@/components/desktop-sidebar"
import Link from "next/link"
import { useTheme } from 'next-themes'

export default function BoardGameFriends() {
    const [sections, setSections] = useState({
        about: true,
        prototype: false,
        programs: false,
        discover: false,
        goals: false,
        challenges: false,
        uiDesign: false,
        livePrototype: false,
        testing: false,
    })

    const toggleSection = (section: string) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }

    const { theme } = useTheme()

    console.log(theme, "Este es el tema", typeof (theme))

    return (
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#000068] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 ">
            {/* Header */}
            <header className="container bg-[#e6f4ff] dark:bg-[#2f3036] rounded-3xl mx-auto max-w-7xl py-6 px-4">
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
                            Board Game <span className="text-[#0091fb] dark:text-[#0b9ff0]">Friends</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* About Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("about")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">About the Project</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.about ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.about && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <p className="mb-4">
                                BGF is an app designed for board game enthusiasts, providing a seamless platform to create and join
                                in-person board game meetings.
                            </p>

                            <div className="flex justify-center my-6">
                                <img
                                    src="/BGF/BGF-1.png"
                                    alt="Board Game Friends App"
                                    width={256}
                                    height={320}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Full Prototype Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("prototype")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Full Prototype</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.prototype ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.prototype && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <p>
                                I&apos;ve designed a complete prototype (not an MVP) with extensive interconnectivity between buttons, features, and workflows, and fully interconnected screens.
                            </p>
                        </div>
                    )}
                </div>

                {/* Programs Used Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("programs")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Programs I Used</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.programs ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.programs && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#e6f4ff] dark:bg-[#032561] text-[#0091fb] dark:text-[#0b9ff0] text-xs px-3 py-1 rounded-full">
                                    Adobe XD
                                </span>
                                <span className="bg-[#e6f4ff] dark:bg-[#032561] text-[#0091fb] dark:text-[#0b9ff0] text-xs px-3 py-1 rounded-full">
                                    Adobe Photoshop
                                </span>
                                <span className="bg-[#e6f4ff] dark:bg-[#032561] text-[#0091fb] dark:text-[#0b9ff0] text-xs px-3 py-1 rounded-full">
                                    Whimsical
                                </span>
                                <span className="bg-[#e6f4ff] dark:bg-[#032561] text-[#0091fb] dark:text-[#0b9ff0] text-xs px-3 py-1 rounded-full">
                                    Optimal Workshop
                                </span>
                            </div>

                        </div>
                    )}
                </div>

                {
                    theme != "dark" &&
                    <div className="mt-6 md:-mx-8 max-md:-mx-3">
                        <img src="/BGF/BGF-2-Desktop.png" alt="Example Programs" className="hidden lg:block" />
                        <img src="/BGF/BGF-2-tablet.png" alt="Example Programs" className="hidden md:block lg:hidden" />
                        <img src="/BGF/BGF-2-phone.png" alt="Example Programs" className="block md:hidden" />
                    </div>
                }
                {
                    theme == "dark" &&
                    <div className="mt-6 md:-mx-8 max-md:-mx-3">
                        <img src="/BGF/BGF-2-Desktop-Dark.png" alt="Example Programs" className="hidden lg:block" />
                        <img src="/BGF/BGF-2-tablet-Dark.png" alt="Example Programs" className="hidden md:block lg:hidden" />
                        <img src="/BGF/BGF-2-phone-Dark.png" alt="Example Programs" className="block md:hidden" />
                    </div>
                }

                {/* Discover Phase Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("discover")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Discover Phase</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.discover ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.discover && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <p>
                                The research phase was particularly engaging, as it allowed me to gather and interpret valuable insights directly from board game players. Understanding their preferences, pain points, and behavior provided a solid foundation for designing the app’s features.
                            </p>
                        </div>
                    )}
                </div>

                {/* Goals Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("goals")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Goals</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.goals ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.goals && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <span className="font-medium">Profile Customization:</span> Tailor user profiles to reflect
                                    preferences and interests.
                                </li>
                                <li>
                                    <span className="font-medium">Event Participation:</span> Streamline the search and joining process
                                    for events.
                                </li>
                                <li>
                                    <span className="font-medium">Social Interaction:</span> Enhance communication among users to foster
                                    community.
                                </li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:-mx-8 max-md:-mx-3">
                <img src="/BGF/BGF-3-Desktop.png" alt="Example Goals" className="w-full" />
            </div>

            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* Challenges Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("challenges")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Challenges</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.challenges ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.challenges && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <p className="mb-4">
                                The most difficult part about designing a completely functional app was planning the full logical roadmap, accounting for all possible user&apos;s choices, errors and conditional actions. For users participating in the same event, dynamic changes in the event conditions (e.g. the Host leaves, change in reserved seats) must be reflected in everyone&apos;s interface and trigger actions and notifications.
                            </p>

                            <div className="flex justify-center mt-6 space-x-4">
                                <img src="/BGF/BGF-4.png" alt="Example challenge" />
                            </div>
                        </div>
                    )}
                </div>

                {/* UI Design Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("uiDesign")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">UI Design</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.uiDesign ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.uiDesign && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <p>
                                I use heuristic evaluation in my UI design because it&apos;s like knowing that my design is made under clear rules and standardized norms. It&apos;s quick, cost-effective, and catches big issues early. This analysis complements and accompanies the feedback received from real users, which is undoubtedly the most important.
                            </p>
                        </div>
                    )}
                </div>

                {/* Live Prototype Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("livePrototype")}
                    >
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Live Prototype</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.livePrototype ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.livePrototype && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <iframe
                                src="https://xd.adobe.com/view/08ffdb71-3370-46e1-a223-0c32ef51a0ab-5dac/screen/3e9c0696-7496-4c18-8fbd-5e41a6c5602d"
                                width="100%"
                                height="600px">
                            </iframe>
                        </div>
                    )}
                </div>

                {/* Testing and Feedback Section */}
                <div className="mb-4 border-t border-[#e6e6e6] dark:border-[#032561] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("testing")}>
                        <h2 className="text-[#0091fb] dark:text-white text-lg font-medium">Testing and Feedback</h2>
                        <ChevronDown
                            className={`text-[#0091fb] dark:text-[#0b9ff0] w-5 h-5 transition-transform ${sections.testing ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.testing && (
                        <div className="mt-3 text-[#4f4c4c] dark:text-[#e2e2e5] text-sm">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>All users were able to complete the assigned tasks.</li>
                                <li>Everyone reached the end. (Some took detours while others took shortcuts).</li>
                                <li>Logging in through Google was the quickest and preferred method.</li>
                                <li>Users mentioned that the path is easy to navigate and intuitive.</li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
            {/* Footer Images */}
            <div className="mt-8 md:-mx-8 max-md:-mx-3">
                <img src="/BGF/Footer.png" alt="Footer image" className="w-screen" />
            </div>
        </div >
    )
}

