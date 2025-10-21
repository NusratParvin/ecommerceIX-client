"use client";

import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import { Loader, Package } from "lucide-react";

import { motion } from "framer-motion";
import { ReviewsSection } from "./_components/reviewsSection";
import { OrdersSection } from "./_components/ordersSection";
import { PricingSection } from "./_components/pricingSection";
import { ProductHeader } from "./_components/prodeuctHeader";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  console.log(data?.data);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center text-red-500 font-medium">
        Product not found!
      </div>
    );
  }

  const product = data.data;

  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-1 mb-6">
        <Package className="w-4 h-4 mb-1" />
        <h1 className="text-lg font-semibold text-slate-700">
          Product Details
        </h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <ProductHeader product={product} />

        <div className="grid  grid-cols-1 md:grid-cols-2 gap-2">
          <div className="h-[400px] md:h-[300px]  ">
            <PricingSection product={product} />
          </div>
          <div className="h-[500px] md:h-[300px]">
            <OrdersSection product={product} />
          </div>
        </div>

        <div className="h-[600px]">
          <ReviewsSection product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
