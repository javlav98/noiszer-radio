import Image from "next/image";
import Footer from "../../components/footer";

const archiveItems = [
  {
    title: "Velvet Haus",
    type: "Guest mix",
    detail: "House, minimal, and late-night selections from Spud Bud.",
    image: "/images/velvethaus.png",
  },
  {
    title: "Dead Frequency",
    type: "Visual set",
    detail: "Raw punk cuts, flyers, static, and live-room recordings.",
    image: "/images/deadfrequency2.jpg",
  },
  {
    title: "Groove Therapy",
    type: "Record notes",
    detail: "Soul, disco, and warm selections pulled from the shelf.",
    image: "/images/groovetherapy.jpg",
  },
  {
    title: "After Hours",
    type: "Show file",
    detail: "Downtempo rap, club edits, and end-of-night transmissions.",
    image: "/images/afterhours.png",
  },
];

export default function ArchivePage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--ink)] text-white">
        <section className="border-b border-white/14 p-5 sm:p-8 lg:p-12">
          <p className="flex items-center gap-2 text-sm text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Station archive
          </p>
          <h1 className="mt-6 max-w-6xl text-[clamp(3rem,9vw,7rem)] font-normal leading-[0.95]">
            Past shows, visual sets, and records worth returning to.
          </h1>
        </section>

        <section className="grid gap-4 p-5 sm:p-8 lg:grid-cols-4">
          {archiveItems.map((item, index) => (
            <article key={item.title} className="group border border-white/14 bg-[#151515]">
              <div className="flex h-11 items-center justify-between border-b border-white/14 px-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.type}</span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  Archive file / {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-normal leading-tight">
                  {item.title}
                </h2>
                <p className="mt-5 border-t border-white/14 pt-4 text-sm leading-6 text-white/55">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
