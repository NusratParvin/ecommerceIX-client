import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bookmark, Eye, GitCompare } from "lucide-react";
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
        <Card className="hover:shadow-2xl shadow-none transition-transform duration-300 overflow-hidden flex flex-col h-full rounded-none border-none pb-6 bg-muted/50">
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
              className="absolute inset-0 bg-deep-brown/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
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
              {/* Discount Bookmark */}
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
          <CardContent className="p-4 flex-grow">
            <div className="space-y-0">
              <div className="space-y-1">
                <h3 className="font-medium text-base line-clamp-1 text-deep-brown">
                  {product?.name}
                </h3>
                {/* <p className="text-xs text-muted-foreground line-clamp-1">
                  {product?.category?.name}
                </p> */}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  {/* shop name */}
                  {/* <Badge className="text-xs bg-warm-brown/10 text-warm-brown hover:border-deep-brown/80 hover:bg-transparent hover:text-deep-brown hover:underline">
                    {!isFollowed ? (
                      <Link href={`/shop/${product?.shop?.id}`}>
                        {product?.shop?.name}
                      </Link>
                    ) : (
                      <>
                        <Link href={`/shop/${product?.shop?.id}`}>
                          {product?.shop?.name}
                        </Link>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </>
                    )}
                  </Badge> */}
                  {/* //rating */}
                  {/* <div className="flex items-center gap-1 text-yellow-500">
                  <div className="flex">
                    <StarDisplay rating={product?.rating} />
                  </div>
                  <Badge className="text-xs font-medium bg-yellow-500 px-2 text-cream rounded-md">
                    {product?.rating}
                  </Badge>
                </div> */}
                </div>
              </div>
              <div className="flex justify-between items-end  ">
                <div>
                  {product?.isFlashSale ? (
                    <>
                      <p className="text-base font-bold">
                        ${product?.flashSalePrice?.toFixed(2)}
                      </p>
                      <p className="text-xs line-through text-muted-foreground">
                        ${product?.price.toFixed(2)}
                      </p>
                    </>
                  ) : product?.discount > 0 ? (
                    <>
                      <p className="text-base font-bold">
                        $
                        {(
                          product?.price *
                          (1 - product?.discount / 100)
                        ).toFixed(2)}
                      </p>
                      <p className="text-xs line-through text-muted-foreground">
                        ${product?.price.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-base font-bold">
                      ${product?.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-end">
                  {/* {product?.stock < 10 && (
                    <Badge variant="secondary" className="text-xs">
                      {product?.stock} left
                    </Badge>
                  )} */}

                  <Button
                    variant="ghost"
                    onClick={handleCompare}
                    className={`mt-2  shadow-md border-none bg-white ${
                      isCompared
                        ? " text-blue-600 "
                        : "bg-gray-100 text-gray-600 "
                    }`}
                  >
                    <GitCompare
                      className={`h-5 w-5 ${
                        isCompared ? "text-blue-600" : "text-gray-600"
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
                    className="w-full bg-deep-brown hover:bg-warm-brown text-cream rounded-none"
                    onClick={handleAddToCartClick}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
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
