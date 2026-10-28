"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import IDestination from "@/lib/destination";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
] as const;

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

export function EditDestination({
  destination,
}: {
  destination: IDestination;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: destination.name ?? "",
    country: destination.country ?? "",
    category: destination.category ?? "",
    price: String(destination.price ?? ""),
    duration: destination.duration ?? "",
    departureDate: destination.departureDate ?? "",
    imageUrl: destination.imageUrl ?? "",
    description: destination.description ?? "",
  });

  const setField = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destinationId = destination._id;
    if (!destinationId) return;

    setSaving(true);
    try {
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication token not found!");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destinationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      // বাকি তোমার code আগের মতোই থাকবে
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      setOpen(false);
      toast.success("Destination updated successfully");
      router.refresh(); // re-fetch the server-rendered details with new data
    } catch {
      toast.error(
        "Could not save changes. Make sure the backend is running on localhost:5000.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="border-border bg-background">
            <Pencil data-icon="inline-start" />
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Destination Name</Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => setField("category", value ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-price">Price (USD)</Label>
              <Input
                id="edit-price"
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-departureDate">Departure Date</Label>
            <Input
              id="edit-departureDate"
              type="date"
              value={form.departureDate}
              onChange={(e) => setField("departureDate", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-imageUrl">Image URL</Label>
            <Input
              id="edit-imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Describe the travel experience..."
              className="min-h-28"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <DialogFooter className="-mx-4 -mb-4 bg-transparent">
            <Button
              type="button"
              variant="outline"
              className="border-destructive/40 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setOpen(false)}
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 text-white hover:bg-teal-700"
              disabled={saving}
            >
              <Save data-icon="inline-start" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
