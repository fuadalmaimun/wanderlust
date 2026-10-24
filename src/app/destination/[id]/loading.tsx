// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// const DestinationDetailsLoading = () => {
//     return (
//         <div className="flex-1 w-full px-6 py-10 lg:px-12">
//             {/* Top bar */}
//             <div className="mb-6 flex items-center justify-between gap-4">
//                 <Skeleton className="h-5 w-44" />
//                 <div className="flex gap-2">
//                     <Skeleton className="h-8 w-20" />
//                     <Skeleton className="h-8 w-20" />
//                 </div>
//             </div>

//             {/* Hero image */}
//             <Skeleton className="aspect-[21/9] w-full rounded-xl" />

//             <div className="mt-8 flex flex-col lg:flex-row gap-8">
//                 {/* Main content */}
//                 <div className="flex-1 min-w-0 space-y-4">
//                     <Skeleton className="h-4 w-28" />
//                     <Skeleton className="h-10 w-72 max-w-full" />
//                     <div className="flex gap-4">
//                         <Skeleton className="h-4 w-32" />
//                         <Skeleton className="h-4 w-36" />
//                     </div>

//                     <div className="pt-4 space-y-2">
//                         <Skeleton className="h-6 w-32" />
//                         <Skeleton className="h-4 w-full max-w-xl" />
//                         <Skeleton className="h-4 w-11/12 max-w-xl" />
//                     </div>

//                     <div className="pt-4 space-y-2">
//                         <Skeleton className="h-6 w-32" />
//                         <Skeleton className="h-4 w-full max-w-xl" />
//                         <Skeleton className="h-4 w-10/12 max-w-xl" />
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pt-2">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                                 <Skeleton key={i} className="h-4 w-full max-w-56" />
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Booking sidebar */}
//                 <aside className="w-full lg:w-80 shrink-0 self-start rounded-xl bg-card p-6 ring-1 ring-foreground/10 space-y-3">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-9 w-32" />
//                     <Skeleton className="h-4 w-20" />
//                     <Skeleton className="mt-2 h-8 w-full" />
//                     <Skeleton className="h-9 w-full" />
//                     <div className="pt-2 space-y-3">
//                         {Array.from({ length: 3 }).map((_, i) => (
//                             <Skeleton key={i} className="h-4 w-full max-w-52" />
//                         ))}
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// };

// export default DestinationDetailsLoading;
