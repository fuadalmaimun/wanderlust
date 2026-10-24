"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react";

// Travel background images
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85",
];

export default function Banner() {
  const router = useRouter();

  const [location, setLocation] = useState("Address, City Or Zip");
  const [date, setDate] = useState("Anytime/3 Days");
  const [budget, setBudget] = useState("$0-$3000");
  const [people, setPeople] = useState("5-10");

  const [currentImage, setCurrentImage] = useState(0);

  // Move to the next image
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  // Automatically change image every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-1 flex-col justify-between overflow-hidden text-white">

      {/* Background Slideshow */}
      <div
        onDoubleClick={handleNextImage}
        className="absolute inset-0 z-0 cursor-pointer"
      >
        {images.map((image, index) => (
          <div
            key={image}
            aria-hidden="true"
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out ${
              currentImage === index
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">

        {/* Heading */}
        <h1 className="text-4xl font-light leading-[1.15] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
          Discover Your
          <br className="hidden sm:inline" />
          Next Adventure
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-slate-100 drop-shadow sm:text-base md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/destination")}
            className="flex items-center gap-2.5 rounded-md bg-[#00a8cc] px-7 py-3.5 text-sm font-medium text-white shadow-xl transition-all duration-200 hover:bg-[#008cae] hover:shadow-2xl active:scale-95 sm:text-base"
          >
            EXPLORE NOW
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/destination")}
            className="rounded-md border border-white/30 bg-white/20 px-7 py-3.5 text-sm font-medium text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:bg-white/30 active:scale-95 sm:text-base"
          >
            VIEW DESTINATION
          </button>
        </div>
      </div>

      {/* Search Bar UI */}
      <div className="relative z-10 w-full border-t border-white/20 bg-black/40 backdrop-blur-md">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x"
        >

          {/* Location */}
          <div className="group flex items-center gap-3 p-4 transition-colors hover:bg-white/10 sm:p-5">
            <MapPin className="h-5 w-5 shrink-0 text-[#00a8cc] transition-transform group-hover:scale-110" />

            <div className="flex w-full flex-col">
              <label className="text-sm font-semibold tracking-wide text-white">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 focus:text-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Date / Duration */}
          <div className="group flex items-center gap-3 p-4 transition-colors hover:bg-white/10 sm:p-5">
            <Calendar className="h-5 w-5 shrink-0 text-[#00a8cc] transition-transform group-hover:scale-110" />

            <div className="flex w-full flex-col">
              <label className="text-sm font-semibold tracking-wide text-white">
                Date/Duration
              </label>

              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 focus:text-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="group flex items-center gap-3 p-4 transition-colors hover:bg-white/10 sm:p-5">
            <DollarSign className="h-5 w-5 shrink-0 text-[#00a8cc] transition-transform group-hover:scale-110" />

            <div className="flex w-full flex-col">
              <label className="text-sm font-semibold tracking-wide text-white">
                Budget
              </label>

              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 focus:text-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* People */}
          <div className="group flex items-center gap-3 p-4 transition-colors hover:bg-white/10 sm:p-5">
            <Users className="h-5 w-5 shrink-0 text-[#00a8cc] transition-transform group-hover:scale-110" />

            <div className="flex w-full flex-col">
              <label className="text-sm font-semibold tracking-wide text-white">
                People
              </label>

              <input
                type="text"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 focus:text-white focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Inactive Search Button */}
          <button
            type="button"
            className="col-span-1 flex cursor-default items-center justify-center gap-2 bg-[#00a8cc] py-5 text-lg font-semibold text-white shadow-lg transition-colors sm:col-span-2 lg:col-span-1 lg:py-0"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
