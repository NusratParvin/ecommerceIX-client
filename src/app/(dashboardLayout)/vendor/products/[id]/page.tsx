// "use client";
// import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { Star, Loader, MessageSquare } from "lucide-react";

// const ProductDetails = () => {
//   const { id } = useParams(); // Extract the product ID from the route
//   const { data, isLoading, isError } = useGetProductByIdQuery(id);
//   console.log(data?.data);
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   if (isError || !data?.data) {
//     return (
//       <div className="text-center text-red-500 font-medium">
//         Product not found!
//       </div>
//     );
//   }

//   const product = data.data;

//   return (

//   );
// };

// export default ProductDetails;

"use client";

import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <ProductHeader product={product} />

        <div className="grid md:grid-cols-2 gap-8">
          <PricingSection product={product} />
          <OrdersSection product={product} />
        </div>

        <ReviewsSection product={product} />
      </motion.div>
    </div>
  );
};

export default ProductDetails;
