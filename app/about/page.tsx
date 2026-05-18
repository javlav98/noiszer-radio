const values = [
  ["Format", "Freeform shows, visual radio, and archive-first listening."],
  ["Tone", "Clean structure, raw texture, no fake gloss."],
  ["Community", "A small station built for hosts, listeners, and local energy."],
  ["Sound", "House, punk, soul, rap, oldies, noise, and whatever bends the room."],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-black">
      <section className="border-b-2 border-black">
        <div className="grid min-h-[62vh] lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="flex flex-col justify-end border-b-2 border-black p-4 sm:p-6 lg:border-b-0 lg:border-r-2 lg:p-8">
            <p className="text-[10px] font-black uppercase text-black/55">About Noiszer</p>
            <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7vw,5.25rem)] font-black uppercase leading-[0.86]">
              Built independently. Shaped by sound.
            </h1>
          </div>

          <div className="flex flex-col justify-between bg-white p-4 sm:p-6 lg:p-7">
            <p className="text-sm leading-relaxed text-black/70">
              Noiszer is an independent web radio platform for rotating shows,
              rough-cut visuals, and music that does not need permission to
              move. It borrows the urgency of pirate radio and the clarity of a
              printed program sheet.
            </p>
            <p className="mt-8 border-t-2 border-black pt-4 text-[10px] font-black uppercase text-black/55">
              HNL / Web / Archive / Live
            </p>
          </div>
        </div>
      </section>

      <section className="grid border-b-2 border-black bg-white md:grid-cols-2">
        {values.map(([label, text]) => (
          <article
            key={label}
            className="border-b-2 border-black p-4 last:border-b-0 sm:p-6 md:border-r-2 md:[&:nth-child(even)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <p className="text-[10px] font-black uppercase text-black/45">{label}</p>
            <p className="mt-8 max-w-xl text-2xl font-black uppercase leading-tight">
              {text}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
