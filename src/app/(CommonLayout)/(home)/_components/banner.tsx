"use client";
import { motion } from "framer-motion";

import Image from "next/image";
import bannerImage from "@/assets/b.jpg";

const Banner = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden ">
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={bannerImage}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-deep-brown/10 " />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl tracking-tighter text-cream mb-6"
          >
            Discover Unique Products from Global Sellers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream  mb-8"
          >
            Shop millions of products from independent sellers around the world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="bg-cream text-deep-brown px-8 py-3 rounded-full font-semibold hover:bg-deep-brown hover:text-cream transition-colors duration-200">
              Start Shopping
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
