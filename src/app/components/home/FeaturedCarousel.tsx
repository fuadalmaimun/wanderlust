"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

import IDestination from "@/lib/destination";

interface FeaturedCarouselProps {
  destinations: IDestination[];
}

export default function FeaturedCarousel({
  destinations,
}: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const total = destinations.length;
  const atStart = selected === 0;
  const atEnd = selected >= total - 1;

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-3">
          {destinations.map((d, i) => {
            const destinationId = d._id ?? i;

            return (
              <div
                key={String(destinationId)}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%] pl-3"
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
                  {/* Image + rating badge */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {d.imageUrl ? (
                      <Image
                        src={d.imageUrl}
                        alt={d.name}
                        fill
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 32vw"
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

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-1.5 p-4">
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      {d.country}
                    </p>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold leading-snug text-slate-900">
                        {d.name}
                      </h3>
                      <p className="shrink-0 text-lg font-bold text-slate-900">
                        ${d.price}
                        <span className="text-xs font-normal text-muted-foreground">
                          /person
                        </span>
                      </p>
                    </div>

                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="size-4" />
                      {d.duration}
                    </p>

                    <Link
                      href={`/destination/${destinationId}`}
                      className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-xs font-bold tracking-wide text-[#00a8cc] uppercase transition-colors hover:text-teal-700"
                    >
                      Book Now
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress + arrows */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-medium text-slate-900">
          {selected + 1}/{total}
        </span>

        <div className="relative h-px flex-1 bg-slate-200">
          <div
            className="absolute inset-y-0 left-0 bg-[#00a8cc] transition-all duration-300"
            style={{ width: `${((selected + 1) / total) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={atStart}
            aria-label="Previous destinations"
            className="grid size-9 place-items-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-[#00a8cc] hover:text-[#00a8cc] disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={atEnd}
            aria-label="Next destinations"
            className="grid size-9 place-items-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-[#00a8cc] hover:text-[#00a8cc] disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
