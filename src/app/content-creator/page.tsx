"use client"

import DesktopSidebar from "@/components/desktop-sidebar"
import MobileMenu from "@/components/mobile-menu"
import MobileMenuButton from "@/components/mobile-menu-button"
import { Youtube, Play } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import { InstagramEmbed } from 'react-social-media-embed';
import SimpleDialog from "@/components/simple-dialog"
import { useState } from "react"
import { Carousel } from "@/components/content-creator/carousel"
import { VideoPlayer } from "@/components/content-creator/video-player"
import CentralCarousel from "@/components/content-creator/central-carousel"
import ChevronLeftRoute from "@/components/ChevronLeftRoute"
import VisualNarrativesImages from "@/components/content-creator/visual-narratives"

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
        title: "Vos sos un eslabón importante en esta cadena ...",
        src: "https://www.youtube.com/watch?v=m0Sa_H8LTu4",
        thumbnail: "/content-creator/Carousel-1/3.png",
        source: "YouTube",
    },
    {
        id: 4,
        title: "Trabajamos junto con el productor para mejorar ...",
        src: "https://www.youtube.com/watch?v=V_oEBKFBxJ8",
        thumbnail: "/content-creator/Carousel-1/4.png",
        source: "YouTube",
    },
    {
        id: 5,
        title: "Firma Digital",
        src: "https://www.youtube.com/watch?v=RwE6cHjFETU&ab_channel=MinisteriodeInfraestructurayServiciosP%C3%BAblicos",
        thumbnail: "/content-creator/Carousel-1/5.png",
        source: "YouTube",
    },
]

export default function ContentCreatorPicks() {
    const [isDialogOpen, setIsDialogOpen] = useState("")

    const openDialog = (dialog: string) => setIsDialogOpen(String(dialog))
    const closeDialog = () => setIsDialogOpen("")

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
            <header className="container bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4">
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
                    {/* Fila 1: Enlaces de navegación alineados a la derecha */}
                    <div className="col-span-3 flex justify-between items-start gap-6">
                        <Link href="/about-me">
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
                <h2 className="text-2xl font-semibold mb-6 missiri text-[#000068] pl-4">What Guides My Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <div className="bg-[#edf5fa] p-9 rounded-4xl">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-1.png" alt="audience First" className="w-[46px] h-[42px] mr-4" />
                            <span className="font-semibold missiri text-2xl">Audience First</span>
                        </div>
                        <p className="text-[#101113] font-light text-base">
                            I start by listening the audience’s needs to craft relevant and meaningful content.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#edf5fa] p-9 rounded-4xl">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-2.png" alt="Empathy Insights" className="w-[46px] h-[42px] mr-4" />
                            <span className="font-semibold missiri text-2xl">Empathy Insights</span>
                        </div>
                        <p className="text-[#101113] font-light text-base">
                            I focus on human emotions to create content that feels personal and relatable.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#edf5fa] p-9 rounded-4xl md:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-3">
                            <img src="/content-creator/img-3.png" alt="Visual Storytelling" className="w-[46px] h-[42px] mr-4" />
                            <span className="font-semibold missiri text-2xl">Visual Storytelling</span>
                        </div>
                        <p className="text-[#101113] font-light text-base">
                            I turn insights into informative, engaging visuals that spark curiosity and action.
                        </p>
                    </div>
                </div>
            </section>

            {/* Explore My Work */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <h2 className="text-2xl font-semibold mb-6 missiri text-[#000068]">Explore My Work</h2>

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
                    <h2 className="text-3xl font-semibold mb-2 missiri text-[#0679B8]">Social Media</h2>
                    <p className="text-[#101113] font-light text-base mb-6">
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
                                                    <Play className="text-black/80" />
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
            </section>

            {/* Visual Narratives */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-3xl font-semibold mb-2 missiri text-[#0679B8]">Visual Narratives</h2>
                    <p className="text-[#101113] font-light text-base">
                        Concept and production of videos with a social focus, crafted to inform around key societal topics.
                    </p>
                </div>

                <VisualNarrativesImages />
            </section>

            {/* Articles & Stories */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-3xl font-semibold mb-2 missiri text-[#0679B8]">Articles & Stories</h2>
                    <p className="text-[#101113] font-light text-base mb-6">
                        Research, and writing of publications designed to inform, inspire, and connect with readers.
                    </p>
                </div>

                <div className="py-4">
                    <CentralCarousel />
                </div>
            </section>

            {/* Event Management */}
            <section className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="bg-[#f2f8fb] p-4 rounded-xl mb-6">
                    <h2 className="text-3xl font-semibold mb-2 missiri text-[#0679B8]">Event Management</h2>
                    <p className="text-[#101113] font-light text-base mb-6">
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
        </div>
    )
}

