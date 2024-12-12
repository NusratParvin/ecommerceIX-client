"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product, TReview } from "@/types";
import { format } from "date-fns";
import Image from "next/image";

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDrawer = ({
  product,
  isOpen,
  onClose,
}: ProductDrawerProps) => {
  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-1/2 max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          {/* Product Image */}
          {product.imageUrl && (
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover rounded-md"
                width={500}
                height={500}
                layout="responsive"
                priority={true}
              />
            </div>
          )}

          {/* Product Details */}
          <div className="grid gap-4">
            {/* Name and Description */}
            <div>
              <h3 className="font-semibold text-sm">Name</h3>
              <p className="text-muted-foreground text-sm">{product.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Description</h3>
              <p className="text-muted-foreground text-sm">
                {product.description || "No description provided"}
              </p>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm">Price</h3>
                <p className="text-muted-foreground text-sm">
                  ${product.price}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Stock</h3>
                <p className="text-muted-foreground text-sm">{product.stock}</p>
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold text-sm">Category</h3>
              <p className="text-muted-foreground text-sm">
                {product.category?.name || "Uncategorized"}
              </p>
            </div>

            {/* Shop Details */}
            <div>
              <h3 className="font-semibold text-sm">Shop</h3>
              <div className="flex items-center space-x-2">
                {product?.shop?.logo && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={product.shop.logo}
                      alt={product.shop.name}
                      className="rounded-full"
                      width={40}
                      height={40}
                      objectFit="cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{product?.shop?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product?.shop?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Status and Timestamps */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm">Status</h3>
                <p
                  className={`text-xs font-medium ${
                    product.status === "ACTIVE"
                      ? "text-green-600"
                      : product.status === "HIDDEN"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {product.isDeleted ? "Deleted" : product.status}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Created At</h3>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(product.createdAt), "PPPpp")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Last Updated</h3>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(product.updatedAt), "PPPpp")}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h3 className="font-semibold text-sm">Orders</h3>
            <p className="text-sm text-muted-foreground">
              {product?.OrderItem?.length
                ? `${product.OrderItem.length} orders`
                : "No orders for this product."}
            </p>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="font-semibold text-sm">Reviews</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-4">
              {product?.reviews?.length ? (
                product?.reviews?.map((review: TReview) => (
                  <li key={review.id}>
                    <p className="font-medium">{review?.user?.name}:</p>
                    <p>{review.comment}</p>
                    <p>Rating: {review.rating}/5</p>
                  </li>
                ))
              ) : (
                <p>No reviews for this product.</p>
              )}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
