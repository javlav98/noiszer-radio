"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-10 pt-28 pb-28">
      <div className="max-w-[900px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            About
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight">
            A space for sound and discovery.
          </h1>

          <p className="max-w-xl mx-auto text-white/60 text-sm md:text-base leading-relaxed">
            An independent radio platform built around freeform music, creative
            expression, and the culture that keeps sound moving forward.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {/* MISSION */}
          <section className="rounded-[1.75rem] border border-white/15 bg-white/[0.03] p-6 md:p-7 hover:bg-white/[0.05] transition">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Mission
            </p>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Noiszer is an independent, community-driven radio platform built
              around sound, discovery, and a passion for noise. It exists as a
              space for music to move freely—bringing together everything from
              punk and indie to house, new wave, and beyond.
            </p>
          </section>

          {/* CULTURE */}
          <section className="rounded-[1.75rem] border border-white/15 bg-white/[0.03] p-6 md:p-7 hover:bg-white/[0.05] transition">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Culture
            </p>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              More than a stream, Noiszer is a creative outlet—featuring curated
              shows, evolving visuals, and a growing network of voices. The goal
              is to build something raw, consistent, and true to the culture
              that inspires it.
            </p>
          </section>
        </div>

        {/* FOOTER LINE */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-white/40 text-sm tracking-tight">
            Built independently. Shaped by sound.
          </p>
        </div>
      </div>
    </main>
  );
}