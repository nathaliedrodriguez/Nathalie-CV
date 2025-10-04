"use client";

import { useState} from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import ChevronLeftRoute from "@/components/ChevronLeftRoute";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import MobileMenu from "@/components/mobile-menu";
import MobileMenuButton from "@/components/mobile-menu-button";
import Footer from "@/components/footer";
import ProjectsDropdown from "@/components/ProjectsDropdown"

export default function BoardGameFriends() {
  const [sections, setSections] = useState({
    about: true,
    responsiveDesign: true,
    uxDriven: true,
    programs: true,
    guidedDesign: true,
    conversionFocused: true,
    visitTheWebsite: true
  });

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
                <div className="grid grid-cols-3 grid-rows-3 min-h-32">
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
                            <ProjectsDropdown />
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
                    <div className="col-span-3"></div>

                    {/* Fila 3: Foto de perfil y texto alineados a la izquierda */}
                    <div className="col-span-3 flex items-center gap-4 pb-5">
                        <h1 className="text-3xl font-title font-bold">
                        Comp<span className="text-[#0091fb]">AI</span>
                      </h1>
                    </div>
                  </div>
                </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Disclaimer */}
        <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
            This project was developed as part of my work at Alpha Efficiency for the client CompAI. All content  is protected by copyright and subject to confidentiality agreements. It is presented here for <span className="not-italic font-normal">illustrative purposes</span> only to showcase my involvement in the design process. It may not be reproduced or distributed without the express authorization of the parties involved.
        </div>

        <div className="mt-4 text-left italic font-epilogue font-extralight text-[14px] text-[#101113]">
            <span className="font-normal">Alpha Efficiency Team Members:</span><br/>
            UX UI Designers: Nathalie D. Rodriguez<br/>
            Project Manager: Lourdes Romero<br/>
            Developer: Hernán<br/>
            Chief Executive Officer: Brian Dordevic<br/>
            Client: CompAI
        </div>

        {/* Spacer */}
        <div className="my-8"></div>

        {/* About Section */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("about")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              About the Project
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.about ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.about && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                The project involved creating a landing page based on the existing website, running in parallel on HubSpot to attract more clients. I rewrote the titles, built a strong hero section, and added client logos to boost credibility. The page is lighter, faster, and conversion-focused, with clear CTAs, strategic contact forms, and optimized content hierarchy. SEO improvements ensure it performs alongside the existing site while driving more clicks, engagement, and qualified leads.
              </p>
            </div>
          )}
        </div>

        {/* Responsive Design */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("responsiveDesign")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Responsive Design
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.responsiveDesign ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.responsiveDesign && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <div className="mt-20">
                <div className="flex w-full flex-col md:flex-row md:items-start gap-8 md:gap-[calc(55/1091*100%)]">
                  <div className="flex flex-col items-center w-full mb-4 md:mb-0 md:w-[calc(800/1091*100%)]">
                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                      PC size
                    </p>
                    <img
                      src="/compai/responsive_PC.png"
                      alt="PC size"
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                  <div className="flex flex-col items-center w-full md:w-[calc(236/1091*100%)]">
                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-10">
                      Mobile size
                    </p>
                    <img
                      src="/compai/responsive_mobile.png"
                      alt="Mobile size"
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* UX-Driven Upgrade */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("uxDriven")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              UX-Driven Upgrade
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.uxDriven ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.uxDriven && (
            <div className="mt-3 text-[#101113] font-light text-base">
              {/* Description */}
              <p className="mb-4 leading-relaxed">
                The new landing page was built as a superior version of the current site, combining marketing impact with user-centered design. It focuses on driving higher engagement, generating more qualified leads, and ultimately boosting sales through a faster, cleaner and more conversion-oriented experience.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><span className="font-normal">Lightweight and faster, </span> improving overall load time and user experience.</li>
                <li><span className="font-normal">High-impact headlines</span> crafted to capture attention and boost engagement.</li>
                <li><span className="font-normal">Contact forms</span> positioned strategically for quick user actions.</li>
                <li><span className="font-normal">Video testimonials</span> from major clients now placed higher and much more visible than before, strengthening social proof.</li>
                <li><span className="font-normal">Fully SEO optimized,</span> ensuring it performs in parallel with the existing site while driving more clicks and sales.</li>
              </ul>              
            </div>
          )}
        </div>

        {/* Programs Used Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("programs")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Programs Used
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.programs ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.programs && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
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

        {/* Guided Design Choices */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("guidedDesign")}>
                <h2 className="text-[#0679B8] text-2xl missiri font-semibold">Guided Design Choices</h2>
                <ChevronDown
                    className={`text-[#0679B8] w-8 h-8 transition-transform ${sections.guidedDesign ? "rotate-180" : ""}`}
                />
            </div>

            {sections.guidedDesign && (
              <div className="mt-3 text-[#101113] font-light text-base">
                {/* Description */}
                <p className="mb-4 leading-relaxed">
                    I always provide clients with multiple design options, whether it’s different images, alternative layouts, or content placement on subpages or overlays. I make sure they understand the rationale behind every choice, explaining why one element works best here and another is better elsewhere. This approach not only gives clients confidence in the design decisions but also ensures that every element is strategically positioned to drive engagement, improve usability and deliver measurable results.
                </p>
                <p className="mb-4 leading-relaxed">
                    By guiding clients through the reasoning, I turn design choices into a clear, results-focused strategy.
                </p>
                {/* Responsive Three Images Layout */}
                <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                        <div className="flex justify-center">
                            <img src="/compai/Guided_design_1.png" alt="Carrousel 1" className="max-w-full h-auto" />
                        </div>
                        <div className="flex justify-center">
                            <img src="/compai/Guided_design_2.png" alt="Carrousel 2" className="max-w-full h-auto" />
                        </div>
                        <div className="flex justify-center sm:col-span-2 lg:col-span-1">
                            <img src="/compai/Guided_design_3.png" alt="Carrousel 3" className="max-w-full h-auto" />
                        </div>
                    </div>
                </div>
              </div>
            )}
        </div>

        {/* Conversion-Focused Redesign */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("conversionFocused")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Conversion-Focused Redesign
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.conversionFocused ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.conversionFocused && (
            <div className="mt-3 text-[#101113] font-light text-base">
              {/* Description */}
              <p className="mb-4 leading-relaxed">
                I transformed the landing page into a high-performing marketing and sales tool with just a few strategic changes. By optimizing page speed, crafting high-impact messaging, highlighting client video reviews, and streamlining contact forms, the page now drives clearer user journeys and stronger conversions.
              </p>
              <p className="mb-4 leading-relaxed">
                Key Results & Impact (Projected / Early Metrics):
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><span className="font-normal">Greater visibility and engagement</span> with client video testimonials.</li>
                <li><span className="font-normal">Faster load times</span> improving overall user experience and retention.</li>
                <li><span className="font-normal">Contact forms</span> positioned strategically for quick user actions.</li>
                <li>This redesign shows how a <span className="font-normal">UX-driven, conversion-focused approach</span> can generate measurable business results quickly and efficiently, turning a few targeted improvements into significant growth opportunities.</li>
              </ul>              

              {/* Images: stats */}
              <div className="w-full my-8">
                {/* Large screens: 1 row, 2 columns; Medium/Small: 2 rows, 1 column each */}
                <div className="
                  flex flex-col items-center gap-4
                  lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-8
                ">
                  {[
                    {
                      src: "/compai/Conversion_Stats_1.svg",
                      alt: "Conversion Stats 1",
                    },
                    {
                      src: "/compai/Conversion_Stats_2.svg",
                      alt: "Conversion Stats 2",
                    },
                  ].map(({ src, alt }) => {
                    return (
                      <div
                        key={alt}
                        className="flex items-center justify-center my-2"
                        style={{
                          width: "auto",
                          maxWidth: "100%",
                        }}
                      >
                        <img
                          src={src}
                          alt={alt}
                          className="object-contain max-w-full h-auto w-4/5 lg:w-auto"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visit the website Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("visitTheWebsite")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Visit the website
            </h2>
            <ChevronDown
              className={`text-[#0679B8] w-8 h-8 transition-transform ${
                sections.visitTheWebsite ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.visitTheWebsite && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                Feel free to check out{" "}
                <a
                  href="https://trycomp.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  https://trycomp.ai/
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
