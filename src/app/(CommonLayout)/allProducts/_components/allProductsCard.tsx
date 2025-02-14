import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Eye, GitCompare } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StarDisplay from "@/components/shared/starRating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAddToCart, handleReplaceCart } from "@/lib/addCartUtils";
import VendorConflictModal from "@/components/shared/vendorConflictModal";
import { useState } from "react";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

interface AllProductsCardProps {
  product: Product;
  index: number;
  isFollowed: boolean;
}

export const AllProductsCard = ({
  product,
  index,
}: // isFollowed,
AllProductsCardProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

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
      if (
        (error.message === "Cart contains products from a different vendor.",
        {
          className: "text-red-600",
        })
      ) {
        setModalOpen(true);
      }
    }
  };

  const handleReplaceCartClick = () => {
    handleReplaceCart(dispatch, { product, quantity: 1 });
    setModalOpen(false);
  };

  const calculateDiscountPercentage = () => {
    if (product?.flashSalePrice) {
      return (
        ((product?.price - product?.flashSalePrice) / product?.price) * 100
      );
    }
    return product?.discount;
  };
  console.log(product?.shop?.name);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="group relative overflow-hidden h-[350px] bg-gray-100/50">
          {/* Conditional Discount Badge */}
          {calculateDiscountPercentage() > 0 && (
            <div className="absolute -right-12 top-6 z-10 rotate-45">
              <div className="bg-red-500 text-white px-12 py-1 text-sm font-normal shadow-lg">
                {Math.round(calculateDiscountPercentage())}% OFF
              </div>
            </div>
          )}

          <CardContent className="p-0">
            <div className="relative">
              {/* Flash Sale Badge */}
              {/* {product?.isFlashSale && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 z-10 animate-pulse bg-red-500"
                >
                  <Flame className="w-4 h-4 mr-1" />
                  Flash Sale
                </Badge>
              )} */}

              {/* Image Container */}
              <div className="relative h-44 w-full mb-4 overflow-hidden rounded-t-md">
                <Link href={`/products/${product?.id}`}>
                  <Image
                    src={product?.imageUrl as string}
                    alt={product?.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Eye Icon Overlay */}
                  <div className="absolute text-cream text-base inset-0 bg-deep-brown/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div className="pb-2 px-2">
                {/* <div className="flex items-center justify-between">
                  <Badge className="text-[10px] bg-warm-brown/10 text-warm-brown hover:border-deep-brown/80 hover:bg-transparent hover:text-deep-brown hover:underline">
                    {!isFollowed ? (
                      <Link href={`/shop/${product?.shop?.id}`}>
                        {product?.shop?.name}
                      </Link>
                    ) : (
                      <>
                        <Link href={`/shops/${product?.shop?.id}`}>
                          {product?.shop?.name}
                        </Link>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    <Timer className="w-3 h-3 mr-1" />
                    Limited Time
                  </Badge>
                </div> */}

                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product?.name}
                  </h3>
                  <div className="flex items-center justify-between   h-8">
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {product?.category?.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <StarDisplay rating={product?.rating} />
                      </div>
                      <p className="text-sm font-medium text-yellow-500 rounded-md pt-0.5">
                        {product?.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between   ">
                  <div className="space-y-1">
                    {product?.isFlashSale ? (
                      <>
                        <span className="text-lg font-bold text-red-500">
                          ${product?.flashSalePrice?.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through ps-1">
                          ${product?.price.toFixed(2)}
                        </span>
                      </>
                    ) : product?.discount > 0 ? (
                      <>
                        <span className="text-lg font-bold text-red-500">
                          $
                          {(
                            product?.price *
                            (1 - product?.discount / 100)
                          ).toFixed(2)}
                        </span>
                        <span className="text-xs ps-1 text-muted-foreground line-through">
                          ${product?.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-red-500">
                        ${product?.price.toFixed(2)}
                      </span>
                    )}

                    {product?.stock < 10 && (
                      <p className="text-[10px] text-red-500 font-medium">
                        Only {product?.stock} left!
                      </p>
                    )}
                  </div>

                  <div
                    onClick={handleCompare}
                    className={`cursor-pointer shadow-md border-none bg-transparent flex items-center justify-center rounded-none p-1 ${
                      isCompared ? "text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                    title={
                      isCompared ? "Remove from Compare" : "Add to Compare"
                    } // Optional tooltip
                  >
                    <GitCompare
                      className={`h-4 w-4 ${
                        isCompared ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full rounded-none bg-warm-brown hover:bg-deep-brown text-cream"
              onClick={handleAddToCartClick}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
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
