"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-28">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
  
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            About
          </p>

          <h1 className="text-4xl md:text-5xl tracking-tight mb-6">
            A space for sound and discovery.
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base leading-7 text-white/60">
            An independent radio platform built around freeform music, creative
            expression, and the culture that keeps sound moving forward.
          </p>
        </div>

        {/* CONTENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD 1 */}
          <section className="border border-white/15 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Mission
            </p>

            <p className="text-white/70 leading-7 text-sm md:text-base">
              Noiszer is an independent, community-driven internet radio station
              built around sound, discovery, and a passion for noise. Created as
              a space for real music to exist freely, Noiszer brings together
              everything from punk and indie to house, new wave, and beyond—without
              filters or expectations. What started as a simple idea to share music
              that feels honest has grown into a platform focused on exploration,
              expression, and connection through sound.
            </p>
          </section>

          {/* CARD 2 */}
          <section className="border border-white/15 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Culture
            </p>

            <p className="text-white/70 leading-7 text-sm md:text-base">
              Noiszer is more than just a stream. It’s a creative outlet—featuring
              curated shows, evolving visuals, and a growing network of voices
              shaping what the station becomes. Rooted in independence, the goal
              is to build something raw, consistent, and true to the culture that
              inspires it.
            </p>
          </section>
        </div>

        {/* LOWER LINE */}
        <div className="mt-16 border-t border-white/10 pt-10 text-center">
          <p className="max-w-2xl mx-auto text-white/50 text-sm leading-7">
            Built independently. Shaped by sound. Open to whatever comes next.
          </p>
        </div>

      </div>
    </main>
  );
}