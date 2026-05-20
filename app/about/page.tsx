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
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-2 border-black">
          <div className="grid md:min-h-[56vh] md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,.75fr)]">
            <div className="flex flex-col justify-end border-b-2 border-black p-4 sm:p-6 md:justify-center md:border-b-0 md:border-r-2 lg:p-8">
              <p className="text-[10px] font-black uppercase text-black/55">About Noiszer</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,5.75rem)] font-black uppercase leading-[0.86]">
                A space for sound and discovery.
              </h1>
            </div>

            <div className="grid bg-white md:grid-rows-[1fr_auto]">
              <div className="p-4 sm:p-6 lg:p-8">
                <p className="max-w-md text-base leading-relaxed text-black/70 md:text-sm lg:text-base">
                  Noiszer is an independent web radio platform for rotating shows,
                  visual sets, and records outside the usual lanes.
                </p>
              </div>

              <div className="border-t-2 border-black">
                {details.map(([label, text]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5.5rem_1fr] border-b-2 border-black last:border-b-0"
                  >
                    <p className="border-r-2 border-black p-3 text-[9px] font-black uppercase text-black/45 sm:p-4">
                      {label}
                    </p>
                    <p className="p-3 text-[10px] font-black uppercase sm:p-4">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid border-b-2 border-black bg-white md:grid-cols-4">
          {values.map(([label, text]) => (
            <article
              key={label}
              className="border-b-2 border-black p-4 last:border-b-0 sm:p-6 md:min-h-64 md:border-b-0 md:border-r-2 md:last:border-r-0"
            >
              <p className="text-[10px] font-black uppercase text-black/45">{label}</p>
              <p className="mt-8 max-w-xl text-xl font-black uppercase leading-tight lg:text-2xl">
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
