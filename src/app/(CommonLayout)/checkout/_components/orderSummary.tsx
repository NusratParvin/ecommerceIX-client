"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
}

interface CartItem {
  productInfo: Product;
  quantity: number;
}
// console.log(items);
const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="border border-dashed border-slate-300
       bg-slate-50  rounded-none shadow-none pb-4"
      >
        <CardHeader>
          <CardTitle className="text-2xl text-slate-700 font-medium pb-3 border-b border-dashed ">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Order Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productInfo.id} className="flex gap-2">
                  <div className="w-16 h-16 relative rounded-none overflow-hidden">
                    <Image
                      src={item.productInfo.imageUrl as string}
                      alt={item.productInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xl text-slate-800">
                      {item.productInfo.name}
                    </h3>
                    <p className="text-base text-black/50 font-sans font-medium">
                      <span>
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
                              {
                                // item.productInfo.price -
                                (
                                  item?.productInfo?.flashSalePrice ?? 0
                                ).toFixed(2)
                              }
                            </>
                          ) : (
                            // If neither, show the regular price
                            <>${item.productInfo.price.toFixed(2)}</>
                          )}
                        </span>
                      </span>{" "}
                      <span> X {item.quantity}</span>
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-red-600 font-sans">
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
                          {// item.productInfo.price -
                          (item?.productInfo?.flashSalePrice ?? 0).toFixed(2)}
                        </>
                      ) : (
                        // If neither, show the regular price
                        <>${item.productInfo.price.toFixed(2)}</>
                      )}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;
