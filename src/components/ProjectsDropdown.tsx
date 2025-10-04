import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const projects = [
    { name: "• Reputation Arm", href: "/projects/reputation-arm" },
    { name: "• CompAI", href: "/projects/compai" },
    { name: "• VendiSmart", href: "/projects/vendismart" },
    { name: "• Camelot Insurance", href: "/projects/camelot" },
    { name: "• Board Game Friends", href: "/projects/bgf" },
    { name: "• YOPuedo app", href: "/projects/yo-puedo" },
    { name: "• NOUS Latam", href: "/projects/nous" },
    { name: "• Sanamente", href: "/projects/sanamente" }
]

export default function ProjectsDropdown() {
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

    return (
        <div className="relative" ref={projectsDropdownRef}>
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
    )
}