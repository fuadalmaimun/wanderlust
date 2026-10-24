import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Check,
} from "lucide-react";

import { DetailActions } from "./detail-actions";
import { BookingCard } from "./booking-card";

type Destination = {
  id?: string | number;
  name: string;
  country: string;
  category?: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
};

const DEFAULT_HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

const getDestination = async (
  id: string
): Promise<Destination | null> => {
  try {
    const res = await fetch(
      `http://localhost:5000/destinations/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
};

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return (
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card p-8 text-center sm:p-12">
          <h2 className="text-xl font-semibold">
            Destination Not Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please check the destination or make sure the backend
            is running on localhost:5000.
          </p>

          <Link
            href="/destination"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const description =
    destination.description ??
    "Discover the magic of this destination with beautiful landscapes, unique culture, and unforgettable experiences.";

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          href="/destination"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <DetailActions />
      </div>

      {/* Hero Image */}
      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-muted sm:h-[300px] lg:h-[360px]">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {destination.category ?? "Explore"}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-7 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        {/* Destination Information */}
        <div className="min-w-0 flex-1">
          {/* Country */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-teal-600" />
            {destination.country}
          </div>

          {/* Destination Name */}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {destination.name}
          </h1>

          {/* Rating and Duration */}
          <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />

              <span className="font-semibold">
                {destination.rating ?? 4.9}
              </span>

              <span className="text-muted-foreground">
                (234 reviews)
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-4 text-teal-600" />
              <span>{destination.duration}</span>
            </div>
          </div>

          {/* Overview */}
          <section className="mt-8 rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="text-xl font-semibold">
              Overview
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>
          </section>

          {/* Highlights */}
          <section className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="text-xl font-semibold">
              Trip Highlights
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Experience memorable moments during your journey.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DEFAULT_HIGHLIGHTS.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-6"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
                    <Check className="size-3.5 text-teal-600" />
                  </span>

                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Booking Sidebar */}
        <aside className="w-full lg:w-[320px] lg:shrink-0">
          <div>
            <BookingCard
              price={destination.price}
              departureDate={destination.departureDate}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
