import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden font-sans">
      {/* Background Aerial Airplane & Island Image from Internet */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://img.magnific.com/premium-photo/colorful-airplane-is-flying-ocean-sky-is-colored-with-rainbow_1086760-289050.jpg')",
        }}
      >
        {/* Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white mb-4 drop-shadow-md font-light">
          Ready To Start Your Journey?
        </h2>

        {/* Subtitle */}
        <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 max-w-xl font-light">
          Join thousands of travelers who have discovered the world with us
        </p>

        {/* CTA Button */}
        <Link
        href="/add-destination"
        className="bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-semibold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-200 flex items-center gap-3 shadow-2xl cursor-pointer">
          <span>BOOK YOUR TRIP TODAY</span>
          <ArrowRight className="w-4 h-4 text-slate-900 stroke-[2.5]" />
        </Link>
      </div>
    </section>
  );
}