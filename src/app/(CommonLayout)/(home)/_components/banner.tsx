"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    tag: "Check out our F/W 2022 collection!",
    headline: "Muted colors & relaxed silhouettes",
    cta: "Shop new collection",
    image: "/assets/1.png",
    href: "/collection/fw22",
  },
  {
    id: 2,
    tag: "Now Trending",
    headline: "Soft knits & neutrals",
    cta: "Browse the edit",
    image: "/assets/3.png",
    href: "/collection/knits",
  },
];

export default function BannerCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay.current]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="w-full border mt-14">
      <div className="relative mx-auto">
        <div className="overflow-hidden rounded-none" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((s, i) => (
              <div key={s.id} className="flex-[0_0_100%]">
                <div className="relative h-[540px] w-full flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                    {/* Left text side */}
                    <div className="flex flex-col justify-center px-8 md:px-16 relative z-10 bg-gradient-to-r from-[#f8f3f0] to-[#f1e9e3]">
                      <AnimatePresence mode="wait">
                        {i === selected && (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, x: 60, y: 40 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 20, y: 20 }}
                            transition={{ duration: 1.6 }}
                            className="space-y-4"
                          >
                            <p className="text-teal-600 font-medium text-lg">
                              {s.tag}
                            </p>
                            <h2 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-gray-900">
                              {s.headline}
                            </h2>

                            <Link
                              href={s.href}
                              className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition"
                            >
                              {s.cta}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right image side with angled overlay */}
                    <Link
                      href={s.href}
                      className="relative h-full w-full block group"
                    >
                      <AnimatePresence mode="wait">
                        {i === selected && (
                          <motion.div
                            key={s.image}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 1.6 }}
                            className="relative h-full w-full overflow-hidden"
                          >
                            {/* Next.js Image Component */}
                            <div className="w-full h-full relative">
                              <Image
                                src={s.image}
                                alt={s.headline}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={i === 0} // Only prioritize the first image for performance
                              />
                            </div>

                            {/* Right Diagonal Overlay */}
                            <div className="absolute inset-0 bg-white/70 [clip-path:polygon(100%_0,100%_100%,70%_100%,85%_0)] z-10" />

                            {/* Optional: Add a subtle gradient to the overlay */}
                            <div className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,70%_100%,85%_0)] bg-gradient-to-r from-transparent to-white/30 z-20" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={scrollPrev}
          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 rounded-full w-10 h-10 z-30 shadow flex items-center justify-center"
        >
          &#8249;
        </button>
        <button
          onClick={scrollNext}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 rounded-full w-10 h-10 z-30 shadow flex items-center justify-center"
        >
          &#8250;
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === selected ? "bg-teal-600" : "bg-gray-300"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
