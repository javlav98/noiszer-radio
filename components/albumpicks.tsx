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

  const featured = visiblePicks[0];
  const sidePicks = visiblePicks.slice(1);

  const goBack = () =>
    setIndex((current) => (current - 1 + picks.length) % picks.length);

  const goNext = () => setIndex((current) => (current + 1) % picks.length);

  return (
    <section id="archive" className="w-full border-b-2 border-black bg-[#f3f1ea] text-black">
      <div className="mx-auto grid max-w-[1500px] border-black lg:grid-cols-[minmax(18rem,26rem)_1fr] lg:border-t-2">
        <div className="flex flex-col justify-between border-b-2 border-black p-4 sm:p-6 lg:border-b-0 lg:border-r-2">
          <div>
            <p className="text-[10px] uppercase text-black/50">Archive</p>
            <h2 className="mt-3 text-4xl font-semibold uppercase leading-none sm:text-5xl">
              Recent listening
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-black/65">
              Selected shows and visual records from the station.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 border border-black bg-white">
            <button
              type="button"
              onClick={goBack}
              className="flex h-11 items-center justify-center border-r border-black transition hover:bg-black hover:text-white"
              aria-label="Previous archive picks"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="flex h-11 items-center justify-center transition hover:bg-black hover:text-white"
              aria-label="Next archive picks"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid min-h-[640px] lg:grid-cols-[1.35fr_.9fr]">
          <article className="group relative min-h-[440px] overflow-hidden border-b-2 border-black bg-black lg:border-b-0 lg:border-r-2">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.9),rgba(0,0,0,.08)_58%)]" />

            <div className="absolute left-0 top-0 border-b-2 border-r-2 border-black bg-white px-3 py-2 text-[10px] uppercase text-black">
              Featured
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t-2 border-black bg-white p-4 sm:p-6">
              <p className="text-[10px] uppercase text-black/50">{featured.artist}</p>
              <h3 className="mt-1 text-4xl font-semibold uppercase leading-none sm:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/70">
                {featured.note}
              </p>
            </div>
          </article>

          <div className="grid">
            {sidePicks.map((pick, pickIndex) => (
              <article
                key={pick.title}
                className="group grid grid-cols-[8rem_1fr] border-b-2 border-black bg-white last:border-b-0 sm:grid-cols-[11rem_1fr] lg:grid-cols-1 lg:grid-rows-[1fr_auto]"
              >
                <div className="overflow-hidden border-r-2 border-black bg-black lg:border-b-2 lg:border-r-0">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-between p-3">
                  <p className="text-[9px] uppercase text-black/45">
                    Pick 0{pickIndex + 2}
                  </p>
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-semibold uppercase leading-none">
                      {pick.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-black/62">
                      {pick.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
