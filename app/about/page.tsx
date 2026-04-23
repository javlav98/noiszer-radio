"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP */}
        <div className="mb-20 flex flex-col items-center text-center">
          <img
            src="/images/noiszer-n.png"
            alt="Noiszer Logo"
            className="w-28 md:w-36 mb-8 opacity-80"
          />

          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            About
          </p>

          <div className="w-16 h-px bg-white/20 mb-6" />

          <h1 className="text-3xl md:text-5xl tracking-tight max-w-3xl leading-tight">
            A space for sound, discovery, and a passion for noise.
          </h1>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          
          {/* LEFT LABEL */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Mission
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-9 space-y-8">

            {/* BLOCK 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-white/80 text-lg leading-8">
                Noiszer is an independent, community-driven internet radio station
                built around sound, discovery, and a passion for noise. Created as
                a space for real music to exist freely, Noiszer brings together
                everything from punk and indie to house, new wave, and beyond—without
                filters or expectations. What started as a simple idea to share music
                that feels honest has grown into a platform focused on exploration,
                expression, and connection through sound.
              </p>
            </div>

            {/* BLOCK 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-white/80 text-lg leading-8">
                Noiszer is more than just a stream. It’s a creative outlet—featuring
                curated shows, evolving visuals, and a growing network of voices
                shaping what the station becomes. Rooted in independence, the goal
                is to build something raw, consistent, and true to the culture that
                inspires it.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}