"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const picks = [
  {
    title: "Velvet Haus",
    artist: "spud bud",
    image: "/images/velvethaus.png",
    note: "Minimal house, smoked-out loops, late room pressure.",
  },
  {
    title: "Dead Frequency",
    artist: "Noiszer Radio",
    image: "/images/deadfrequency2.jpg",
    note: "Hardcore, punk, noise, speed, and static.",
  },
  {
    title: "Groove Therapy",
    artist: "Noiszer Selects",
    image: "/images/groovetherapy.jpg",
    note: "Funk, disco, soul, and clean rhythm medicine.",
  },
  {
    title: "Sunday Fade",
    artist: "Noiszer Radio",
    image: "/images/sundayfade4.jpg",
    note: "Oldies, slow jams, worn edges, warm endings.",
  },
  {
    title: "Ctrl+Alt+Delete",
    artist: "Noiszer Experiments",
    image: "/images/ctrlaltdelete.jpg",
    note: "Leftfield electronics, broken systems, strange signals.",
  },
  {
    title: "After Hours",
    artist: "Late Block",
    image: "/images/afterhours.png",
    note: "Rap, trap, underground cuts, post-midnight energy.",
  },
];

export default function AlbumPicks() {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;

  const visiblePicks = useMemo(() => {
    return picks
      .slice(index, index + visibleCount)
      .concat(picks.slice(0, Math.max(0, index + visibleCount - picks.length)));
  }, [index]);

  const goBack = () =>
    setIndex((current) => (current - 1 + picks.length) % picks.length);

  const goNext = () => setIndex((current) => (current + 1) % picks.length);

  return (
    <section id="archive" className="w-full border-b-2 border-black bg-[#f7f7f4] text-black">
      <div className="mx-auto max-w-[1500px] border-black md:border-t-2">
        <div className="grid gap-6 border-b-2 border-black p-4 sm:p-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[10px] font-black uppercase text-black/50">Archive</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black uppercase leading-[0.88] sm:text-5xl lg:text-6xl">
              Recent listening
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/65">
              Selected shows and visual records from the station.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 border-2 border-black bg-white md:w-28">
            <button
              type="button"
              onClick={goBack}
              className="flex h-11 items-center justify-center border-r-2 border-black transition hover:bg-black hover:text-[#e7ff00]"
              aria-label="Previous archive picks"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="flex h-11 items-center justify-center transition hover:bg-black hover:text-[#e7ff00]"
              aria-label="Next archive picks"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid bg-white md:grid-cols-2 xl:grid-cols-4">
          {visiblePicks.map((pick, pickIndex) => (
            <article
              key={pick.title}
              className="group border-b-2 border-black bg-white md:border-r-2 md:[&:nth-child(even)]:border-r-0 xl:border-b-0 xl:[&:nth-child(even)]:border-r-2 xl:last:border-r-0"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-2 border-black bg-black">
                <img
                  src={pick.image}
                  alt={pick.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="grid min-h-44 content-between gap-6 p-4 sm:p-5">
                <div>
                  <p className="text-[9px] font-black uppercase text-black/45">
                    Pick {String(pickIndex + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-[10px] font-black uppercase text-black/50">
                    {pick.artist}
                  </p>
                  <h3 className="mt-1 break-words text-2xl font-black uppercase leading-none">
                    {pick.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-black/65">
                  {pick.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
