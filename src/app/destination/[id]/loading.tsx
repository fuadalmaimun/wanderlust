import { Skeleton } from "@/components/ui/skeleton";

const DestinationDetailsLoading = () => {
    return (
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between gap-4">
                <Skeleton className="h-5 w-40" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>

            <Skeleton className="h-[220px] w-full rounded-2xl sm:h-[300px] lg:h-[360px]" />

            <div className="mx-auto mt-7 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-3 h-9 w-72 max-w-full" />

                    <div className="mt-4 flex flex-wrap items-center gap-5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-28" />
                    </div>

                    <section className="mt-8 rounded-2xl border bg-card p-5 sm:p-6">
                        <Skeleton className="h-6 w-32" />
                        <div className="mt-4 space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </section>

                    <section className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="mt-3 h-4 w-64 max-w-full" />

                        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Skeleton className="size-5 shrink-0 rounded-full" />
                                    <Skeleton className="h-4 w-full max-w-[180px]" />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <aside className="w-full lg:w-[320px] lg:shrink-0">
                    <div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-2 h-8 w-32" />
                        <Skeleton className="mt-1 h-4 w-24" />
                        <Skeleton className="mt-4 h-10 w-full" />
                        <Skeleton className="mt-3 h-10 w-full" />

                        <div className="mt-5 space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton className="size-4 shrink-0 rounded-full" />
                                    <Skeleton className="h-4 w-40 max-w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DestinationDetailsLoading;
