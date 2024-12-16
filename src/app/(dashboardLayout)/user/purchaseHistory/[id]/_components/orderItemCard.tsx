"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ReviewDialog } from "./reviewDialogue";

interface OrderItemCardProps {
  item: {
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      imageUrl: string;
      price: number;
      discount: number;
      isFlashSale: boolean;
      flashSalePrice: number | null;
    };
  };
}

export const OrderItemCard = ({ item }: OrderItemCardProps) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
    >
      <Link href={`/products/${item?.product?.id}`} className="shrink-0">
        <div className="h-20 w-20 relative rounded-md overflow-hidden">
          <Image
            src={item?.product?.imageUrl}
            alt={item?.product?.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex-1 space-y-1">
        <Link href={`/products/${item?.product?.id}`}>
          <h3 className="font-medium  text-deep-brown underline">
            {item?.product?.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          Quantity: {item?.quantity}
        </p>
        <div className="flex items-center gap-2">
          {item?.product?.discount > 0 && (
            <Badge variant="secondary" className="text-red-600">
              {item?.product?.discount}% OFF
            </Badge>
          )}
          {item?.product?.isFlashSale && (
            <Badge variant="secondary" className="text-red-600">
              Flash Sale: ${item?.product?.flashSalePrice}
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReviewOpen(true)}
          className="mt-2 text-red-700"
        >
          Write a Review
        </Button>
      </div>

      <div className="text-right">
        <p className="font-medium">
          $
          {/* {item?.product?.isFlashSale
            ? (
                (item?.product?.flashSalePrice || item?.product?.price) *
                item?.quantity
              ).toFixed(2)
            : item?.product?.discount > 0
            ? (
                (item?.product?.price -
                  (item?.product?.price * item?.product?.discount) / 100) *
                item?.quantity
              ).toFixed(2)
            : (item?.product?.price * item?.quantity).toFixed(2)}
        </p>
        {(item?.product?.isFlashSale || item?.product?.discount > 0) && (
          <p className="text-sm text-muted-foreground line-through">
            ${(item?.product?.price * item?.quantity).toFixed(2)}
          </p>
        )} */}
          {item?.product.isFlashSale
            ? (
                (item?.product.price - (item?.product.flashSalePrice || 0)) *
                item?.quantity
              ).toFixed(2)
            : item?.product.discount > 0
            ? (
                (item?.product.price -
                  (item?.product.price * item?.product.discount) / 100) *
                item?.quantity
              ).toFixed(2)
            : (item?.product.price * item?.quantity).toFixed(2)}
        </p>
        {(item?.product.isFlashSale || item?.product.discount > 0) && (
          <p className="text-sm text-red-400 line-through">
            ${(item?.product.price * item?.quantity).toFixed(2)}
          </p>
        )}
      </div>

      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        productId={item?.product?.id}
        productName={item?.product?.name}
      />
    </motion.div>
  );
};
