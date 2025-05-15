"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import MobileMenuButton from "@/components/mobile-menu-button";
import DesktopSidebar from "@/components/desktop-sidebar";
import Link from "next/link";
import { useTheme } from "next-themes";
import AdobeXDEmbed from "@/components/bgf/adobe-xd-embed";
import ChevronLeftRoute from "@/components/ChevronLeftRoute";

export default function BoardGameFriends() {
  const [sections, setSections] = useState({
    about: true,
    whyThisVersionWorksBetter: true,
    programs: true,
    seoImprovements: true,
    challenges: true,
    uiDesign: true,
    livePrototype: true,
    testing: true,
    logoRedesign: true,
    visitTheWebsite: true
  });

  const toggleSection = (section: string) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const { theme } = useTheme();

  console.log(theme, "Este es el tema", typeof theme);

  return (
    <div className="min-h-screen bg-[#ffffff] font-body md:pt-8 max-md:pt-3 md:px-8 max-md:px-3 ">
      {/* Header */}
      <header className="container bg-[#edf5fa] rounded-3xl mx-auto max-w-7xl py-6 px-4">
        <div className="grid grid-cols-3 grid-rows-3 min-h-32">
          {/* Fila 1: Enlaces de navegación alineados a la derecha */}
          <div className="col-span-3 flex justify-between items-start gap-6">
            <Link href="/projects">
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
              Camelot <span className="text-[#0091fb]">Insurance</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
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
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.about ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.about && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                I redesigned the Camelot Insurance website to modernize an
                outdated platform, improving both its visual identity and user
                experience. The previous site had an old-fashioned design and
                lacked essential information, making navigation difficult for
                users.
              </p>

              <p className="mb-4 font-light">
                My focus was on enhancing usability, ensuring clear and
                comprehensive content, and creating a seamless experience across
                all devices.
              </p>

              <div className="mt-6">
                <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
                  <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0">
                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">
                      Before
                    </p>
                    <img
                      src="/camelot/before.svg"
                      alt="before"
                      className="w-full max-w-2xl"
                    />
                  </div>
                  <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
                    <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">
                      After
                    </p>
                    <img
                      src="/camelot/after.svg"
                      alt="after"
                      className="w-full max-w-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Why this version works better Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("whyThisVersionWorksBetter")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Why this version works better
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.whyThisVersionWorksBetter ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.whyThisVersionWorksBetter && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-2 text-[#101113]">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle"
                  }}
                >
                  • Simplified & User-Friendly:
                </span>{" "}
                <span
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    // @ts-ignore
                    leadingTrim: "cap-height"
                  }}
                >
                  Concise, scannable and easy to read.
                </span>
              </p>
              <p className="mb-2 text-[#101113]">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle"
                  }}
                >
                  • Clear Call To Actions (CTAs):
                </span>{" "}
                <span
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    // @ts-ignore
                    leadingTrim: "cap-height"
                  }}
                >
                  featuring a Discussion Forum and Group Chats for thematic
                  support.
                </span>
              </p>
              <p className="mb-4 text-[#101113]">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle"
                  }}
                >
                  • Engaging Tone:
                </span>{" "}
                <span
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    // @ts-ignore
                    leadingTrim: "cap-height"
                  }}
                >
                  a virtual assistant offering personalized recommendations
                  during anxiety crises using AI.
                </span>
              </p>

              <p className="mb-4 text-[#101113]">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle"
                  }}
                >
                  • Contact details
                </span>{" "}
                <span
                  style={{
                    fontFamily: "Epilogue",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    // @ts-ignore
                    leadingTrim: "cap-height"
                  }}
                >
                  are clearly presented, making them easy for users to find
                  while navigating the website.
                </span>
              </p>
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
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
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

        <div className="mt-6 md:-mx-8 max-md:-mx-3 flex justify-center">
          <img
            src="/camelot/programs_used.svg"
            alt="Programs Used"
            className="block w-[70vw] max-w-[520px] md:w-[60vw] md:max-w-[380px] lg:w-[80vw] lg:max-w-[600px]"
          />
        </div>

        {/* SEO Improvements Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("seoImprovements")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              SEO Improvements
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.seoImprovements ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.seoImprovements && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    Keyword Optimization:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Includes relevant search terms.
                  </span>
                </li>
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    Engaging Headings:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Improves readability and ranking.
                  </span>
                </li>
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    Internal Linking:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Enhances navigation and SEO.
                  </span>
                </li>
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    User Interaction:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    Strong CTAs boost engagement and rankings.
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>

        <div className="mt-6 md:-mx-8 max-md:-mx-3 flex justify-center">
          <img
            src="/camelot/seo_improvements.svg"
            alt="SEO Improvements"
            className="block w-[70vw] max-w-[520px] md:w-[60vw] md:max-w-[380px] lg:w-[80vw] lg:max-w-[600px]"
          />
        </div>

        {/* Challenges Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("challenges")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Challenges
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.challenges ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.challenges && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                One of the main challenges in the design of this website was
                implementing animations and micro-interactions that enhanced the
                experience without compromising speed or load times. To achieve
                this, I chose simple yet impactful animations that encouraged
                user interaction, sparking curiosity while helping maintain user
                attention and engagement.
              </p>

              {/* Video Section */}
              <div className="flex justify-center mt-6">
                <div className="w-full max-w-xl rounded-lg overflow-hidden shadow-lg">
                  <video controls className="w-full h-auto">
                    <source src="/sanamente/sanamente.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* UI Design Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("uiDesign")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              UI Design
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.uiDesign ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.uiDesign && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                The UI design focused on creating a clean, intuitive and
                visually engaging interface. I replaced the previous brown and
                black color scheme with a range of greens to evoke a sense of
                trust, growth and renewal—values that resonate more strongly
                with today's insurance clients. Consistent use of color,
                typography, and layout helped strengthen the brand's presence
                across the site.
              </p>
            </div>
          )}
          {/* Features Section */}
          {sections.uiDesign && (
            <>
              <div className="mt-6 flex justify-center pt-15 pb-15">
                <div className="grid grid-cols-2 grid-rows-2 gap-x-40 gap-y-8">
                  <div className="flex items-center space-x-4">
                    <img
                      src="/camelot/group.svg"
                      alt="icon"
                      className="w-8 h-8"
                    />
                    <span
                      style={{
                        fontFamily: "Epilogue, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "148%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        color: "#281D1B"
                      }}
                    >
                      Clear Information Hierarchy
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src="/camelot/group.svg"
                      alt="icon"
                      className="w-8 h-8"
                    />
                    <span
                      style={{
                        fontFamily: "Epilogue, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "148%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        color: "#281D1B"
                      }}
                    >
                      Responsive Design
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src="/camelot/group.svg"
                      alt="icon"
                      className="w-8 h-8"
                    />
                    <span
                      style={{
                        fontFamily: "Epilogue, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "148%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        color: "#281D1B"
                      }}
                    >
                      Intuitive Navigation
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src="/camelot/group.svg"
                      alt="icon"
                      className="w-8 h-8"
                    />
                    <span
                      style={{
                        fontFamily: "Epilogue, sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "148%",
                        letterSpacing: "0px",
                        verticalAlign: "middle",
                        color: "#281D1B"
                      }}
                    >
                      Interactive Elements
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:-mx-8 max-md:-mx-3 flex justify-center">
                <img
                  src="/camelot/ui_design.svg"
                  alt="UI Design"
                  className="block w-[70vw] max-w-[520px] md:w-[60vw] md:max-w-[380px] lg:w-[80vw] lg:max-w-[600px]"
                />
              </div>
            </>
          )}
        </div>

        {/* Logo redesign Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("logoRedesign")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              Logo Redesign
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.logoRedesign ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.logoRedesign && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                As part of this website redesign, I also led the modernization
                of the brand's visual identity. This involved refining the
                original logo while preserving its core elements to ensure
                continuity with the brand’s heritage. The updated design brought
                a more polished and cohesive look, aligning with the website’s
                modern interface and resonating with a more contemporary
                audience.
              </p>
            </div>
          )}
          {/* Features Section */}
          {sections.logoRedesign && (
            <div className="mt-6">
              <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%] mb-4 md:mb-0">
                  <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">
                    Before
                  </p>
                  <img
                    src="/camelot/logo_camelot_before.svg"
                    alt="before"
                    className="w-auto"
                    style={{ height: "400px" }}
                  />
                </div>
                <div className="flex flex-col items-center w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
                  <p className="text-lg text-start font-title font-bold text-[#0091fb] mb-3">
                    After
                  </p>
                  <img
                    src="/camelot/logo_camelot_after.svg"
                    alt="after"
                    className="w-auto"
                    style={{ height: "400px" }}
                  />
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
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.visitTheWebsite ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.visitTheWebsite && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <p className="mb-4 font-light">
                Feel free to check out{" "}
                <a
                  href="https://www.camelot-insurance.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  camelot-insurance.com
                </a>
                . I'm excited to share my work with you!
              </p>
            </div>
          )}
        </div>

        {/* SEO Improvements Section */}
        <div className="mb-4 border-t border-[#e6e6e6] pt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("seoImprovements")}
          >
            <h2 className="text-[#0679B8] text-2xl font-semibold missiri">
              SEO Improvements
            </h2>
            <ChevronDown
              className={`text-[#0091fb] w-8 h-8 transition-transform ${
                sections.seoImprovements ? "rotate-180" : ""
              }`}
            />
          </div>

          {sections.seoImprovements && (
            <div className="mt-3 text-[#101113] font-light text-base">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    Quote Requests:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Number of insurance quote requests.
                  </span>
                </li>
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    User engagement:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Average time spent on site.
                  </span>
                </li>
                <li>
                  <span
                    className="font-epilogue font-[400] text-base leading-[24px] tracking-[0px] align-middle text-[#101113]"
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle",
                      color: "#101113"
                    }}
                  >
                    SEO Optimization:
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Epilogue, sans-serif",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0px",
                      verticalAlign: "middle"
                    }}
                  >
                    Search visibility for key services.
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Footer Images */}
      <footer className="mt-8 md:-mx-8 max-md:-mx-3">
        <img
          src="/camelot/footer_image.svg"
          alt="Footer image"
          className="w-screen"
        />
      </footer>
    </div>
  );
}
