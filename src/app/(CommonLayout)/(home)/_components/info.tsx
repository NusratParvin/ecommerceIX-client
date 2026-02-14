"use client";
import { Truck, DollarSign, Headphones, Gift } from "lucide-react";
// import Link from "next/link";

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
      <div className="bg-gray-500/10 py-6 md:py-8 px-4 text-center">
        <div className="w-full md:w-11/12 mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-1 p-2 md:p-0"
              >
                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-charcoal/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-300 py-10 w-full md:w-11/12 mx-auto"></div> */}
    </div>
  );
};

export default Info;
