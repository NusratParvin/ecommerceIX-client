"use client";

import Marquee from "react-fast-marquee";

const messages = [
  "Hurry! Limited-Time Offers",
  "Flash Sale: Dresses under $50",
  "Summer Special: Tops from $19.99",
  "Luxury Looks, Affordable Prices",
];

export default function DealsTicker() {
  return (
    <section className="bg-black text-white">
      <Marquee
        gradient={false}
        speed={45}
        pauseOnHover
        autoFill
        className="py-3"
      >
        {messages.map((msg, i) => (
          <div key={i} className="flex items-center mx-10 h-4">
            <span className="text-sm md:text-lg whitespace-nowrap tracking-tighter font-sans">
              {msg}
            </span>
            {/* dot separator */}
            <span className="mx-10 inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
