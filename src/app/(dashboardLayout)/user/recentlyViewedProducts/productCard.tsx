"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    // <motion.div
    //   initial={{ opacity: 0, x: 20 }}
    //   animate={{ opacity: 1, x: 0 }}
    //   transition={{ duration: 0.3, delay: index * 0.7 }}
    // >
    //   <Card className="flex items-center gap-4 p-3 bg-slate-50/80 hover:bg-slate-50 transition-colors">
    //     {/* Product Image */}
    //     <div className="relative w-16 h-16 rounded-none overflow-hidden bg-white flex-shrink-0">
    //       <Image
    //         src={product?.imageUrl as string}
    //         alt={product?.name}
    //         fill
    //         className="object-cover   w-full h-full"
    //       />
    //     </div>

    //     {/* Product Details */}
    //     <div className="flex-1 min-w-0">
    //       <h3 className="font-medium text-slate-900 truncate">
    //         {product?.name}
    //       </h3>
    //       <p className="text-sm text-slate-500 line-clamp-1">
    //         {product?.shop.name}
    //       </p>
    //       <p className="mt-1 font-semibold">$ {product?.price.toFixed(2)}</p>
    //     </div>

    //     {/* Action Button */}
    //     <Link href={`/products/${product?.id}`}>
    //       <Button
    //         size="icon"
    //         variant="ghost"
    //         className="h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0"
    //       >
    //         <ShoppingBag className="h-4 w-4" />
    //         <span className="sr-only">View Product</span>
    //       </Button>
    //     </Link>
    //   </Card>
    // </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.7 }}
    >
      <Card className="flex items-center gap-4 h-[180px] bg-cream/20  hover:bg-slate-50 transition-colors p-0 rounded-none border-none shadow-xl">
        {/* Product Image on the Side */}
        <div className="relative w-[45%] h-full flex-shrink-0">
          <Image
            src={product?.imageUrl as string}
            alt={product?.name}
            fill
            className="object-cover rounded-none"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full p-3 ps-0">
          <div>
            <Link href={`/products/${product?.id}`}>
              <h3 className="font-semibold text-lg text-deep-brown truncate hover:underline">
                {product?.name}
              </h3>
            </Link>
            <Link
              href={`/shop/${product?.shop?.id}`}
              className="text-xs text-blue-500 hover:underline"
            >
              {product?.shop?.name}
            </Link>
          </div>

          {/* Pricing Section */}
          <div className="mt-1">
            {product?.isFlashSale && product?.flashSalePrice ? (
              <div className="flex flex-col  items-start gap-2">
                <span className="text-lg font-bold text-red-500">
                  ${product?.flashSalePrice.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    ${product?.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-white bg-red-500 px-1.5 py-0.5 rounded">
                    Flash Sale
                  </span>
                </div>
              </div>
            ) : product?.discount && product?.discount > 0 ? (
              <div className="flex flex-col items-start gap-2">
                <span className="text-lg font-bold text-green-600">
                  ${(product?.price * (1 - product?.discount / 100)).toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    ${product?.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-white bg-green-500 px-1.5 py-0.5 rounded">
                    {product?.discount}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-lg font-bold text-slate-800">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0  mt-auto mb-4 me-4">
          <Link href={`/products/${product?.id}`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-warm-brown hover:bg-deep-brown text-cream hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only">View Product</span>
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
