import Link from "next/link";
import Footer from "../../components/footer";

const supportRows = [
  ["Donate", "Help cover streaming, events, design, and station upkeep.", "Donate", "/donate"],
  ["Volunteer", "Support shows, visuals, writing, programming, or production.", "Get Involved", "mailto:hello@noiszer.com"],
  ["Submit", "Send mixes, show ideas, flyers, or visual material.", "Pitch a Show", "mailto:hello@noiszer.com"],
];

export default function SupportPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--ink)] text-white">
        <section className="border-b border-white/14 p-5 sm:p-8 lg:p-12">
          <p className="flex items-center gap-2 text-sm text-white/55">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Support the signal
          </p>
          <h1 className="mt-6 max-w-6xl text-[clamp(3rem,9vw,7rem)] font-normal leading-[0.95]">
            Keep Noiszer independent.
          </h1>
        </section>

        <section className="grid gap-4 p-5 sm:p-8">
          {supportRows.map(([label, text, action, href], index) => (
            <article
              key={label}
              className="grid border border-white/14 bg-[#151515] md:grid-cols-[5rem_1fr_16rem]"
            >
              <div className="hidden items-center justify-center border-b border-white/14 p-4 text-[11px] tracking-[0.18em] text-white/45 md:flex md:border-b-0 md:border-r">
                0{index + 1}
              </div>

              <div className="border-b border-white/14 p-5 sm:p-6 md:border-b-0 md:border-r">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{label}</p>
                <h2 className="mt-5 max-w-3xl text-2xl font-normal leading-tight sm:text-3xl">
                  {text}
                </h2>
              </div>

              <div className="flex items-center p-4 sm:p-6">
                <Link
                  href={href}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/24 px-4 text-center text-sm font-medium text-white transition hover:bg-white hover:text-black"
                >
                  {action}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
