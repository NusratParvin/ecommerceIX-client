"use client";
import Image from "next/image";

const logos = [
  { src: "/assets/logos/brand-1.png", alt: "Chavy" },
  { src: "/assets/logos/brand-2.png", alt: "Power House Fitness" },
  { src: "/assets/logos/brand-3.png", alt: "Hardcore" },
  { src: "/assets/logos/brand-4.png", alt: "Fitness Association" },
  { src: "/assets/logos/brand-5.png", alt: "Fishing" },
];

export default function BrandStrip() {
  return (
    <section className="w-full bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* container */}
        <div className="flex items-center justify-between gap-8 py-10 md:py-14">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-10 w-28 sm:h-12 sm:w-32 md:h-14 md:w-40 lg:h-16 lg:w-44
                         flex-shrink-0 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition"
              title={logo.alt}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(min-width:1024px) 12vw, (min-width:768px) 18vw, 40vw"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
