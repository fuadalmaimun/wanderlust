import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star, ArrowUpRight } from "lucide-react";
import IDestination from "@/lib/destination";
type Destination = IDestination;

const getDestinations = async (): Promise<Destination[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
};
const DestinationsPage = async () => {
  const destinations = await getDestinations();

  return (
    <div className="flex-1 w-full px-6 py-13 lg:px-12">
      <h1 className="font-heading text-3xl lg:text-4xl font-light tracking-tight">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      <p className="mt-8 mb-4 text-sm text-muted-foreground">
        Showing {destinations.length} destination
        {destinations.length === 1 ? "" : "s"}
      </p>

      {destinations.length === 0 ? (
        <div className="rounded-xl ring-1 ring-foreground/10 bg-card p-12 text-center text-muted-foreground">
          No destinations found. Make sure the backend is running on
          localhost:5000, or add a travel package first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => {
            const destinationId = d._id;

            return (
              <div
                key={destinationId}
                className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {d.imageUrl ? (
                    <Image
                      src={d.imageUrl}
                      alt={d.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {d.rating ?? 4.5}
                    <Star className="size-3 fill-foreground text-foreground" />
                  </span>
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {d.country}
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-heading text-lg leading-snug">
                      {d.name}
                    </h2>
                    <p className="shrink-0 text-lg font-semibold">
                      ${d.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /Person
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    {d.duration}
                  </div>

                  <Link
                    href={`/destination/${destinationId}`}
                    className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold tracking-wide text-teal-600 uppercase transition-colors hover:text-teal-700"
                  >
                    Book Now
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
