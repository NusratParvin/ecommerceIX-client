"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
}

interface CartItem {
  productInfo: Product;
  quantity: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalAmount,
  discountAmount,
  finalAmount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Order Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productInfo.id} className="flex gap-4">
                  <div className="w-14 h-14 relative rounded-md overflow-hidden">
                    <Image
                      src={item.productInfo.imageUrl as string}
                      alt={item.productInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-base">
                      {item.productInfo.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      <span>
                        {item.productInfo.discount > 0 ? (
                          // If there's a discount, apply the discount percentage
                          <>
                            $
                            {(
                              item.productInfo.price -
                              (item.productInfo.price *
                                item.productInfo.discount) /
                                100
                            ).toFixed(2)}
                          </>
                        ) : item.productInfo.isFlashSale ? (
                          // If it's a flash sale, show the flash sale price
                          <>
                            $
                            {(
                              item.productInfo.price -
                              (item?.productInfo?.flashSalePrice ?? 0)
                            ).toFixed(2)}
                          </>
                        ) : (
                          // If neither, show the regular price
                          <>${item.productInfo.price.toFixed(2)}</>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$2.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;
