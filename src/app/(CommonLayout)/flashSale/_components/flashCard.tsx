import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer, ShoppingCart, Flame, Eye, GitCompare } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { handleAddToCart, handleReplaceCart } from "@/lib/addCartUtils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import VendorConflictModal from "@/components/shared/vendorConflictModal";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";

interface FlashSaleCardProps {
  product: Product;
  index: number;
}

export const FlashSaleCard = ({ product, index }: FlashSaleCardProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const { products } = useAppSelector((state: RootState) => state.compare);
  const isCompared = products.some((p) => p.id === product.id);
  console.log(product);
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

  const calculateDiscount = () => {
    if (product.flashSalePrice) {
      return Math.round(
        ((product.price - product.flashSalePrice) / product.price) * 100
      );
    }
    return product.discount || 0;
  };

  function getTimeLeft(endDateString: string | undefined): string {
    if (!endDateString) return "0d 0h";

    const endDate = new Date(endDateString);
    const now = new Date();
    const timeLeft = endDate.getTime() - now.getTime();

    if (timeLeft <= 0) return "0d 0h";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

    return `${days}d ${hours}h`;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="group relative overflow-hidden h-[420px] bg-gray-100/50">
          {/* Discount Badge */}
          <div className="absolute -right-12 top-6 z-10 rotate-45">
            <div className="bg-red-500 text-white px-12 py-1 text-sm font-normal shadow-lg">
              {calculateDiscount()}% OFF
            </div>
          </div>

          <CardContent className="p-0">
            <div className="relative">
              {/* Flash Sale Badge */}
              <Badge
                variant="destructive"
                className="absolute top-2 left-2 z-10 animate-pulse bg-red-500"
              >
                <Flame className="w-4 h-4 mr-1" />
                Flash Sale
              </Badge>

              {/* Image Container */}
              <div className="relative h-52 w-full mb-4 overflow-hidden rounded-t-md">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.imageUrl as string}
                    alt={product.name}
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
              <div className="space-y-1 px-2 tracking-tight">
                <div className="flex items-center justify-between ">
                  <Badge
                    variant="outline"
                    className="text-xs bg-red-500/10 text-red-600 border-red-500/20 font-medium"
                  >
                    {product.shop?.name}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs font-sans text-red-600 border-red-500/20 animate-pulse"
                  >
                    <Timer className="w-3 h-3 mr-1 " />
                    {getTimeLeft(product?.flashSaleEndDate?.toLocaleString())}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category?.name}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between  ">
                  <div className="space-y-1 font-sans ">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-red-500">
                        ${product.flashSalePrice?.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    {product.stock < 10 && (
                      <p className="text-sm text-red-500 font-medium">
                        Only {product.stock} left!
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleCompare}
                    className={`   shadow-md border-none bg-white ${
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
