import React from "react";
import { ShieldCheck, Map, Headphones } from "lucide-react";

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    id: 2,
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    id: 3,
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f0f9ff] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight mb-3">
          Why Choose Wanderlast
        </h2>
        
        {/* Subheading */}
        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-14 font-normal">
          Your trusted partner for exceptional travel experiences
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-sm p-8 text-left shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-start"
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-[#00a8cc] stroke-[1.8]" />
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-serif text-slate-800 mb-4">
                  {feature.title}
                </h3>

                {/* Card Description */}
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}