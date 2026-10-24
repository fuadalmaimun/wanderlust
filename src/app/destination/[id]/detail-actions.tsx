"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DetailActions() {
    const router = useRouter();

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                className="border-border bg-background"
                onClick={() => router.push("/add-destination")}
            >
                <Pencil data-icon="inline-start" />
                Edit
            </Button>
            <Button
                variant="outline"
                className="border-destructive/40 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => router.push("/destination")}
            >
                <Trash2 data-icon="inline-start" />
                Cancel
            </Button>
        </div>
    );
}
