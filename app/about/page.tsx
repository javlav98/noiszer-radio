import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--ink)] text-white">
        <section className="border-b border-white/22">
          <div className="relative min-h-[16rem] overflow-hidden bg-black sm:min-h-[22rem] lg:min-h-[30rem]">
            <Image
              src="/images/art1.PNG"
              alt="Noiszer broadcast artwork"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.16em] text-white/65">
              Noiszer Radio / Coachella Valley
            </p>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/22 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
              <p className="max-w-xl text-2xl leading-[1.25] tracking-[-0.025em] text-white/90 sm:text-3xl">
                Independent radio shaped by the people who make it.
              </p>
            </div>
            <div className="p-5 sm:p-8 lg:p-12">
              <p className="max-w-xl text-sm leading-6 text-white/70">
                Broadcasting from the Coachella Valley, Noiszer makes room for
                rotating shows, guest mixes, visual sets, and records that do
                not fit neatly into one lane.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/70">
                Independent hosts and selectors bring their own sound,
                references, and point of view to every transmission—from house,
                soul, and rap to punk, oldies, noise, and experimental music.
                The result is a shared signal for curious listeners and the
                scenes growing around them.
              </p>
            </div>
          </div>
        </section>

        <section className="grid sm:grid-cols-2">
          <Link
            href="/schedule"
            className="flex min-h-20 items-center justify-between border-b border-white/22 px-5 text-sm transition hover:bg-white hover:text-black sm:border-b-0 sm:border-r sm:px-8"
          >
            Browse the schedule <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="/support"
            className="flex min-h-20 items-center justify-between px-5 text-sm transition hover:bg-white hover:text-black sm:px-8"
          >
            Get involved <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
