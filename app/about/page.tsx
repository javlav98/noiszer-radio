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
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <section className="border-b border-[var(--rule)]">
          <div className="grid md:min-h-[56vh] md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,.8fr)]">
            <div className="flex flex-col justify-end border-b border-[var(--rule)] p-5 sm:p-8 md:justify-center md:border-b-0 md:border-r lg:p-12">
              <p className="text-sm text-[var(--muted)]">About Noiszer</p>
              <h1 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.95]">
                A space for sound and discovery.
              </h1>
            </div>

            <div className="grid bg-[var(--surface)] md:grid-rows-[1fr_auto]">
              <div className="p-5 sm:p-8 lg:p-12">
                <p className="max-w-md text-base leading-7 text-[var(--muted)] lg:text-lg">
                  Noiszer is an independent web radio platform for rotating shows,
                  visual sets, and records outside the usual lanes.
                </p>
              </div>

              <div className="border-t border-[var(--rule)]">
                {details.map(([label, text]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5.5rem_1fr] border-b border-[var(--rule)] last:border-b-0"
                  >
                    <p className="border-r border-[var(--rule)] p-4 text-sm text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="p-4 text-sm font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 border-b border-[var(--rule)] p-5 sm:p-8 md:grid-cols-4">
          {values.map(([label, text]) => (
            <article
              key={label}
              className="border border-[var(--rule)] bg-[var(--surface)] p-5 sm:p-6 md:min-h-64"
            >
              <p className="text-sm text-[var(--muted)]">{label}</p>
              <p className="mt-8 max-w-xl text-xl leading-tight lg:text-2xl">
                {text}
              </p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
