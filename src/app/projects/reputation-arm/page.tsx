"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import EmblaLogosCarousel from '@/components/ui/embla-logos-carousel'
import { useRouter } from "next/navigation"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import Footer from "@/components/footer"

export default function ReputationArm() {
    const [sections, setSections] = useState({
        about: true,
        visitWebsite: true,
        programs: true,
        step1: true,
        step2: true,
        step3: true,
        whyThisVersion: true,
        step4: true,
        step5: true,
        step6: true,
        finalResults: true,
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
                            <span className="text-[#0091fb]">SaaS Review Platform</span> & Responsive Website
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="mb-4">
                    {/* Selecting buttons */}
                    <div className="flex max-md:flex-col max-md:w-full gap-4 justify-start">
                        <div className="w-full max-w-[160px]">
                            <Button className="w-full flex items-center justify-center cursor-pointer bg-[#edf5fa] text-[#0091fb] border border-0091fb h-10 rounded-2xl text-lg font-title leading-none">
                                SaaS
                            </Button>
                        </div>
                        <Link href="/projects/reputation-arm-website" className="w-full max-w-[160px]">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center cursor-pointer border border-0091fb text-[#0091fb] hover:bg-[#edf5fa] h-10 rounded-2xl text-lg font-title leading-none"
                            >
                                Website
                            </Button>
                        </Link>
                    </div>               

                {/* Disclaimer */}
                <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
                    This project was developed as part of my work at Alpha Efficiency for the client Reputation Arm. All content is protected by copyright and subject to confidentiality agreements. It is presented here for <span className="not-italic font-normal">illustrative purposes</span> only to showcase my involvement in the design process. It may not be reproduced or distributed without the express authorization of the parties involved.
                </div>

                <div className="mt-4 text-left text-[#101113] font-light text-base leading-relaxed">
                    <span className="font-bold">Alpha Efficiency Team Members:</span><br/>
                    UX UI Designer: Nathalie D. Rodriguez<br/>
                    Project Manager: Lourdes Romero<br/>
                    Developer: Federica Ulzurrum<br/>
                    Chief Executive Officer: Brian Dordevic<br/>
                    Client: Reputation Arm
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
                                ReputationArm is an all-in-one reputation management platform for local and multi-location businesses. It helps companies verify and optimize their listings, monitor and respond to reviews across platforms, publish updates to their Google Business Profiles, and generate more reviews through automated campaigns.
                            </p>
                            {/* Image Before/After */}
                            <div className="mt-20">
                                <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    Before
                                    </p>
                                    <img
                                    src="/ReputationArm/ra_olddashboard.png"
                                    alt="before"
                                    className="max-w-full max-w-xl"
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
                                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                                    After
                                    </p>
                                    <img
                                    src="/ReputationArm/ra_newdashboard.png"
                                    alt="after"
                                    className="max-w-full max-w-2xl"
                                    />
                                </div>
                                </div>
                            </div>
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
                                href="https://reputationarm.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                >
                                reputationarm.com
                                </a>
                                .
                            </p>
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
                                    Adobe Illustrator
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 1 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step1")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 1: In-Depth Exploration of the Existing Product</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step1 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step1 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                I spent time thoroughly analyzing the current platform. This included:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><span className="font-bold">UI Audit:</span> I reviewed all existing screens and the current information architecture to understand how content was organized.</li>
                                <li><span className="font-bold">Mapping current user flows:</span> I tracked the steps users had to take to complete key tasks, such as checking a location’s performance or launching a campaign.</li>
                                <li><span className="font-bold">Identifying friction points:</span> I uncovered redundant steps, duplicated information, and navigation issues — many of which stemmed from the disjointed location-related content.</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                This analysis was crucial to fully understand how the tool worked and identify which features needed to be improved or restructured.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_productexploration.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 2 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step2")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 2: Understanding the Client’s Core Need</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step2 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step2 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                The client's most important request was to centralize all location-related information in one single section.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Previously, users had to navigate multiple sections to view or act on data related to a specific location. This created confusion, wasted time, and increased the chance of errors.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                The new solution needed to simplify this process without removing essential features.
                            </p>
                        </div>
                    )}
                </div>

                {/* Step 3 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step3")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 3: The Solutions</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step3 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step3 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                <span className="font-bold">The redesign was driven by three major improvements that transformed the user experience:</span>
                            </p>

                            {/* Substep 3.1 */}
                            <p className="mb-4 leading-relaxed text-[#067bb6]">
                                &nbsp;&nbsp;1. Reorganized and Simplified Navigation:
                            </p>
                            <p className="mb-4 leading-relaxed">
                                I restructured the main navigation to make it more intuitive and task-oriented. Instead of having overlapping or unclear access points, the primary services were clearly defined: Reviews, Campaigns, Locations, Reports, Posts, Accounts, and Settings — each with their own submenus containing all relevant features and data. This change significantly reduced cognitive load and improved task efficiency.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_reviewsdashboard.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>

                            {/* Substep 3.2 */}
                            <p className="mb-4 leading-relaxed text-[#067bb6]">
                                &nbsp;&nbsp;2. Dashboard Redesign:
                            </p>
                            <p className="mb-4 leading-relaxed">
                                The dashboard previously displayed partial, disconnected information. I redesigned it entirely to provide a clearer, more actionable overview. It now shows:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li> Key statistics and performance metrics of active accounts</li>
                                <li> Graphs and summaries that give users an at-a-glance understanding of what needs attention</li>
                                <li> Clear visual prioritization to help users quickly move to high-impact tasks, such as responding to customer reviews or launching new campaigns</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                The result is a clean, structured, and insightful entry point that aligns with users’ real needs.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_dashboardnps.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>

                            {/* Substep 3.3 */}
                            <p className="mb-4 leading-relaxed text-[#067bb6]">
                                &nbsp;&nbsp;3. Section-Based “Hubs” for Focused Management:
                            </p>
                            <p className="mb-4 leading-relaxed">
                                To make the platform easier to navigate and understand, I introduced a Hub system. Each key section now has its own dedicated space — a dashboard-like hub that centralizes everything related to that topic:
                            </p>
                            <ul className="list-disc pl-5 space-y-4 mb-4">
                                <li> Reviews Hub</li>
                                <li> Campaign Log</li>
                                <li> Locations Hub</li>
                                <li> Accounts Hub</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                This approach allows users to find everything they need in one place, without jumping across multiple modules or repeating tasks.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><span className="font-bold">The “Locations Hub”</span></li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                The most important change addressed the specific pain point raised by the client: locations and citations were scattered across the platform, with multiple access points and inconsistent organization.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                The solution was the creation of the Locations Hub, a dedicated space where users can:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li> View detailed information for each location</li>
                                <li> See all reviews grouped by location</li>
                                <li> Access performance metrics and insights</li>
                                <li> Manage campaigns and accounts related to a specific location</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                This centralization transformed a fragmented experience into a coherent, efficient and intuitive one,  giving users a powerful command center for one of the platform’s most critical features.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_dashboardlocations.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Why this version works better */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("whyThisVersion")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Why this version works better</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.whyThisVersion ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.whyThisVersion && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><span className="font-bold">Simplified & User-Friendly:</span> Concise, scannable and easy to read.</li>
                                <li><span className="font-bold">Clear Call To Actions (CTAs):</span> Encourages action with direct phrases.</li>
                                <li><span className="font-bold">Engaging Tone:</span> More reassuring and customer-focused.</li>
                                <li><span className="font-bold">Contact details</span> are clearly presented, making them easy for users to find while navigating the website.</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Step 4 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step4")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 4: Designing New User Flows</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step4 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step4 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Based on earlier findings, I designed new optimized flows that provided a more logical and simplified experience. Key improvements included:
                            </p>
                            <p className="mb-4 leading-relaxed">
                                <span className="font-bold">From the Dashboard to Locations Hub:</span> A direct access point for users to quickly identify which locations need attention.
                                <br/>
                                <span className="font-bold">Centralized review management by location:</span> Users can respond to, tag and analyze reviews from a single place.
                                <br/>
                                <span className="font-bold">Campaign integration:</span> Quick access to current or past campaigns related to each location.
                                <br/>
                            </p>
                            <p className="mb-4 leading-relaxed">
                                I developed these flows always prioritizing visual hierarchy, accessibility, and consistent component use.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_userflows.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 5 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step5")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 5: Testing with Users</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step5 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step5 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Once the changes were implemented, we tested the redesigned experience with 6 current customers already using the platform. This phase allowed us to:
                            </p>
                            <ul className="list-disc pl-5 space-y-4 mb-4">
                                <li> Detect final tweaks before full rollout</li>
                                <li> Collect direct feedback on the new flows and the Locations Hub</li>
                                <li> Measure improvements in clarity, navigation, and task completion</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                <span className="font-bold">The results were very positive:</span> users quickly understood the new structure, completed key tasks with fewer steps, and highlighted the clarity and usefulness of the new module.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                This confirmed that the redesign was both functional and effective.
                            </p>
                            {/* Image */}
                            <div className="mt-6">
                                <img src="/ReputationArm/ra_newtemplate.png" alt="TBC" className="max-w-full h-auto mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 6 */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("step6")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Step 6: UI Redesign</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.step6 ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.step6 && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                Once the flows were defined, I moved on to redesigning the platform’s visual interface. <br/>
                                UI decisions were based on:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li> Visual simplicity with a focus on usability.</li>
                                <li> Consistent use of colors and typography for improved readability</li>
                                <li> Reusable components to support future product growth</li>
                                <li> Refined tables, cards and filters to handle large volumes of data while maintaining clarity</li>
                                <li> Designed a custom set of 50 icons to enhance navigation and reinforce the platform’s visual identity</li>
                            </ul>
                            <p className="mb-4 leading-relaxed">
                                I also ensured the new design was responsive and scalable.
                            </p>
                            {/* Image 1 */}
                            <div className="mt-20 flex flex-col items-center justify-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0 mx-auto">
                                <p className="text-lg text-center font-title font-bold text-[#0091fb] mb-10">
                                    Icons
                                </p>
                                <img
                                    src="/ReputationArm/ra_icons.png"
                                    alt="icons"
                                    className="max-w-full max-w-xl max-h-auto"
                                />
                            </div>

                            {/* Image 2 */}
                            <div className="mt-20 flex flex-col items-center justify-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0 mx-auto">
                                <p className="text-lg text-center font-title font-bold text-[#0091fb] mb-10">
                                    Responsive Dashboard View
                                </p>
                                <img
                                    src="/ReputationArm/ra_dashboardnpsmobile.png"
                                    alt="Responsive Dashboard View"
                                    className="max-w-full max-w-xl max-h-auto"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Final Results */}
                <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("finalResults")}>
                        <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Final Results</h2>
                        <ChevronDown
                            className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.finalResults ? "rotate-180" : ""}`}
                        />
                    </div>

                    {sections.finalResults && (
                        <div className="mt-3 text-[#101113] font-light text-base">
                            {/* Description */}
                            <p className="mb-4 leading-relaxed">
                                A Clearer, More Streamlined, User-Centered Experience.
                            </p>
                            <ul className="list-disc pl-5 space-y-4 mb-4">
                                <li> With the new Locations Hub, users now have a centralized, intuitive view of all their locations.</li>
                                <li> Key actions are easier to perform, and platform navigation is far more fluid and efficient.</li>
                                <li> Testing with real users validated the improvements and confirmed that the redesign delivered real value</li>
                            </ul>
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
                                href="https://reputationarm.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                >
                                reputationarm.com
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

