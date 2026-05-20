"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/images/art2.png",
    label: "Noiszer Radio",
    dj: "Independent station",
    genres: "Live shows, mixes, and visual radio",
    description:
      "Underground radio for new shows, late sets, and visual selections.",
  },
  {
    image: "/images/velvethaus.png",
    label: "Velvet Haus",
    dj: "Hosted by Spud Bud",
    genres: "Dark house, minimal, leftfield",
    description:
      "Late-night house and stripped-down club records.",
  },
  {
    image: "/images/deadfrequency2.jpg",
    label: "Dead Frequency",
    dj: "Noiszer Radio",
    genres: "Hardcore punk, noise, underground",
    description:
      "Fast punk, noise, and raw records with no soft edges.",
  },
  {
    image: "/images/sundayfade4.jpg",
    label: "Sunday Fade",
    dj: "Noiszer Radio",
    genres: "Oldies, soul, slow jams",
    description:
      "Soul cuts and slow records for the end of the week.",
  },
  {
    image: "/images/groovetherapy.jpg",
    label: "Groove Therapy",
    dj: "Noiszer Radio",
    genres: "Funk, disco, soul",
    description: "Funk, disco, and soul with a steady groove.",
  },
  {
    image: "/images/afterhours.png",
    label: "After Hours",
    dj: "Noiszer Radio",
    genres: "Rap, trap, underground",
    description:
      "Rap, trap, and underground records for late listening.",
  },
  {
    image: "/images/ctrlaltdelete.jpg",
    label: "Ctrl+Alt+Delete",
    dj: "Noiszer Radio",
    genres: "Electronica, leftfield, experimental",
    description:
      "Electronic, ambient, noise, and experimental sounds.",
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
        bg-white
        text-black
        lg:h-[calc(100svh-80px)]
        lg:grid-rows-[minmax(0,1fr)]
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

        <div className="absolute bottom-4 right-4 z-10 grid grid-cols-2 text-white sm:bottom-5 sm:right-5">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-9 w-9 items-center justify-center opacity-70 transition hover:opacity-100 sm:h-10 sm:w-10"
            aria-label="Previous show"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-9 w-9 items-center justify-center opacity-70 transition hover:opacity-100 sm:h-10 sm:w-10"
            aria-label="Next show"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent p-4 pr-24 text-white sm:p-6 sm:pr-36 lg:p-8">
          <div className="max-w-5xl [text-shadow:0_2px_18px_rgba(0,0,0,.65)]">
            <p className="text-[10px] font-black uppercase text-white/80 sm:text-xs">
              {slide.dj}
            </p>
            <h1 className="mt-2 max-w-4xl break-words text-[clamp(2.2rem,5vw,4.75rem)] font-black uppercase leading-[0.86]">
              {slide.label}
            </h1>
            <p className="mt-3 max-w-2xl text-[11px] font-black uppercase leading-snug text-white/80 sm:text-xs">
              {slide.genres}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-snug text-white/86 sm:text-base">
              {slide.description}
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
