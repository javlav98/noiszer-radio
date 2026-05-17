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
        h-[calc(100svh-72px)]
        w-full
        grid-rows-[auto_minmax(0,1fr)_auto_auto_auto]
        overflow-hidden
        border-b-2 border-black
        bg-[#f3f1ea]
        text-black
        md:h-[calc(100svh-48px)]
      "
    >
      <div className="grid grid-cols-[1fr_auto] border-b-2 border-black bg-white text-[10px] uppercase">
        <div className="border-r-2 border-black px-4 py-2 sm:px-6">
          Noiszer Archive
        </div>
        <div className="px-4 py-2 sm:px-6">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

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
      </figure>

      <div className="bg-[#f3f1ea]">
        <div className="mx-auto max-w-[1500px] px-4 py-2 sm:px-6 lg:px-8">
          <p className="inline-flex border border-black bg-white px-2 py-0.5 text-[9px] uppercase">
            Featured Show
          </p>

          <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <h1 className="text-[clamp(2.2rem,7vw,5.25rem)] font-semibold uppercase leading-none">
                {slide.label}
              </h1>
            </div>

            <p className="max-w-xl text-xs leading-snug text-black/70 lg:pt-1">
              {slide.description}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1500px] border-t-2 border-black bg-white sm:grid-cols-3">
          <div className="border-b-2 border-black p-2.5 sm:border-b-0 sm:border-r-2">
            <p className="text-[9px] uppercase text-black/45">Host</p>
            <p className="mt-0.5 text-xs font-semibold uppercase">{slide.dj}</p>
          </div>

          <div className="border-b-2 border-black p-2.5 sm:border-b-0 sm:border-r-2">
            <p className="text-[9px] uppercase text-black/45">Sound</p>
            <p className="mt-0.5 text-xs uppercase">{slide.genres}</p>
          </div>

          <div className="p-2.5">
            <p className="text-[9px] uppercase text-black/45">Status</p>
            <p className="mt-0.5 text-xs uppercase">Live / Archive ready</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto_1fr] border-t-2 border-black bg-[#f3f1ea]">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-8 items-center px-4 text-left text-[10px] uppercase transition hover:bg-black hover:text-white sm:px-6"
          >
            <ArrowLeft className="mr-2" size={14} />
            Prev
          </button>

          <div className="hidden border-x-2 border-black sm:grid sm:grid-cols-7">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setCurrent(index)}
                  className={`h-8 min-w-16 border-r border-black px-3 text-[10px] uppercase last:border-r-0 ${
                  index === current ? "bg-black text-white" : "bg-white"
                }`}
                aria-label={`Go to ${item.label}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-8 items-center justify-end px-4 text-right text-[10px] uppercase transition hover:bg-black hover:text-white sm:px-6"
          >
            Next
            <ArrowRight className="ml-2" size={14} />
          </button>

          <div className="col-span-3 grid grid-cols-7 border-t-2 border-black sm:hidden">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-7 border-r border-black text-[10px] uppercase last:border-r-0 ${
                  index === current ? "bg-black text-white" : "bg-white"
                }`}
                aria-label={`Go to ${item.label}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
