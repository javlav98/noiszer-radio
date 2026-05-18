"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/images/art2.png",
    label: "Noiszer Radio",
    dj: "Live from the edge",
    genres: "Independent / Underground / Visual Radio",
    description:
      "A clean, raw station for rotating shows, late-night transmissions, and outsider sound.",
  },
  {
    image: "/images/velvethaus.png",
    label: "Velvet Haus",
    dj: "spud bud",
    genres: "Dark House / Minimal / Leftfield",
    description:
      "Late-night house, repetitive rhythms, and underground cuts built for after-dark listening.",
  },
  {
    image: "/images/deadfrequency2.jpg",
    label: "Dead Frequency",
    dj: "Noiszer Radio",
    genres: "Hardcore Punk / Noise / Underground",
    description:
      "Fast, loud, and raw. Punk, noise, and aggressive sounds with no soft edges.",
  },
  {
    image: "/images/sundayfade4.jpg",
    label: "Sunday Fade",
    dj: "Noiszer Radio",
    genres: "Oldies / Soul / Slow Jams",
    description:
      "Warm records, soul cuts, and faded oldies for the end of the week.",
  },
  {
    image: "/images/groovetherapy.jpg",
    label: "Groove Therapy",
    dj: "Noiszer Radio",
    genres: "Funk / Disco / Soul",
    description: "A feel-good blend of funk, disco, and soulful grooves.",
  },
  {
    image: "/images/afterhours.png",
    label: "After Hours",
    dj: "Noiszer Radio",
    genres: "Rap / Trap / Underground",
    description:
      "Gritty rap, trap, and late-night records with underground energy.",
  },
  {
    image: "/images/ctrlaltdelete.jpg",
    label: "Ctrl+Alt+Delete",
    dj: "Noiszer Radio",
    genres: "Electronica / Leftfield / Experimental",
    description:
      "Alternative electronic sounds, ambient textures, noise, and experimental selections.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const wheelLocked = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(nextSlide, 10000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (!horizontal || Math.abs(e.deltaX) < 35) return;

      e.preventDefault();

      if (wheelLocked.current) return;

      wheelLocked.current = true;
      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 700);
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      id="shows"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="
        grid
        h-[calc(100svh-104px)]
        w-full
        grid-rows-[minmax(0,1fr)]
        overflow-hidden
        border-b-2 border-black
        bg-[#f7f7f4]
        text-black
        md:h-[calc(100svh-80px)]
        md:grid-rows-[minmax(0,1fr)]
      "
    >
      <figure className="relative min-h-0 overflow-hidden border-b-2 border-black bg-white">
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt={item.label}
            className={`
              absolute inset-0
              h-full w-full
              object-cover
              object-center
              transition-opacity duration-700 ease-out
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        <div className="absolute bottom-4 right-4 z-10 grid grid-cols-2 border-2 border-black bg-white/90 sm:bottom-5 sm:right-5">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center border-r-2 border-black text-black transition hover:bg-black hover:text-white sm:h-12 sm:w-12"
            aria-label="Previous show"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center text-black transition hover:bg-black hover:text-white sm:h-12 sm:w-12"
            aria-label="Next show"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent p-4 pr-28 text-white sm:p-6 sm:pr-36 lg:p-8">
          <div className="max-w-4xl [text-shadow:0_2px_18px_rgba(0,0,0,.65)]">
            <h1 className="max-w-4xl break-words text-[clamp(1.9rem,5vw,4.75rem)] font-black uppercase leading-[0.86]">
              {slide.label}
            </h1>
            <div className="mt-3 grid max-w-3xl gap-2 sm:mt-4 lg:grid-cols-[14rem_1fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase text-[#e7ff00]">
                  {slide.dj}
                </p>
                <p className="mt-1 text-[10px] font-black uppercase text-white/80">
                  {slide.genres}
                </p>
              </div>
              <p className="max-w-xl text-sm leading-snug text-white/86">
                {slide.description}
              </p>
            </div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
