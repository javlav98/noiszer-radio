"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/images/velvethaus.png",
    label: "Velvet Haus",
    genres: "Dark house / minimal / leftfield",
    description:
      "Low-lit house and stripped-back club records for late movement.",
  },
  {
    image: "/images/deadfrequency2.jpg",
    label: "Dead Frequency",
    genres: "Hardcore punk / noise / underground",
    description: "Fast, abrasive records with a raw signal and no polish.",
  },
  {
    image: "/images/groovetherapy.jpg",
    label: "Groove Therapy",
    genres: "Funk / disco / soul",
    description:
      "Warm rhythm records, dance-floor cuts, and steady soul pressure.",
  },
  {
    image: "/images/ctrlaltdelete.jpg",
    label: "Ctrl+Alt+Delete",
    genres: "Electronica / ambient / experimental",
    description:
      "Electronic fragments, ambient drift, noise, and leftfield systems.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const nextSlide = () => {
    setCurrent((value) => (value + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((value) => (value - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="shows"
      className="
        grid
        h-[calc(100svh-104px)]
        w-full
        grid-rows-[minmax(0,1fr)_auto]
        overflow-hidden
        border-b-2 border-black
        bg-white
        text-black
        lg:h-[calc(100svh-80px)]
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
      </figure>

      <div className="grid h-[112px] grid-rows-[minmax(0,1fr)_28px] border-t-2 border-black bg-white text-black sm:h-14 sm:grid-cols-[minmax(190px,0.85fr)_minmax(150px,0.65fr)_minmax(0,1fr)_88px] sm:grid-rows-1 lg:grid-cols-[minmax(220px,0.9fr)_minmax(180px,0.7fr)_minmax(0,1fr)_96px]">
        <div className="grid min-w-0 content-center border-b-2 border-black px-4 sm:border-b-0 sm:border-r-2 sm:px-5 lg:px-6">
          <p className="truncate text-[9px] font-black uppercase text-black/48 sm:text-[10px]">
            Slide {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
          <h2 className="truncate text-[1.45rem] font-black uppercase leading-none sm:text-xl lg:text-2xl">
            {slide.label}
          </h2>
          <p className="mt-1 truncate text-[9px] font-black uppercase leading-none text-black/58 sm:hidden">
            {slide.genres}
          </p>
          <p className="mt-1 line-clamp-1 text-[10px] leading-none text-black/72 sm:hidden">
            {slide.description}
          </p>
        </div>

        <div className="hidden min-w-0 content-center border-r-2 border-black px-3 sm:grid lg:px-5">
          <p className="text-[9px] font-black uppercase text-black/48 sm:text-[10px]">
            Genres
          </p>
          <p className="truncate text-[9px] font-black uppercase text-black/68 lg:text-[10px]">
            {slide.genres}
          </p>
        </div>

        <div className="hidden min-w-0 content-center border-r-2 border-black px-3 sm:grid lg:px-5">
          <p className="text-[9px] font-black uppercase text-black/48 sm:text-[10px]">
            Description
          </p>
          <p className="truncate text-[10px] leading-snug text-black/72 lg:text-[11px]">
            {slide.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-rows-1">
          <button
            type="button"
            onClick={previousSlide}
            className="flex items-center justify-center border-r-2 border-black transition hover:bg-black hover:text-white"
            aria-label="Previous show"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="flex items-center justify-center transition hover:bg-black hover:text-white"
            aria-label="Next show"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
