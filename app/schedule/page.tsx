"use client";

import Footer from "../../components/footer";
import { useState } from "react";

const schedule = {
  Monday: [
    { time: "7:00 PM", title: "Velvet Haus", host: "Spud Bud", genre: "House / Minimal / Leftfield" },
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
    { time: "6:00 PM", title: "Velvet Haus", host: "Spud Bud", genre: "House / Underground" },
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
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="grid border-b-2 border-black lg:grid-cols-[minmax(20rem,34rem)_minmax(0,1fr)]">
          <div className="min-w-0 border-b-2 border-black px-4 py-5 sm:p-6 lg:border-b-0 lg:border-r-2 lg:p-8">
            <p className="text-[10px] font-black uppercase text-black/55">Weekly Grid</p>
            <h1 className="mt-2 text-5xl font-black uppercase leading-[0.86] sm:text-6xl lg:text-[4.75rem]">
              Schedule
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/65 lg:mt-6">
              Rotating broadcasts across the week, organized for quick scanning
              by day, time, host, and sound.
            </p>
          </div>

          <div className="border-b-2 border-black bg-white p-3 lg:hidden">
            <select
              value={selectedDay}
              onChange={(event) => setSelectedDay(event.target.value)}
              className="h-12 w-full appearance-none border-2 border-black bg-white px-3 text-sm font-black uppercase text-black"
              aria-label="Select schedule day"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden bg-white lg:grid lg:grid-cols-7">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`h-16 border-r-2 border-b-2 border-black px-3 text-left text-[10px] font-black uppercase transition last:border-r-2 ${
                  selectedDay === day
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
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
              className="grid border-b-2 border-black bg-white md:grid-cols-[10rem_1fr_16rem] md:border-2 md:border-t-0 first:md:border-t-2"
            >
              <div className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-2 text-white md:block md:border-b-0 md:border-r-2 md:p-4">
                <p className="text-[9px] font-black uppercase text-white/50">Slot 0{index + 1}</p>
                <p className="text-lg font-black uppercase text-white md:mt-6 md:text-2xl">{show.time}</p>
              </div>

              <div className="border-b-2 border-black px-4 py-3 md:border-b-0 md:border-r-2 md:p-6">
                <h2 className="text-2xl font-black uppercase leading-none md:text-4xl">
                  {show.title}
                </h2>
                <p className="mt-2 text-[10px] font-black uppercase leading-tight text-black/55 md:mt-3 md:text-xs">
                  {show.genre}
                </p>
              </div>

              <div className="flex items-center px-4 py-3 md:items-end md:p-6">
                <p className="text-xs uppercase text-black/65 md:text-sm">Hosted by {show.host}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
