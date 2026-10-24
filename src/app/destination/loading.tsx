import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DestinationListLoading = () => {
    return (
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
};

export default DestinationListLoading;
