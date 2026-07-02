import Footer from "../../components/footer";

const values = [
  ["Format", "Live shows, guest mixes, and visual-first listening."],
  ["Tone", "Clear layout, raw signal, no filler."],
  ["Community", "Built for hosts, listeners, and local scenes."],
  ["Sound", "House, punk, soul, rap, oldies, noise, and leftfield records."],
];

const details = [
  ["Base", "Coachella Valley"],
  ["Focus", "Independent shows"],
  ["Mode", "Live and rotating"],
];

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--ink)] text-white">
        <section className="border-b border-white/14 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="flex items-center gap-2 text-sm text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            About Noiszer
          </p>
          <h1 className="mt-8 max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[0.98]">
            Independent radio for curious ears.
          </h1>
          <div className="mt-10 flex items-center">
            <span className="h-px w-16 bg-[var(--accent)]" />
            <p className="ml-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Noiszer is an independent web radio platform for rotating shows,
              visual sets, and records outside the usual lanes.
            </p>
          </div>
        </section>

        <section className="grid border-b border-white/14 sm:grid-cols-3">
            {details.map(([label, text]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-white/14 px-5 py-5 text-sm last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0"
              >
                <p className="text-white/40">{label}</p>
                <p className="text-white/72">{text}</p>
              </div>
            ))}
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <h2 className="text-2xl font-normal">What we care about</h2>
          <div className="mt-8 grid border-l border-t border-white/14 sm:grid-cols-2">
            {values.map(([label, text]) => (
              <article
                key={label}
                className="border-b border-r border-white/14 p-5 sm:p-7"
              >
                <p className="text-sm text-white/40">{label}</p>
                <p className="mt-4 max-w-md text-lg leading-7 text-white/72 sm:text-xl">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
