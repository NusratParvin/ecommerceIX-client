"use client";
import { Truck, DollarSign, Headphones, Gift } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "No need to worry about cost",
  },
  {
    icon: DollarSign,
    title: "Payment Method",
    description: "Easy and hassle-free online transaction",
  },
  {
    icon: Headphones,
    title: "Online Support",
    description: "24 hours a day, 7 days a week",
  },
  {
    icon: Gift,
    title: "Secure Packaging",
    description: "Every order packaging securely placed",
  },
];

const Info = () => {
  return (
    <div>
      <div className="bg-warm-brown/10 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl   text-charcoal leading-relaxed">
            Explore unique fashion and accessories, where top vendors bring you
            quality, style, and elegance for every occasion.
          </p>
          <button className="mt-6 text-sm font-semibold text-warm-brown hover:underline">
            <Link href="/about"> LEARN MORE</Link>
          </button>
        </div>
      </div>
      <div className="bg-white py-10 w-full md:w-11/12 mx-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3"
              >
                {/* Icon */}
                <feature.icon className="h-10 w-10 text-warm-brown" />
                {/* Title */}
                <h3 className="text-lg font-semibold text-warm-brown">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-charcoal/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
