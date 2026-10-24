"use client";

import {
    EditDestination,
} from "@/app/components/destination/EditDestination";
import DeleteDestination from "@/app/components/DeleteDestination";
import IDestination from "@/lib/destination";

export function DetailActions({
    destination,
}: { destination: IDestination}) {

    return (
        <div className="flex items-center gap-2">
            <EditDestination destination={destination} />
            
            <DeleteDestination destination={destination} />
        </div>
    );
}
