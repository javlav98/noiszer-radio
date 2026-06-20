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
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <section className="border-b border-[var(--rule)] p-5 sm:p-8 lg:p-12">
          <p className="text-sm text-[var(--muted)]">Support the signal</p>
          <h1 className="mt-6 max-w-6xl text-[clamp(3rem,9vw,7rem)] font-normal leading-[0.95]">
            Keep Noiszer independent.
          </h1>
        </section>

        <section className="grid gap-4 p-5 sm:p-8">
          {supportRows.map(([label, text, action, href], index) => (
            <article
              key={label}
              className="grid border border-[var(--rule)] bg-[var(--surface)] md:grid-cols-[5rem_1fr_16rem]"
            >
              <div className="hidden items-center justify-center border-b border-[var(--rule)] p-4 text-sm text-[var(--muted)] md:flex md:border-b-0 md:border-r">
                0{index + 1}
              </div>

              <div className="border-b border-[var(--rule)] p-5 sm:p-6 md:border-b-0 md:border-r">
                <p className="text-sm text-[var(--muted)]">{label}</p>
                <h2 className="mt-5 max-w-3xl text-2xl font-normal leading-tight sm:text-3xl">
                  {text}
                </h2>
              </div>

              <div className="flex items-center p-4 sm:p-6">
                <Link
                  href={href}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--ink)] px-4 text-center text-sm font-medium text-white transition hover:bg-black/80"
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
