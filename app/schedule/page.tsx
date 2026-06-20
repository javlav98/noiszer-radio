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
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <section className="border-b border-[var(--rule)] px-5 py-8 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Weekly grid</p>
              <h1 className="mt-2 text-5xl font-normal leading-none sm:text-6xl">
                Schedule
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--muted)] sm:text-right">
              Rotating broadcasts by day, time, host, and sound.
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--rule)] px-5 py-3 sm:px-8 lg:px-12">
          <div className="no-scrollbar flex overflow-x-auto">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`h-10 shrink-0 border-b px-4 text-sm transition ${
                  selectedDay === day
                    ? "border-black text-black"
                    : "border-transparent text-[var(--muted)] hover:text-black"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 lg:px-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-normal">{selectedDay}</h2>
            <p className="text-sm text-[var(--muted)]">
              {selectedShows.length} {selectedShows.length === 1 ? "show" : "shows"}
            </p>
          </div>

          <div className="border-t border-[var(--rule)]">
            {selectedShows.map((show, index) => (
              <article
                key={`${show.time}-${show.title}`}
                className="grid border-b border-[var(--rule)] py-5 md:grid-cols-[8rem_1fr_12rem] md:gap-6"
              >
                <div className="mb-3 flex items-center justify-between md:mb-0 md:block">
                  <p className="text-sm text-[var(--muted)]">0{index + 1}</p>
                  <p className="text-base font-medium md:mt-2">{show.time}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-normal leading-tight sm:text-3xl">
                    {show.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {show.genre}
                  </p>
                </div>

                <div className="mt-3 md:mt-0 md:text-right">
                  <p className="text-sm text-[var(--muted)]">Hosted by</p>
                  <p className="mt-1 text-sm font-medium">{show.host}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
