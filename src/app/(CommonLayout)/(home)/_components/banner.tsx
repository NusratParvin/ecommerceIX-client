"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
                <div className="relative h-[540px] w-full bg-white overflow-hidden">
                  {/* Layout wrapper */}
                  <div className="relative flex h-full w-full max-w-screen-xl mx-auto px-4 md:px-0 items-center">
                    {/* Right: Image Side (partial width) */}
                    <div className="relative w-[60%] h-full ml-auto z-10">
                      {/* Clipped image wrapper to form trapezium/parallelogram */}
                      <div className="absolute inset-0 z-10 [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)] overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.headline}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={i === 0}
                        />
                      </div>

                      {/* LEFT Slanted White Overlay (slants rightward) */}
                      {/* <div className="absolute inset-0 z-20 [clip-path:polygon(0_0,15%_0,0_100%,0_100%)] bg-white/20" /> */}

                      <div
                        className="absolute inset-0 z-20 
[clip-path: polygon(0% 0%, 15% 0%, 0% 100%, -15% 100%);
] bg-blue-500/10"
                      />

                      {/* RIGHT Slanted White Overlay (slants leftward) */}
                      <div className="absolute inset-0 z-20 [clip-path:polygon(100%_0,100%_100%,85%_100%,100%_0)] bg-white/20" />
                    </div>

                    {/* Left: Text Section */}
                    {i === selected && (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: 60, y: 40 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 20, y: 20 }}
                        transition={{ duration: 1.4 }}
                        className="absolute w-full md:w-[70%] z-50 space-y-5 ml-20"
                      >
                        <p className="text-teal-600 font-medium text-lg">
                          {s.tag}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-black">
                          {s.headline}
                        </h2>
                        <Link
                          href={s.href}
                          className="inline-block mt-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition"
                        >
                          {s.cta}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent z-30 flex items-center justify-center"
        >
          {/* &#8249; */}
          <ChevronLeft className="w-16 h-12 text-gray-400 font-normal" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-gray-600 rounded-full w-10 h-20 z-30   flex items-center justify-center"
        >
          <ChevronRight className="w-16 h-12 text-gray-400 font-normal" />
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
