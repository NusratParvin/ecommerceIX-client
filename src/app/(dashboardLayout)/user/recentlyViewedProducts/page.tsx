"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./productCard";
import { Product } from "@/types";

export default function RecentProductsPage() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentProductsKey = "recentProducts";

    // Fetch and parse localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem(recentProductsKey) || "[]"
    ) as (Product | null)[];

    // Filter out null or undefined values
    const validProducts = storedProducts.filter(
      (product): product is Product => product !== null && product !== undefined
    );

    setRecentProducts(validProducts);
  }, []);

  return (
    <div className=" w-full h-full  mx-auto p-2 tracking-tight overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mb-4 text-left text-lg font-semibold text-slate-700"
      >
        Recently Viewed Products
      </motion.h1>

      {recentProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-500"
        >
          No recently viewed products.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {recentProducts.map((product, index) => (
            <ProductCard key={product?.id} product={product} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
