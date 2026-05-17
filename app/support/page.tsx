import Link from "next/link";

const supportRows = [
  ["Donate", "Cover streaming, design, events, and station upkeep.", "Donate with Stripe", "/donate"],
  ["Volunteer", "Help with shows, visuals, writing, programming, or production.", "Email Noiszer", "mailto:hello@noiszer.com"],
  ["Submit", "Send mixes, show ideas, flyers, or archive material.", "Pitch a Show", "mailto:hello@noiszer.com"],
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ea] text-black">
      <section className="border-b-2 border-black p-4 sm:p-6 lg:p-8">
        <p className="text-[10px] uppercase text-black/55">Support the Signal</p>
        <h1 className="mt-4 max-w-6xl text-[clamp(3rem,9vw,6.5rem)] font-semibold uppercase leading-[0.9]">
          Keep Noiszer independent.
        </h1>
      </section>

      <section className="bg-white">
        {supportRows.map(([label, text, action, href], index) => (
          <article
            key={label}
            className="grid border-b-2 border-black md:grid-cols-[5rem_1fr_16rem]"
          >
            <div className="flex items-center justify-center border-b-2 border-black bg-black p-4 text-xs text-white md:border-b-0 md:border-r-2">
              0{index + 1}
            </div>

            <div className="border-b-2 border-black p-4 sm:p-6 md:border-b-0 md:border-r-2">
              <p className="text-[10px] uppercase text-black/45">{label}</p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold uppercase leading-tight">
                {text}
              </h2>
            </div>

            <div className="flex items-center p-4 sm:p-6">
              <Link
                href={href}
                className="inline-flex h-11 w-full items-center justify-center border-2 border-black bg-white px-4 text-center text-[10px] font-semibold uppercase transition hover:bg-black hover:text-white"
              >
                {action}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
