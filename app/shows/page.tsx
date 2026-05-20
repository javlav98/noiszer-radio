import Footer from "../../components/footer";

const shows = [
  {
    title: "Velvet Haus",
    artist: "Spud Bud",
    genres: "Dark House / Minimal / Leftfield",
    image: "/images/velvethaus.png",
    description:
      "Late-night house, repetitive rhythms, and underground cuts built for after-dark listening.",
  },
  {
    title: "Dead Frequency",
    artist: "Noiszer Radio",
    genres: "Hardcore Punk / Noise / Underground",
    image: "/images/deadfrequency2.jpg",
    description:
      "Fast, loud, and raw. Punk, noise, and aggressive sounds with no soft edges.",
  },
  {
    title: "Sunday Fade",
    artist: "Noiszer Radio",
    genres: "Oldies / Soul / Slow Jams",
    image: "/images/sundayfade4.jpg",
    description:
      "Warm records, soul cuts, and faded oldies for the end of the week.",
  },
  {
    title: "Groove Therapy",
    artist: "Noiszer Radio",
    genres: "Funk / Disco / Soul",
    image: "/images/groovetherapy.jpg",
    description: "A feel-good blend of funk, disco, and soulful grooves.",
  },
  {
    title: "After Hours",
    artist: "Noiszer Radio",
    genres: "Rap / Trap / Underground",
    image: "/images/afterhours.png",
    description:
      "Gritty rap, trap, and late-night records with underground energy.",
  },
  {
    title: "Ctrl+Alt+Delete",
    artist: "Noiszer Radio",
    genres: "Electronica / Leftfield / Experimental",
    image: "/images/ctrlaltdelete.jpg",
    description:
      "Alternative electronic sounds, ambient textures, noise, and experimental selections.",
  },
];

export default function ShowsPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-2 border-black p-4 sm:p-6 lg:p-8">
          <p className="text-[10px] font-black uppercase text-black/50">
            Noiszer Radio
          </p>
          <h1 className="mt-3 max-w-5xl text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[0.84]">
            Shows
          </h1>
        </section>

        <section className="grid bg-white md:grid-cols-2 xl:grid-cols-3">
          {shows.map((show) => (
            <article
              key={show.title}
              className="group border-b-2 border-black md:border-r-2 md:[&:nth-child(even)]:border-r-0 xl:[&:nth-child(even)]:border-r-2 xl:[&:nth-child(3n)]:border-r-0"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-2 border-black bg-black">
                <img
                  src={show.image}
                  alt={show.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="grid min-h-56 content-between gap-8 p-4 sm:p-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-black/50">
                    {show.artist}
                  </p>
                  <h2 className="mt-2 break-words text-4xl font-black uppercase leading-none">
                    {show.title}
                  </h2>
                  <p className="mt-3 text-xs font-black uppercase text-black/55">
                    {show.genres}
                  </p>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-black/68">
                  {show.description}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
