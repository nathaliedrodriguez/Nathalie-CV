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
        <div className="flex flex-col justify-center gap-0 my-4">
            {/* Country Life Section */}
            <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("countryLife")}
                >
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#015F2B] dark:text-[#0EA853]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Country Life
                    </p>
                </div>
                {sections.countryLife && (
                    <button
                        onClick={() => toggleImageExpansion("CountryLife")}
                        className="mt-3 flex w-full justify-center"
                    >
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
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#95272A] dark:text-[#CD1116]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Raffle
                    </p>
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
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#5D7D8C]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Report
                    </p>
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
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#F37022] dark:text-[#F37022]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Events
                    </p>
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
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#51478C] dark:text-[#9B8BFF]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Entrepreneurs
                    </p>
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
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#0098D9] dark:text-[#0098D9]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Tourism
                    </p>
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
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("protagonists")}
                >
                    <p
                        className="font-epilogue font-normal text-[16px] leading-[36px] tracking-[0px] text-center align-middle w-full text-[#553064] dark:text-[#B1B719]"
                        style={{
                            fontFamily: 'var(--font-epilogue)',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '36px',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                        }}
                    >
                        Protagonists
                    </p>
                </div>

                {sections.protagonists && (
                    <button
                        onClick={() => toggleImageExpansion("Protagonists")}
                        className="mt-3 flex w-full justify-center"
                    >
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
