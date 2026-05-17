import Link from "next/link";
import AlbumPicks from "../components/albumpicks";
import HeroCarousel from "../components/carousel";

const liveRows = [
  ["On Air", "Velvet Haus", "spud bud", "Dark House / Minimal"],
  ["Next", "Dead Frequency", "Noiszer Radio", "Hardcore / Noise"],
  ["Later", "Sunday Fade", "Noiszer Radio", "Oldies / Soul"],
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f3f1ea] text-black">
      <HeroCarousel />

      <section className="border-b-2 border-black bg-[#f3f1ea]">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_22rem] lg:px-8 lg:py-14">
          <article>
            <p className="text-[10px] uppercase text-black/50">
              Noiszer Radio / Editorial Note
            </p>
            <h2 className="mt-4 max-w-5xl text-4xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">
              Independent transmissions, archived like a printed music journal.
            </h2>
          </article>

          <aside className="border-t-2 border-black pt-4 lg:border-l-2 lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-sm leading-relaxed text-black/70">
              A stripped-back station page for shows, schedules, visual essays,
              and the sounds moving through Noiszer. Clean, direct, and built
              around the program.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex border border-black px-4 py-3 text-[10px] font-semibold uppercase transition hover:bg-black hover:text-white"
            >
              Read the station note
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white text-black">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[18rem_1fr]">
          <div className="border-b-2 border-black p-4 sm:p-6 lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] uppercase text-black/50">Program</p>
            <h2 className="mt-2 text-3xl font-semibold uppercase leading-none">
              Today
            </h2>
          </div>

          <div className="grid lg:grid-cols-3">
            {liveRows.map(([slot, title, host, genre]) => (
              <article
                key={slot}
                className="border-b-2 border-black p-4 last:border-b-0 sm:p-6 lg:border-b-0 lg:border-r-2 lg:last:border-r-0"
              >
                <p className="text-[10px] uppercase text-black/45">{slot}</p>
                <h3 className="mt-8 text-2xl font-semibold uppercase leading-tight">
                  {title}
                </h3>
                <p className="mt-3 text-[10px] uppercase text-black/50">
                  Hosted by {host}
                </p>
                <p className="mt-1 text-xs uppercase">{genre}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AlbumPicks />
    </main>
  );
}
