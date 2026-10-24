"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
] as const;

const AddDestinationPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries());

    const res =await fetch('http://localhost:5000/add-destination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    console.log(data)
  };

  return (
    <div className="flex-1 w-full px-6 py-13 lg:px-12">
      <h1 className="text-center font-heading text-3xl lg:text-4xl font-light tracking-tight mb-10">
        Add New Travel Package
      </h1>

      <Card className="mx-auto w-full max-w-xl rounded-xl py-8 px-6 shadow-sm">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="sr-only">Travel package details</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="contents">
          <CardContent className="space-y-4 px-0">
            <div className="space-y-1.5">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Bali Paradise"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Indonesia"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                  required
                >
                  <SelectTrigger id="category" className="w-full">
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

                <input type="hidden" name="category" value={category} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g., 1299"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the travel experience..."
                className="min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="mt-4 mb-5 flex justify-end gap-2 border-t-0 bg-transparent px-0 pt-0 pb-0">
            <Button
              type="button"
              variant="outline"
              className="border-destructive/40 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => router.push("/")}
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              <PlusCircle data-icon="inline-start" />
              Add Travel Package
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddDestinationPage;
