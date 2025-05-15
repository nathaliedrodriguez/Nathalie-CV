"use client"

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

const logos = [
  "/Nous/carrousel/finpec.png",
  "/Nous/carrousel/bitcoindepot.png",
  "/Nous/carrousel/cesla.png",
  "/Nous/carrousel/hightouch.png",
  "/Nous/carrousel/lumiq.png",
  "/Nous/carrousel/metamundo.png",
  "/Nous/carrousel/redpanda.png",
  "/Nous/carrousel/zazmic.png",
  "/Nous/carrousel/zilliqa.png",
]

// Se duplican los logos para un loop más largo
const allLogos = [...logos, ...logos]

export default function EmblaLogosCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoScroll({ speed: 0.4, stopOnInteraction: false })]
  )

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex items-center gap-4">
        {allLogos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={src.split('/').pop()?.replace('.png', '')}
            className="embla__slide h-6 object-scale-down"
            draggable={false}
          />
        ))}
      </div>
    </div>
  )
} 