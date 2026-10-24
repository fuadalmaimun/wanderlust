"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    quote:
      '"Exploring Santorini through Wanderlast was a dream come true. Flawless execution and incredible recommendations for local spots!"',
    name: "David Miller",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white font-sans">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        {/* Header Row: Title + Next/Prev Buttons */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight mb-2">
              What Travelers Say
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Real experiences from our happy travelers
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="relative flex items-center space-x-3">
            <CarouselPrevious className="static transform-none h-11 w-11 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer" />
            <CarouselNext className="static transform-none h-11 w-11 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Carousel Cards */}
        <CarouselContent className="-ml-6">
          {testimonials.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-6 md:basis-1/2 lg:basis-1/2"
            >
              <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm overflow-hidden h-full">
                <CardContent className="p-0 h-full flex flex-col sm:flex-row items-stretch">
                  {/* Left Text Content */}
                  <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                    <p className="text-slate-800 font-serif text-lg leading-snug mb-8">
                      {item.quote}
                    </p>
                    <div>
                      <p className="text-[#00a8cc] font-medium text-base">
                        — {item.name}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Right Image Container */}
                  <div className="relative w-full sm:w-52 h-60 sm:h-auto shrink-0 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 208px"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}