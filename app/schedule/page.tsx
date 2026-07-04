import Footer from "../../components/footer";
import Image from "next/image";

type Show = {
  time: string;
  title: string;
  host: string;
  genre: string;
  image: string;
};

const noSignalShow = {
  time: "12:00 AM - 5:00 AM",
  title: "No Signal",
  host: "jvii",
  genre: "Ambient / Experimental",
  image: "/images/no_signal.png",
} satisfies Show;

const schedule = {
  Monday: [
    noSignalShow,
    {
      time: "7:00 PM",
      title: "Velvet Haus",
      host: "Spud Bud",
      genre: "House / Minimal / Leftfield",
      image: "/images/velvethaus.png",
    },
    {
      time: "9:00 PM",
      title: "Static Youth",
      host: "Javier",
      genre: "Post-punk / Indie",
      image: "/images/ctrlaltdelete.jpg",
    },
  ],
  Tuesday: [
    noSignalShow,
  ],
  Wednesday: [
    noSignalShow,
    {
      time: "7:00 PM",
      title: "Concrete Echo",
      host: "Luis",
      genre: "New Wave / Alternative",
      image: "/images/art1.PNG",
    },
    {
      time: "10:00 PM",
      title: "After Hours",
      host: "Mara",
      genre: "Rap / Trap / Downtempo",
      image: "/images/afterhours.png",
    },
  ],
  Thursday: [
    noSignalShow,
    {
      time: "8:00 PM",
      title: "Transmission",
      host: "Noiszer",
      genre: "Mixed Selections",
      image: "/images/deadfrequency.png",
    },
  ],
  Friday: [
    noSignalShow,
    {
      time: "6:00 PM",
      title: "Velvet Haus",
      host: "Spud Bud",
      genre: "House / Underground",
      image: "/images/velvethaus.png",
    },
    {
      time: "9:00 PM",
      title: "Night Service",
      host: "Rico",
      genre: "Techno / Club",
      image: "/images/deadfrequency2.jpg",
    },
  ],
  Saturday: [
    noSignalShow,
    {
      time: "5:00 PM",
      title: "Open Air",
      host: "Lena",
      genre: "Balearic / Indie Dance",
      image: "/images/groovetherapy.jpg",
    },
    {
      time: "8:00 PM",
      title: "Dead Frequency",
      host: "Ash",
      genre: "Hardcore / Punk",
      image: "/images/deadfrequency2.jpg",
    },
  ],
  Sunday: [
    noSignalShow,
    {
      time: "7:00 PM",
      title: "Sunday Fade",
      host: "Noiszer",
      genre: "Oldies / Soul / Wind-down",
      image: "/images/sundayfade4.jpg",
    },
  ],
} satisfies Record<string, Show[]>;

const days = Object.keys(schedule) as Array<keyof typeof schedule>;

export default function SchedulePage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--ink)] text-white">
        <section aria-label="Weekly broadcasts">
          <div>
            {days.map((day) => (
              <section
                key={day}
                className="grid border-b border-white/22 lg:grid-cols-[13rem_minmax(0,1fr)]"
              >
                <div className="flex items-end justify-between border-b border-white/22 px-5 py-5 sm:px-8 lg:block lg:border-b-0 lg:border-r lg:px-6 lg:py-6 xl:px-8">
                  <h2 className="text-2xl font-normal lg:text-3xl">{day}</h2>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 lg:mt-3">
                    {schedule[day].length}{" "}
                    {schedule[day].length === 1 ? "broadcast" : "broadcasts"}
                  </p>
                </div>

                <div className="divide-y divide-white/14">
                  {schedule[day].map((show, showIndex) => (
                    <article
                      key={`${show.time}-${show.title}`}
                      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] bg-[#101010] sm:grid-cols-[7rem_minmax(0,1fr)_10rem] lg:grid-cols-[8rem_minmax(0,1fr)_11rem]"
                    >
                      <div className="relative aspect-square overflow-hidden border-r border-white/14 bg-black">
                        <Image
                          src={show.image}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5">
                        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                          <span>{String(showIndex + 1).padStart(2, "0")}</span>
                          <span className="h-px w-4 bg-white/20" />
                          <span>{show.time}</span>
                        </div>
                        <h3 className="mt-2 truncate text-xl font-normal leading-tight sm:text-2xl">
                          {show.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/70">
                          Hosted by {show.host}
                        </p>
                      </div>

                      <div className="hidden flex-col justify-center border-l border-white/14 px-5 sm:flex">
                        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                          Frequency
                        </p>
                        <p className="mt-1.5 text-sm leading-5 text-white/60">
                          {show.genre}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
