"use client";

import Link from "next/link";
import type React from "react";
import ThemeToggle from "./theme-toggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef, FC } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Variables para el gesto de deslizamiento
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Nuevo estado para controlar la visibilidad de la lista de UX UI Designs
  const [isUxUiOpen, setIsUxUiOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("isUxUiOpen");
      return stored === "true";
    }
    return false;
  });

  // Obtener la ruta actual
  const pathname = usePathname();

  // Solo mostrar en dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Escuchar el evento personalizado del botón
    const handleToggleMenu = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen);
    };

    window.addEventListener(
      "toggleMobileMenu",
      handleToggleMenu as EventListener
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener(
        "toggleMobileMenu",
        handleToggleMenu as EventListener
      );
    };
  }, []);

  // Efecto para notificar cambios de estado
  useEffect(() => {
    // Notificar al botón cuando el menú cambia de estado
    const event = new CustomEvent("mobileMenuStateChange", {
      detail: { isOpen }
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  // Evitar scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Manejadores de eventos táctiles para el gesto de deslizamiento
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50; // Umbral de 50px para considerar un deslizamiento

    if (isLeftSwipe) {
      setIsOpen(false);
    }

    // Reiniciar valores
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isVisible) return null;

  interface IconProps {
    src: string;
    alt: string;
    scale?: string;
  }

  const Icon: FC<IconProps> = ({ src, alt, scale = "scale-150" }) => (
    <span className="relative w-6 h-6 mr-4 flex-shrink-0 overflow-visible">
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 transform ${scale}`}
      />
    </span>
  );

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      ref={menuRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
    >
      <div className="relative h-full w-full max-w-[430px] mx-auto bg-[#edf5fa] flex flex-col items-center justify-between py-12 px-8 rounded-r-3xl shadow-xl drawer-left overflow-y-auto min-h-screen">
        <div className="flex items-center justify-end w-full">
          <ThemeToggle forceShow />
        </div>
        {/* Perfil */}
        <div className="flex flex-col items-start space-y-6 mt-8 -ml-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-white">
            <img
              src="/HomePage/profile.png"
              alt="Profile"
              className="object-cover"
            />
          </div>

          <div className="text-left">
            <h1 className="text-[#0004a4] text-[24px] font-light font-epilogue leading-[1.5] tracking-[0px] align-middle mb-1">
              Nathalie D. Rodriguez
            </h1>
            <p className="text-[#101113] text-[12px] font-normal font-epilogue leading-[1.2] tracking-[0.2px] align-middle">
              UX / UI Designer - B.A. in Social Communication
            </p>
          </div>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col items-start w-full space-y-8 my-12">
          <Link
            href="/"
            className="flex items-center text-[#0091fb] font-epilogue font-normal text-[20px] leading-[1.2] tracking-[0px] align-bottom"
            onClick={() => setIsOpen(false)}
          >
            <Icon
              src="/HomePage/icons/home.svg"
              alt="HomeIcon"
              scale="scale-175"
            />
            Home
          </Link>

          <Link
            href="/about-me"
            className="flex items-center text-[#0091fb] font-epilogue font-normal text-[20px] leading-[1.2] tracking-[0px] align-bottom"
          >
            <Icon
              src="/HomePage/icons/star.png"
              alt="StarIcon"
              scale="scale-120"
            />
            About Me
          </Link>

          <div className="flex flex-col">
            <button
              type="button"
              className="flex items-center justify-between text-[#0091fb] font-epilogue font-normal text-[20px] leading-[1.2] tracking-[0px] align-bottom w-full focus:outline-none"
              onClick={() => {
                setIsUxUiOpen((prev) => {
                  localStorage.setItem("isUxUiOpen", (!prev).toString());
                  return !prev;
                });
              }}
            >
              <div className="flex items-center">
                <Icon
                  src="/HomePage/icons/touch.svg"
                  alt="StarIcon"
                  scale="scale-140"
                />
                UX UI Designs
              </div>
              <div className="ml-4">
                {isUxUiOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#0091fb]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#0091fb]" />
                )}
              </div>
            </button>
            {isUxUiOpen && (
              <div className="mt-2 space-y-8 ml-auto mr-8 w-fit">
                <Link
                  href="/projects"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects"
                      ? "text-[#0091fb] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • My projects
                </Link>
                <Link
                  href="/projects/camelot"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects/camelot"
                      ? "text-[#0091fb] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • Camelot Insurance
                </Link>
                <Link
                  href="/projects/bgf"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects/bgf"
                      ? "text-[#0091fb] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • Board Game Friends
                </Link>
                <Link
                  href="/projects/yo-puedo"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects/yo-puedo"
                      ? "text-[#0B9FF0] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • YOPuedo app
                </Link>
                <Link
                  href="/projects/nous"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects/nous"
                      ? "text-[#0B9FF0] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • NOUS Latam
                </Link>
                <Link
                  href="/projects/sanamente"
                  className={`font-epilogue font-normal text-[12px] leading-[100%] tracking-[0px] text-left block ${
                    pathname === "/projects/sanamente"
                      ? "text-[#0B9FF0] font-bold"
                      : "text-[#101113]"
                  }`}
                >
                  • Sanamente
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/content-creator"
            className="flex items-center text-[#0091fb] font-epilogue font-normal text-[20px] leading-[1.2] tracking-[0px] align-bottom"
          >
            <Icon
              src="/HomePage/icons/keyboard.svg"
              alt="KeyboardIcon"
              scale="scale-140"
            />
            Content Creator
          </Link>

          <div className="flex flex-col pt-10 gap-5">
            <Link
              href="https://www.behance.net/nathaliedrodriguez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#0091fb] text-xl"
            >
              <Icon
                src="/HomePage/icons/behance-icon.png"
                alt="BehanceIcon"
                scale="scale-80"
              />
              Behance
            </Link>

            <Link
              href="https://www.linkedin.com/in/nathaliedrodriguez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#0091fb] text-xl"
            >
              <Icon
                src="/HomePage/icons/linkedin-icon.png"
                alt="LinkedinIcon"
                scale="scale-80"
              />
              Linkedin
            </Link>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="text-center text-[#101113] mt-auto mb-0 font-epilogue font-light text-base leading-8 tracking-[0px]">
          Thanks for visiting my website!
        </div>

        {/* Elemento decorativo e indicador de deslizamiento */}
        <div className="absolute bottom-40 right-0 flex items-center">
          <img
            src="/HomePage/icons/chevron-swipe.png"
            alt="SwipeChevron"
            className="h-20"
          />
        </div>
      </div>
    </div>
  );
}
