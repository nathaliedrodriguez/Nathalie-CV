"use client"

import DesktopSidebar from "@/components/desktop-sidebar"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MousePointerClick, Youtube, Play } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import { InstagramEmbed } from 'react-social-media-embed';
import SimpleDialog from "@/components/simple-dialog"
import { useState } from "react"
import VideoCarousel from "@/components/content-creator/video-carousel"
import { Carousel } from "@/components/content-creator/carousel"
import { VideoPlayer } from "@/components/content-creator/video-player"

const videos = [
    {
        id: 1,
        title: "Inauguración Bajada de las Altas Cumbres",
        src: "https://www.youtube.com/watch?v=0Az2W1ocRsQ&ab_channel=GobiernodelaProvinciadeC%C3%B3rdoba",
        thumbnail: "/content-creator/Carousel-1/1.png",
        source: "YouTube",
    },
    {
        id: 2,
        title: "Rutina del área de mantenimiento de Sistemas",
        src: "https://youtu.be/3IfcedSn-vc?si=ysM7xfEbKhorqmFz",
        thumbnail: "/content-creator/Carousel-1/2.png",
        source: "YouTube",
    },
    {
        id: 3,
        title: "Vos sos un eslabón importante en esta cadena",
        src: "https://www.youtube.com/watch?v=m0Sa_H8LTu4",
        thumbnail: "/content-creator/Carousel-1/3.png",
        source: "YouTube",
    },
    {
        id: 4,
        title: "Trabajamos junto con el productor para mejorar",
        src: "https://www.youtube.com/watch?v=V_oEBKFBxJ8",
        thumbnail: "/content-creator/Carousel-1/4.png",
        source: "YouTube",
    },
    {
        id: 5,
        title: "Desarrollo de infraestructura vial en la provincia",
        src: "https://www.youtube.com/watch?v=RwE6cHjFETU&ab_channel=MinisteriodeInfraestructurayServiciosP%C3%BAblicos",
        thumbnail: "/content-creator/Carousel-1/5.png",
        source: "YouTube",
    },
]

export default function ContentCreatorPicks() {
    const [isDialogOpen, setIsDialogOpen] = useState("")

    const openDialog = (dialog: string) => setIsDialogOpen(String(dialog))
    const closeDialog = () => setIsDialogOpen("")

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

    const ArticlesAndStoriesVideos = [
        "https://youtu.be/G0194NiR1Ds?t=1",
        "https://www.youtube.com/watch?v=pxTsfoOQcPA&ab_channel=LouisMedina",
        "https://youtu.be/2azvHp5s_DY?t=1"
    ]

    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)

    const handleVideoSelect = (index: number) => {
        setActiveVideoIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    const handleNextVideo = () => {
        if (activeVideoIndex !== null) {
            const nextIndex = (activeVideoIndex + 1) % videos.length
            setActiveVideoIndex(nextIndex)
        }
    }

    const handlePreviousVideo = () => {
        if (activeVideoIndex !== null) {
            const prevIndex = (activeVideoIndex - 1 + videos.length) % videos.length
            setActiveVideoIndex(prevIndex)
        }
    }

    return (
        <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 overflow-x-hidden">
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

                    {/* Fila 3: Foto de perfil y texto alineados a la izquierda */}
                    <div className="col-span-3 flex items-center gap-4 self-end">
                        <h1 className="text-3xl font-title font-bold">
                            Content Creator <span className="text-[#0091fb]">Picks</span>
                        </h1>
                    </div>
                </div>
            </header>

            {/* What Guides My Work */}
            <section className="container mx-auto py-6 max-w-7xl">
                <h2 className="text-2xl font-medium mb-6 missiri text-[#0004a4] pl-4">What Guides My Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div className="bg-[#edf5fa] p-4 rounded-xl">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-1.png" alt="audience First" className="w-[40px] h-auto mr-4" />
                            <span className="font-medium missiri text-xl">Audience First</span>
                        </div>
                        <p className="text-base text-[#4f4c4c]">
                            I start by listening the audience’s needs to craft relevant and meaningful content.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#edf5fa] p-4 rounded-xl">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-2.png" alt="Empathy Insights" className="w-[40px] h-auto mr-4" />
                            <span className="font-medium missiri text-xl">Empathy Insights</span>
                        </div>
                        <p className="text-base text-[#4f4c4c]">
                            I focus on human emotions to create content that feels personal and relatable.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#edf5fa] p-4 rounded-xl md:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-3.png" alt="Visual Storytelling" className="w-[40px] h-auto mr-4" />
                            <span className="font-medium missiri text-xl">Visual Storytelling</span>
                        </div>
                        <p className="text-base text-[#4f4c4c]">
                            I turn insights into informative, engaging visuals that spark curiosity and action.
                        </p>
                    </div>
                </div>
            </section>

            {/* Explore My Work */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <h2 className="text-2xl font-medium mb-6 missiri text-[#0004a4]">Explore My Work</h2>

                <div className="grid grid-cols-3 grid-rows-7 gap-1 mb-8 aspect-square md:h-[500px] mx-auto">
                    <button onClick={() => openDialog("Space")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/1.png"
                            alt="Work sample 1"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Summer")} className="col-span-1 row-span-3 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/2.png"
                            alt="Work sample 2"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Energy")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/3.png"
                            alt="Work sample 3"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Dog")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/4.png"
                            alt="Work sample 4"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Grandma")} className="col-span-1 row-span-3 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/6.png"
                            alt="Work sample 6"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Eagle")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/5.png"
                            alt="Work sample 5"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Pool")} className="col-span-1 row-span-3 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/7.png"
                            alt="Work sample 7"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Cave")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/8.png"
                            alt="Work sample 8"
                            className="w-full h-full object-center"
                        />
                    </button>
                    <button onClick={() => openDialog("Googles")} className="col-span-1 row-span-2 bg-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-110 hover:z-50 inset-0">
                        <img
                            src="/content-creator/SocialMedia/9.png"
                            alt="Work sample 9"
                            className="w-full h-full object-center"
                        />
                    </button>
                </div>
            </section>

            {/* Social Media */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-xl font-medium mb-2 missiri text-[#0091fb]">Social Media</h2>
                    <p className="text-sm text-[#4f4c4c] mb-6">
                        Content designed to convey clear messages, strengthen visual identities, and drive engagement.
                    </p>
                </div>

                <Carousel
                    items={videos}
                    initialIndex={0}
                    preventDragWhenActive={activeVideoIndex !== null}
                    showControls={true}
                    showIndicators={false}
                    itemsToShow={4}
                    renderItem={(video, index) => (
                        <div className="p-2 w-full transition-all">
                            <div className="relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-md">
                                {activeVideoIndex === index ? (
                                    <VideoPlayer
                                        key={`player-${video.id}`} // Add key to force remount when video changes
                                        src={video.src}
                                        title={video.title}
                                        source={video.source}
                                        onNext={handleNextVideo}
                                        onPrevious={handlePreviousVideo}
                                        onEnded={() => handleNextVideo()}
                                        className="w-full"
                                        autoPlay={true}
                                    />
                                ) : (
                                    <>
                                        <div className="relative">
                                            <img
                                                src={video.thumbnail || "/placeholder.svg"}
                                                alt={video.title}
                                                className="w-full aspect-video object-cover"
                                            />
                                            <div
                                                className="absolute inset-0 flex items-center justify-center"
                                                onClick={() => handleVideoSelect(index)}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center">
                                                    {/* <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1"> */}
                                                    <Play  className="text-black/80"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{video.title}</h3>
                                            <div className="flex items-center mt-2">
                                                <Youtube className="h-4 w-4 text-red-600 mr-1" />
                                                <span className="text-xs text-gray-500">{video.source}</span>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                />
                {/* <CommonCarousel videos={videoUrls} showInstructions={false} /> */}
            </section>

            {/* Visual Narratives */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-xl font-medium mb-2 missiri text-[#0091fb]">Visual Narratives</h2>
                    <p className="text-sm text-[#4f4c4c] mb-6">
                        Concept and production of videos with a social focus, crafted to inform around key societal topics.
                    </p>
                </div>

                <div className="flex flex-col justify-center gap-4 my-8">
                    {/* Country Life Section */}
                    <div className="mb-4 border-t border-[#e6e6e6] pt-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSection("countryLife")}
                        >
                            <h3 className="text-[#015F2B] text-base font-medium text-center w-full">Country Life</h3>
                        </div>
                        {sections.countryLife && (
                            <button onClick={() => openDialog("CountryLife")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/CountryLife.jpg"
                                    alt="Country Life visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "CountryLife" ? "md:w-full" : ""}`}
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
                            <button onClick={() => openDialog("Raffia")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Raffia.jpg"
                                    alt="Raffia visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Raffia" ? "md:w-full" : ""}`}
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
                            <button onClick={() => openDialog("Report")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Report.jpg"
                                    alt="Report visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Report" ? "md:w-full" : ""}`}
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
                            <button onClick={() => openDialog("Events")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Events.jpg"
                                    alt="Events visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Events" ? "md:w-full" : ""}`}
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
                            <button onClick={() => openDialog("Entrepreneurs")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Entrepreneurs.jpg"
                                    alt="Entrepreneurs visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Entrepreneurs" ? "md:w-full" : ""}`}
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
                            <button onClick={() => openDialog("Tourism")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Tourism.jpg"
                                    alt="Tourism visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Tourism" ? "md:w-full" : ""}`}
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
                            <h3 className="text-[#553064] text-base font-medium text-center w-full">Protagonists</h3>
                        </div>

                        {sections.protagonists && (
                            <button onClick={() => openDialog("Protagonists")} className="mt-3 flex w-full justify-center">
                                <img
                                    src="/content-creator/ArticlesAndStories/Protagonists.jpg"
                                    alt="Protagonists visual narrative"
                                    className={`relative cursor-pointer w-full h-auto md:w-1/2 rounded-md ${isDialogOpen == "Protagonists" ? "md:w-full" : ""}`}
                                />
                                <MousePointerClick className="text-black/50" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Articles & Stories */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-xl font-medium mb-2 missiri text-[#0091fb]">Articles & Stories</h2>
                    <p className="text-sm text-[#4f4c4c] mb-6">
                        Research, and writing of publications designed to inform, inspire, and connect with readers.
                    </p>
                </div>

                <div className="py-4">
                    <VideoCarousel videos={ArticlesAndStoriesVideos} showInstructions={false} />
                </div>
            </section>

            {/* Event Management */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-xl font-medium mb-2 missiri text-[#0091fb]">Event Management</h2>
                    <p className="text-sm text-[#4f4c4c] mb-6">
                        Innovative event organization with sensory installations and multimedia, fueling engagement and media
                        coverage.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Dialog */}
            <SimpleDialog isOpen={isDialogOpen == "Space"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/CDZD6vvhbqM/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Summer"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/CMR0F5LBwV6/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Energy"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/CCRlHCcBCyt/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Dog"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/B5Ia8CQhwuX/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Eagle"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/CAJVlsghME5/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Grandma"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/CLzFzBVBV5X/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Pool"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/B8T84-oBtgV/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Cave"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/B2sNFgThFMP/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Googles"} onClose={closeDialog} title="Cordobaok">
                <div className="">
                    <InstagramEmbed url="https://www.instagram.com/p/B7647WABecM/?utm_source=ig_web_copy_link" />
                </div>
            </SimpleDialog>

            {/* <SimpleDialog isOpen={isDialogOpen == "CountryLife"} onClose={closeDialog} title="Country Life">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/CountryLife.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Raffia"} onClose={closeDialog} title="Report">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Raffia.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Report"} onClose={closeDialog} title="Report">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Report.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Events"} onClose={closeDialog} title="Events">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Events.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Entrepreneurs"} onClose={closeDialog} title="Entrepreneurs">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Entrepreneurs.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Tourism"} onClose={closeDialog} title="Tourism">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Tourism.jpg" alt="" />
                </div>
            </SimpleDialog>
            <SimpleDialog isOpen={isDialogOpen == "Protagonists"} onClose={closeDialog} title="Protagonists">
                <div className="">
                    <img src="/content-creator/ArticlesAndStories/Protagonists.jpg" alt="" />
                </div>
            </SimpleDialog> */}
        </div>
    )
}

