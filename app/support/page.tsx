"use client";

import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-28">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            Support
          </p>

          <h1 className="text-3xl md:text-5xl tracking-tight mb-5">
            Help Keep Noiszer Alive
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base leading-7 text-white/60">
            Noiszer is an independent internet radio station built around sound,
            discovery, and a passion for noise. Support from listeners helps keep
            the station growing, broadcasting, and evolving.
          </p>
        </div>

        {/* SUPPORT + VOLUNTEER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DONATE */}
          <section className="border border-white/15 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Donate
            </p>

            <h2 className="text-2xl md:text-3xl tracking-tight mb-4">
              Support the station
            </h2>

            <p className="text-white/65 leading-7 text-sm md:text-base mb-8">
              Contributions help cover the cost of streaming, site upkeep,
              creative development, and future growth. If Noiszer means something
              to you, supporting it helps keep the signal going.
            </p>

            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black transition duration-200"
            >
              Donate with Stripe
            </Link>
          </section>

          {/* VOLUNTEER */}
          <section className="border border-white/15 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Volunteer
            </p>

            <h2 className="text-2xl md:text-3xl tracking-tight mb-4">
              Get involved
            </h2>

            <p className="text-white/65 leading-7 text-sm md:text-base mb-8">
              Interested in contributing to Noiszer? We’re open to people who want
              to help shape the station through programming, visuals, writing,
              design, technical support, or creative ideas. If you want to be part
              of what this becomes, reach out.
            </p>

            <a
              href="mailto:hello@noiszer.com"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black transition duration-200"
            >
              Volunteer with Noiszer
            </a>
          </section>
        </div>

        {/* LOWER SECTION */}
        <div className="mt-16 border-t border-white/10 pt-10 text-center">
          <p className="max-w-2xl mx-auto text-white/50 text-sm leading-7">
            Every contribution—whether financial or creative—helps build a more
            independent and lasting space for music, discovery, and community.
          </p>
        </div>
      </div>
    </main>
  );
}