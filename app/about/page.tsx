"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* YOUR LOGO */}
        <img
          src="/images/noiszer-n.png" // <-- replace with your actual file name
          alt="Noiszer Logo"
          className="w-50 md:w-44 mb-10 opacity-80 border-b"
        />

        {/* TITLE */}
        <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
          About
        </p>

        <h1 className="text-4xl md:text-6xl leading-tight mb-8">
          Noiszer is a space for sound, discovery, and atmosphere.
        </h1>

        {/* INTRO */}
        <p className="text-white/80 text-lg leading-8 max-w-3xl mb-12">
          Noiszer is an independent online radio space built around a passion for noise and discovery.
          From punk to indie, new wave to hardcore, ambient to
          leftfield electronic, the goal is simple: play music with identity,
          mood, and soul.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 text-left w-full">
          <div className="border border-white/20 p-6">
            <h2 className="text-xl mb-4">What it is</h2>
            <p className="text-white/70 leading-7">
              A curated radio platform focused on atmosphere, taste, and
              discovery. Not background noise. Just music that means something.
            </p>
          </div>

          <div className="border border-white/20 p-6">
            <h2 className="text-xl mb-4">What you’ll hear</h2>
            <p className="text-white/70 leading-7">
              Alternative, punk, indie, hardcore, post-punk, new wave,
              electronic, and late-night sounds that deserve more time in the
              air.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 pt-10 text-left w-full">
          <h2 className="text-2xl md:text-3xl mb-5">Why Noiszer exists</h2>
          <p className="text-white/75 leading-8 max-w-3xl mb-6">
            Noiszer is about creating a world around music — something immersive,
            personal, and alive.
          </p>
          <p className="text-white/60 leading-8 max-w-3xl">
            It’s for people who still want to discover music with intention.
          </p>
        </div>

      </div>
    </main>
  );
}