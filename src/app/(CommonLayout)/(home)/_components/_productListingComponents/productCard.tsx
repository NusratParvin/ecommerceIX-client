import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import Image from "next/image";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  isFollowed?: boolean;
  index: number;
}

export const ProductCard = ({
  product,
  isFollowed = false,
  index,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const calculateAverageRating = (reviews: Product["reviews"]) => {
    if (!reviews?.length) return 0;
    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    );
  };

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative group"
    >
      <Card className="hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col h-full rounded-md pb-6">
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl || "/default-image.jpg"}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              No image
            </div>
          )}

          {/* Flash Sale Badge */}
          {product.isFlashSale && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 animate-pulse pt-1"
            >
              Flash Sale
            </Badge>
          )}

          {/* Wishlist and Discount Icons */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            {/* Wishlist Icon */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Heart
                    className={`w-5 h-5 cursor-pointer ${
                      isWishlisted ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={handleWishlistToggle}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Discount Bookmark */}
            {product.discount > 0 && (
              <div className="relative">
                <Bookmark
                  className="w-16 h-16 text-deep-brown rounded-none"
                  fill="currentColor"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs  text-cream">
                  - {product.discount}%
                </span>
              </div>
            )}
          </div>

          {/* Following Badge */}
          {isFollowed && (
            <Badge className="absolute bottom-2 left-2 bg-deep-brown/80 backdrop-blur-2xl text-cream pt-1 font-medium ">
              {/* <Heart className="w-3 h-3 mr-1" fill="currentColor" /> */}
              Following
            </Badge>
          )}
        </div>

        {/* Product Information */}
        <CardContent className="p-4 flex-grow">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge className="text-xs bg-warm-brown/10 text-warm-brown hover:border-deep-brown/80 hover:bg-transparent hover:text-deep-brown hover:underline">
                {product.shop?.name}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium">
                  {calculateAverageRating(product.reviews)}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-base line-clamp-1 text-deep-brown">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {product?.category?.name}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                {product.discount > 0 ? (
                  <>
                    <p className="text-base font-bold">
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </p>
                    <p className="text-xs line-through text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-base font-bold">${product.price}</p>
                )}
              </div>
              {product.stock < 10 && (
                <Badge variant="secondary" className="text-xs">
                  {product.stock} left
                </Badge>
              )}
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
                  onClick={handleAddToCart}
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
  );
};
