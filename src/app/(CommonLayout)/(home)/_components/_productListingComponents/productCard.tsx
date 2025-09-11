import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Eye, GitCompare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
// import StarDisplay from "@/components/shared/starRating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAddToCart, handleReplaceCart } from "@/lib/addCartUtils";
import { useState } from "react";
import VendorConflictModal from "@/components/shared/vendorConflictModal";
import { RootState } from "@/redux/store";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";
import { toast } from "sonner";
import StarDisplay from "@/components/shared/starRating";

// import { useState } from "react";

interface ProductCardProps {
  product: Product;
  isFollowed?: boolean;
  index: number;
  shop?: { id: string; name: string };
}

export const ProductCard = ({
  product,
  // isFollowed = true,
  index,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  // console.log(product?.shop.id, "grid");

  const { products } = useAppSelector((state: RootState) => state.compare);
  const isCompared = products.some((p) => p.id === product.id);

  const handleCompare = () => {
    if (isCompared) {
      dispatch(removeFromCompare(product.id));
    } else {
      if (products.length >= 3) {
        toast.error("You can compare up to 3 products only.");
      } else {
        dispatch(addToCompare(product));
        toast.success(`${product.name} added to comparison.`);
      }
    }
  };

  const handleAddToCartClick = async () => {
    try {
      await handleAddToCart(dispatch, { product, quantity: 1 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === "Cart contains products from a different vendor.") {
        setModalOpen(true);
      }
    }
  };

  const handleReplaceCartClick = () => {
    handleReplaceCart(dispatch, { product, quantity: 1 });
    setModalOpen(false);
  };
  // console.log(isFollowed);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative group"
      >
        <Card className="hover:shadow-2xl shadow-none transition-transform duration-300 overflow-hidden flex flex-col h-full rounded-none border-none tracking-tight pb-6 bg-gray-100">
          {/* Image Section */}
          <div className="relative h-40 w-full overflow-hidden">
            {product?.imageUrl ? (
              <Image
                src={product?.imageUrl as string}
                alt={product?.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                No image
              </div>
            )}

            {/* Overlay on Hover */}
            <Link
              href={`/products/${product?.id}`}
              className="absolute inset-0 bg-deep-brown/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            >
              <Eye className="w-8 h-8 text-cream" />
            </Link>

            {/* Flash Sale Badge */}
            {product?.isFlashSale && (
              <Badge
                variant="destructive"
                className="absolute top-2 left-2 animate-pulse pt-1"
              >
                Flash Sale
              </Badge>
            )}

            {/* Discount and Wishlist Icons */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
              {/* Discount   */}
              {product?.discount > 0 && (
                <div className="relative">
                  <Bookmark
                    className="w-16 h-10 text-red-600 rounded-none"
                    fill="currentColor"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-cream">
                    {product?.discount}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <CardContent className="px-2 py-3 flex-grow">
            <div>
              <div>
                <div className="flex flex-row justify-between w-full">
                  <p className="text-sm font-normal tracking-tight text-gray-500">
                    {product?.category?.name}
                  </p>
                  <p className="text-xs font-normal tracking-tight text-gray-700 flex flex-row">
                    <StarDisplay rating={product?.rating} /> (
                    {product?.rating?.toFixed(1)})
                  </p>
                </div>
                <h3 className="font-medium text-base text-gray-800 ">
                  {product?.name}
                </h3>
              </div>
              <div className="flex flex-row justify-between items-end text-red-700/80">
                <div className="flex flex-row items-center gap-2">
                  {product?.isFlashSale ? (
                    <>
                      <p className="text-base font-sans font-semibold">
                        <span>$ </span>
                        {product?.flashSalePrice?.toFixed(2)}
                      </p>
                      <p className="text-sm line-through text-gray-600  font-sans">
                        <span>$ </span>
                        {product?.price.toFixed(2)}
                      </p>
                    </>
                  ) : product?.discount > 0 ? (
                    <>
                      <p className="text-base font-sans font-semibold">
                        <span>$ </span>
                        {(
                          product?.price *
                          (1 - product?.discount / 100)
                        ).toFixed(2)}
                      </p>
                      <p className="text-sm line-through text-gray-600 font-sans ">
                        <span>$ </span>
                        {product?.price.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-base font-sans font-semibold">
                      <span>$ </span>
                      {product?.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-end">
                  <Button
                    variant="ghost"
                    onClick={handleCompare}
                    className={`shadow-md border-none bg-white size-6 ${
                      isCompared
                        ? " text-deep-brown"
                        : "bg-gray-100 text-gray-600 "
                    }`}
                  >
                    <GitCompare
                      className={`h-5 w-5 ${
                        isCompared ? "text-deep-brown" : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 ">
            {/* <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-transform duration-300 bg-white"> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full bg-deep-brown hover:bg-gray-600 text-cream rounded-none flex items-start justify-center gap-2 py-2 font-bold"
                    onClick={handleAddToCartClick}
                  >
                    <ShoppingBag className="w-8 h-8" />
                    BUY
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </motion.div>
      <VendorConflictModal
        visible={isModalOpen}
        onClose={() => setModalOpen(false)}
        onReplace={handleReplaceCartClick}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};
