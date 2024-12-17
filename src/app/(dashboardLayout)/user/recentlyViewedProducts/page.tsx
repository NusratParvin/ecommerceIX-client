// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   shop: {
//     id: string;
//     name: string;
//   };
// }

// const RecentProductsPage = () => {
//   const [recentProducts, setRecentProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const recentProductsKey = "recentProducts";
//     const storedProducts = JSON.parse(
//       localStorage.getItem(recentProductsKey) || "[]"
//     ) as Product[];
//     setRecentProducts(storedProducts);
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-deep-brown">
//         Recently Viewed Products
//       </h1>

//       {recentProducts.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No recently viewed products.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {recentProducts.map((product) => (
//             <div
//               key={product?.id}
//               className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="relative h-48 mb-4">
//                 <Image
//                   src={product?.imageUrl}
//                   alt={product?.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-md"
//                 />
//               </div>

//               <h2 className="text-lg font-semibold text-deep-brown mb-2">
//                 {product?.name}
//               </h2>

//               <p className="text-gray-600 mb-2">
//                 Price:{" "}
//                 <span className="font-medium text-gray-900">
//                   ${product?.price}
//                 </span>
//               </p>

//               <Link href={`/shop/${product?.shop.id}`}>
//                 <p className="text-sm text-blue-600 hover:underline mb-4">
//                   Shop: {product?.shop?.name}
//                 </p>
//               </Link>

//               <Link href={`/products/${product?.id}`}>
//                 <Button className="w-full">View Product</Button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentProductsPage;

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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center text-gray-800"
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
