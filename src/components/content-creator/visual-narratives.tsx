"use client"

import { MousePointerClick } from "lucide-react"
import { useState } from "react"

function VisualNarrativesImages() {
    const [expandedImages, setExpandedImages] = useState<Record<string, boolean>>({})

    const toggleImageExpansion = (imageName: string) => {
        setExpandedImages((prev) => ({
            ...prev,
            [imageName]: !prev[imageName],
        }))
    }

    const [sections, setSections] = useState({
        countryLife: false,
        raffia: false,
        report: false,
        events: false,
        entrepreneurs: false,
        tourism: false,
        protagonists: false,
    })

    const toggleSection = (section: string) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev],
        }))
    }
    return (
        <div className="flex flex-col justify-center gap-4 my-8">
            {/* Country Life Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("countryLife")}>
                    <h3 className="text-[#015F2B] text-base font-medium text-center w-full">Country Life</h3>
                </div>
                {sections.countryLife && (
                    <button onClick={() => toggleImageExpansion("CountryLife")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/CountryLife.jpg"
                            alt="Country Life visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["CountryLife"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Raffia Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("raffia")}>
                    <h3 className="text-[#95272A] text-base font-medium text-center w-full">Raffia</h3>
                </div>

                {sections.raffia && (
                    <button onClick={() => toggleImageExpansion("Raffia")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Raffia.jpg"
                            alt="Raffia visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Raffia"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Report Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("report")}>
                    <h3 className="text-[#5D7D8C] text-base font-medium text-center w-full">Report</h3>
                </div>

                {sections.report && (
                    <button onClick={() => toggleImageExpansion("Report")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Report.jpg"
                            alt="Report visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Report"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Events Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("events")}>
                    <h3 className="text-[#F37022] text-base font-medium text-center w-full">Events</h3>
                </div>

                {sections.events && (
                    <button onClick={() => toggleImageExpansion("Events")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Events.jpg"
                            alt="Events visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Events"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Entrepreneurs Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("entrepreneurs")}
                >
                    <h3 className="text-[#51478C] text-base font-medium text-center w-full">Entrepreneurs</h3>
                </div>

                {sections.entrepreneurs && (
                    <button onClick={() => toggleImageExpansion("Entrepreneurs")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Entrepreneurs.jpg"
                            alt="Entrepreneurs visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Entrepreneurs"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Tourism Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("tourism")}>
                    <h3 className="text-[#0098D9] text-base font-medium text-center w-full">Tourism</h3>
                </div>

                {sections.tourism && (
                    <button onClick={() => toggleImageExpansion("Tourism")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Tourism.jpg"
                            alt="Tourism visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Tourism"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>

            {/* Protagonists Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("protagonists")}>
                    <h3 className="text-[#553064] text-base font-medium text-center w-full">Protagonists</h3>
                </div>

                {sections.protagonists && (
                    <button onClick={() => toggleImageExpansion("Protagonists")} className="mt-3 flex w-full justify-center">
                        <img
                            src="/content-creator/ArticlesAndStories/Protagonists.jpg"
                            alt="Protagonists visual narrative"
                            className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${expandedImages["Protagonists"] ? "md:w-full" : ""}`}
                        />
                        <MousePointerClick className="text-black/50" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default VisualNarrativesImages
