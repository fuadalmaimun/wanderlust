"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- / — Home ---------- */
const HomeSkeleton = () => (
    <div className="flex-1 w-full">
        {/* Banner */}
        <Skeleton className="h-[420px] w-full rounded-none" />
        {/* Section blocks */}
        <div className="px-6 py-12 lg:px-12 space-y-4">
            <Skeleton className="mx-auto h-8 w-72 max-w-full" />
            <Skeleton className="mx-auto h-4 w-96 max-w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        </div>
    </div>
);

/* ---------- /add-destination — Form ---------- */
const AddDestinationSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
    {/* Page Heading */}
    <Skeleton className="mx-auto h-10 w-80 max-w-full" />

    {/* Form Card */}
    <div className="mx-auto mt-10 w-full max-w-xl rounded-xl border bg-card px-6 py-8 shadow-sm">
      <div className="space-y-5">
        {/* Destination Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Country & Category */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 border-t pt-5">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);


/* ---------- /destination — Listing ---------- */
const DestinationListSkeleton = () => (
    <div className="flex-1 w-full px-6 py-13 lg:px-12">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-3 h-4 w-96 max-w-full" />

        <Skeleton className="mt-8 mb-4 h-4 w-44" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
                >
                    <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    <div className="flex flex-col gap-3 p-4">
                        <Skeleton className="h-4 w-24" />
                        <div className="flex items-baseline justify-between gap-2">
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/* ---------- /destination/[id] — Details ---------- */
const DestinationDetailsSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-12">
    <div className="mb-6 flex items-center justify-between gap-4">
      <Skeleton className="h-5 w-44" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>

    <Skeleton className="aspect-[21/9] w-full rounded-xl" />

    <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-72 max-w-full" />

        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="space-y-2 pt-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-11/12 max-w-xl" />
        </div>

        <div className="space-y-2 pt-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-10/12 max-w-xl" />

          <div className="grid grid-cols-1 gap-x-8 gap-y-2 pt-2 sm:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full max-w-56" />
            ))}
          </div>
        </div>
      </div>

      <aside className="w-full shrink-0 self-start space-y-3 rounded-xl bg-card p-6 ring-1 ring-foreground/10 lg:w-80">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="mt-2 h-8 w-full" />
        <Skeleton className="h-9 w-full" />

        <div className="space-y-3 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full max-w-52" />
          ))}
        </div>
      </aside>
    </div>
  </div>
);
/* ---------- Fallback — unknown routes ---------- */
const GenericSkeleton = () => (
    <div className="flex-1 w-full px-6 py-10 lg:px-12 space-y-4">
        <Skeleton className="h-10 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <Skeleton className="h-64 w-full rounded-xl" />
    </div>
);

const LoadingPage = () => {
    const pathname = usePathname();

    if (pathname?.startsWith("/destination/")) return <DestinationDetailsSkeleton />;
    if (pathname === "/destination") return <DestinationListSkeleton />;
    if (pathname === "/add-destination") return <AddDestinationSkeleton />;
    if (pathname === "/") return <HomeSkeleton />;
    return <GenericSkeleton />;
};

export default LoadingPage;
