"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "Step Into the Season",
    headline: "Timeless layers for crisp autumn days",
    cta: "Shop the collection",
    image: "/assets/slide1.jpg",
    href: "/allProducts",
  },
  {
    id: 2,
    tag: "Trending Now",
    headline: "Cozy knits in warm neutrals",
    cta: "Discover Selection",
    image: "/assets/slide2.jpg",
    href: "/allProducts",
  },
  {
    id: 3,
    tag: "The Statement Look",
    headline: "Bold textures meet effortless style",
    cta: "Discover more",
    image: "/assets/slide3.jpg",
    href: "/allProducts",
  },
  {
    id: 4,
    tag: "Everyday Essentials",
    headline: "Minimal silhouettes for modern living",
    cta: "Explore essentials",
    image: "/assets/slide4.jpg",
    href: "/allProducts",
  },
];

export default function BannerCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
    })
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
    <div className="w-full mt-14">
      <div className="relative mx-auto">
        <div className="overflow-hidden rounded-none" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((s, i) => (
              <div key={s.id} className="flex-[0_0_100%]">
                <div className="relative h-[540px] w-full bg-white overflow-hidden">
                  <div className="relative flex h-full w-full max-w-screen mx-auto px-4 md:px-0 items-center bg-gray-50">
                    {/* Right: Image Side (partial width) */}
                    <div className="relative w-[80%] h-full ml-auto z-10">
                      {i === selected && (
                        <motion.div
                          key={`image-${s.id}`}
                          initial={{ opacity: 0, x: 0, y: 0 }}
                          animate={{ opacity: 1, x: 80, y: 0 }}
                          exit={{ opacity: 0, x: 0, y: -80 }}
                          transition={{ duration: 2 }}
                          className="absolute inset-0 z-10 overflow-hidden [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)]"
                        >
                          <Image
                            src={s.image}
                            alt={s.headline}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={i === 0}
                          />

                          {/* LEFT Slanted White Overlay (slants rightward) */}
                          <div className="absolute inset-0 z-20 [clip-path:polygon(20%_0%,40%_0%,20%_100%,0%_100%)] bg-white/40" />

                          {/* RIGHT Slanted White Overlay (slants leftward) */}
                          <div className="absolute inset-0 z-20 [clip-path:polygon(100%_0,100%_100%,80%_100%,100%_0)] bg-white/40" />
                        </motion.div>
                      )}
                    </div>

                    {/* Left: Text Section */}
                    {i === selected && (
                      <motion.div
                        key={`text-${s.id}`}
                        initial={{ opacity: 0, x: 60, y: 40 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 20, y: 20 }}
                        transition={{ duration: 1.8 }}
                        className="absolute w-full md:w-[55%] z-50 space-y-8 ml-24"
                      >
                        <p className="text-deep-brown font-medium text-3xl">
                          {s.tag}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-serif font-normal tracking-tight leading-6 text-black/80">
                          {s.headline}
                        </h2>
                        <Link
                          href={s.href}
                          className="inline-block mt-4 px-12 py-3 bg-deep-brown/90 text-ivory font-medium rounded-none hover:bg-deep-brown transition text-xl"
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
          <ChevronLeft className="w-16 h-12 text-gray-400 font-normal" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-gray-600 rounded-full w-10 h-20 z-30 flex items-center justify-center"
        >
          <ChevronRight className="w-16 h-12 text-gray-400 font-normal" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center bottom-6 left-1/3 right-1/3 z-50 space-x-2 absolute">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`w-14 rounded-none ${
                index === selected ? "bg-gray-600 h-1.5" : "bg-gray-400 h-1"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
