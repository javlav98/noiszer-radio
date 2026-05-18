"use client";

import { useState } from "react";

const schedule = {
  Monday: [
    { time: "7:00 PM", title: "Velvet Haus", host: "spud bud", genre: "House / Minimal / Leftfield" },
    { time: "9:00 PM", title: "Static Youth", host: "Javier", genre: "Post-punk / Indie" },
  ],
  Tuesday: [
    { time: "8:00 PM", title: "No Signal", host: "Nina", genre: "Ambient / Experimental" },
  ],
  Wednesday: [
    { time: "7:00 PM", title: "Concrete Echo", host: "Luis", genre: "New Wave / Alternative" },
    { time: "10:00 PM", title: "After Hours", host: "Mara", genre: "Rap / Trap / Downtempo" },
  ],
  Thursday: [
    { time: "8:00 PM", title: "Transmission", host: "Noiszer", genre: "Mixed Selections" },
  ],
  Friday: [
    { time: "6:00 PM", title: "Velvet Haus", host: "spud bud", genre: "House / Underground" },
    { time: "9:00 PM", title: "Night Service", host: "Rico", genre: "Techno / Club" },
  ],
  Saturday: [
    { time: "5:00 PM", title: "Open Air", host: "Lena", genre: "Balearic / Indie Dance" },
    { time: "8:00 PM", title: "Dead Frequency", host: "Ash", genre: "Hardcore / Punk" },
  ],
  Sunday: [
    { time: "7:00 PM", title: "Sunday Fade", host: "Noiszer", genre: "Oldies / Soul / Wind-down" },
  ],
};

const days = Object.keys(schedule);

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const selectedShows = schedule[selectedDay as keyof typeof schedule];

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-black">
      <section className="grid border-b-2 border-black lg:grid-cols-[minmax(18rem,28rem)_minmax(0,1fr)]">
        <div className="border-b-2 border-black p-4 sm:p-6 lg:border-b-0 lg:border-r-2 lg:p-8">
          <p className="text-[10px] font-black uppercase text-black/55">Weekly Grid</p>
          <h1 className="mt-3 text-[clamp(3rem,7vw,5.25rem)] font-black uppercase leading-[0.86]">
            Schedule
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-black/65">
            Rotating broadcasts across the week. Times are placeholders for the
            station grid and can be swapped as the lineup becomes real.
          </p>
        </div>

        <div className="grid bg-white sm:grid-cols-2 lg:grid-cols-7">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`h-16 border-b-2 border-black px-3 text-left text-[10px] font-black uppercase transition sm:border-r-2 lg:border-b-0 ${
                selectedDay === day
                  ? "bg-black text-[#e7ff00]"
                  : "bg-white text-black hover:bg-black hover:text-[#e7ff00]"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white">
        {selectedShows.map((show, index) => (
          <article
            key={`${show.time}-${show.title}`}
            className="grid border-b-2 border-black md:grid-cols-[10rem_1fr_16rem]"
          >
            <div className="border-b-2 border-black bg-black p-4 text-white md:border-b-0 md:border-r-2">
              <p className="text-[10px] font-black uppercase text-white/50">Slot 0{index + 1}</p>
              <p className="mt-6 text-2xl font-black uppercase text-[#e7ff00]">{show.time}</p>
            </div>

            <div className="border-b-2 border-black p-4 sm:p-6 md:border-b-0 md:border-r-2">
              <h2 className="text-4xl font-black uppercase leading-none">
                {show.title}
              </h2>
              <p className="mt-3 text-xs font-black uppercase text-black/55">
                {show.genre}
              </p>
            </div>

            <div className="flex items-end p-4 sm:p-6">
              <p className="text-sm uppercase text-black/65">Hosted by {show.host}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
