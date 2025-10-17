/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewDialog } from "./reviewDialogue";

const CustomerOrderProductsTable = ({
  item,
  order,
}: {
  item: any;
  order: any;
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <>
      <TableRow>
        {/* Product Column */}
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              {item.product.imageUrl ? (
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                from {order.shop?.name}
              </p>
            </div>
          </div>
        </TableCell>

        {/* Category */}
        <TableCell className="text-center">
          <Badge variant="outline" className="text-xs">
            {item.product.category?.name || "N/A"}
          </Badge>
        </TableCell>

        {/* Quantity */}
        <TableCell className="text-center">
          <span className="font-medium">{item.quantity}</span>
        </TableCell>

        {/* Original Price */}
        <TableCell className="text-center">
          <div className="flex flex-col items-center">
            <span className="font-medium">${item.price.toFixed(2)}</span>
            <span className="text-xs text-slate-500">per item</span>
          </div>
        </TableCell>

        {/* Savings */}
        <TableCell className="text-center">
          {item.product.isFlashSale && item.product.flashSalePrice ? (
            <div className="flex flex-col items-center">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 text-xs"
              >
                Flash Sale
              </Badge>
              <span className="text-xs text-green-600 mt-1">
                Save ${item.product.flashSalePrice.toFixed(2)}
              </span>
            </div>
          ) : item.product.discount > 0 ? (
            <div className="flex flex-col items-center">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 text-xs"
              >
                {item.product.discount}% OFF
              </Badge>
              <span className="text-xs text-green-600 mt-1">
                Save $
                {((item.product.price * item.product.discount) / 100).toFixed(
                  2
                )}
              </span>
            </div>
          ) : (
            <span className="text-slate-400 text-sm">-</span>
          )}
        </TableCell>

        {/* Total */}
        <TableCell className="text-right font-sans">
          <div className="flex flex-col items-end">
            <span className="font-semibold text-base">
              {item.product.isFlashSale && item.product.flashSalePrice
                ? `$${(
                    (item.product.price - item.product.flashSalePrice) *
                    item.quantity
                  ).toFixed(2)}`
                : item.product.discount > 0
                ? `$${(
                    (item.product.price -
                      (item.product.price * item.product.discount) / 100) *
                    item.quantity
                  ).toFixed(2)}`
                : `$${(item.product.price * item.quantity).toFixed(2)}`}
            </span>
            {(item.product.isFlashSale && item.product.flashSalePrice) ||
            item.product.discount > 0 ? (
              <span className="text-xs text-slate-500 line-through">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            ) : null}
          </div>
        </TableCell>

        {/* Actions Column - Write Review Button */}
        <TableCell className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsReviewOpen(true)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
          >
            Write a Review
          </Button>
        </TableCell>
      </TableRow>

      {/* Review Dialog for this specific product */}
      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        productId={item.product.id}
        productName={item.product.name}
        // productImage={item.product.imageUrl}
        // shopName={order.shop?.name}
      />
    </>
  );
};

export default CustomerOrderProductsTable;
