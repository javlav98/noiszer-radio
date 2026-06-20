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
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <section className="border-b border-[var(--rule)] p-5 sm:p-8 lg:p-12">
          <p className="text-sm text-[var(--muted)]">Station archive</p>
          <h1 className="mt-6 max-w-6xl text-[clamp(3rem,9vw,7rem)] font-normal leading-[0.95]">
            Past shows, visual sets, and records worth returning to.
          </h1>
        </section>

        <section className="grid gap-4 p-5 sm:p-8 lg:grid-cols-4">
          {archiveItems.map((item) => (
            <article key={item.title} className="bg-[var(--surface)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border border-t-0 border-[var(--rule)] p-5">
                <p className="text-sm text-[var(--muted)]">{item.type}</p>
                <h2 className="mt-4 text-2xl font-normal leading-tight">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
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
