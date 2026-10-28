import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import IDestination from "@/lib/destination";
import FeaturedCarousel from "./FeaturedCarousel";

const getFeatured = async (): Promise<IDestination[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations/`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // Backend not running — hide the section instead of crashing.
    return [];
  }
};

const Featured = async () => {
  const destinations = await getFeatured();

  if (destinations.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
              Featured Destinations
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destination"
            className="inline-flex items-center gap-2 rounded-md border border-teal-500 px-5 py-3 text-xs font-semibold tracking-widest uppercase text-[#00a8cc] transition-colors hover:bg-teal-50"
          >
            All Destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Cards Carousel */}
        <div className="mt-10">
          <FeaturedCarousel destinations={destinations} />
        </div>
      </div>
    </section>
  );
};

export default Featured;
