"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ParallaxBanner } from "react-scroll-parallax";

export default function ParallaxBannerHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* LEFT CARD — text animates left → right */}
      <ParallaxBanner
        className="relative h-[500px] w-full overflow-hidden"
        layers={[
          // BG image + overlay TOGETHER so they don't drift
          {
            speed: -50,
            translateY: [-80, 80],
            // either expanded:true OR scale>1 to avoid edge gaps
            expanded: false,
            scale: [1.1, 1.1],
            children: (
              <div className="absolute inset-0">
                <Image
                  src="/assets/offer/4.jpg"
                  alt="Summer Sale"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-deep-brown/20" />
              </div>
            ),
          },
          // Foreground text
          {
            translateX: [-20, 20],
            children: (
              <div className="absolute inset-0 flex items-center justify-center z-[1] px-4">
                <div className="text-center  w-2/3 bg-black/20 px-4 py-8 space-y-4">
                  <p className="text-sm md:text-base lg:text-xl tracking-[0.25em] text-white/90">
                    SUMMER SALE
                  </p>
                  <h1 className="mt-2 text-3xl md:text-5xl font-semibold text-white tracking-tighter">
                    Up to <span className="text-white/90">60% Off</span>
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-white/85">
                    Hot picks for sunny days—limited time offers.
                  </p>

                  <Button asChild>
                    <Link
                      href="/allProducts"
                      className="relative w-40 rounded-none   bg-white hover:bg-white  overflow-hidden group py-5"
                    >
                      {/* Animated Background */}
                      <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

                      {/* Button Text */}
                      <span className="relative z-10 text-deep-brown  group-hover:text-white font-semibold text-base uppercase px-8 py-2">
                        Shop now
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* RIGHT CARD — text animates right → left */}
      <ParallaxBanner
        className="relative h-[500px] w-full overflow-hidden"
        layers={[
          {
            speed: -50,
            translateY: [-80, 80],
            expanded: false,
            scale: [1.1, 1.1],
            children: (
              <div className="absolute inset-0">
                <Image
                  src="/assets/offer/3.jpg"
                  alt="New Arrivals"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-deep-brown/20" />
              </div>
            ),
          },
          {
            translateX: [20, -20],
            children: (
              <div className="absolute inset-0 flex items-center justify-center z-[1] px-4">
                <div className="text-center w-2/3 bg-black/20 px-4 py-8 space-y-4">
                  <p className="text-sm md:text-base lg:text-xl tracking-[0.25em] text-white/90">
                    NEW ARRIVALS
                  </p>
                  <h1 className="mt-2 text-3xl md:text-5xl font-semibold text-white tracking-tighter">
                    Fresh Season Essentials
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-white/85">
                    Clean cuts, cooler fabrics—just dropped.
                  </p>
                  <Button asChild>
                    <Link
                      href="/allProducts"
                      className="relative w-40 rounded-none  border-none bg-white hover:bg-white overflow-hidden group py-5"
                    >
                      {/* Animated Background */}
                      <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

                      {/* Button Text */}
                      <span className="relative z-10 text-deep-brown  group-hover:text-white font-semibold text-base uppercase px-8 py-2">
                        Shop now
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
