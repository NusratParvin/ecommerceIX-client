import Image from "next/image";
import { Eye, GitCompare, ShoppingCart } from "lucide-react"; // Add Compare Icon
import StarDisplay from "@/components/shared/starRating";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useState } from "react";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";
import { toast } from "sonner";
import VendorConflictModal from "@/components/shared/vendorConflictModal";
import { handleAddToCart, handleReplaceCart } from "@/lib/addCartUtils";
import { Product } from "@/types";

const FirstCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const { products: comparedProducts } = useAppSelector(
    (state) => state.compare
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCompare = (product: Product) => {
    const isCompared = comparedProducts.some((p) => p.id === product.id);

    if (isCompared) {
      dispatch(removeFromCompare(product.id));
      toast.success(`${product.name} removed from comparison.`);
    } else {
      if (comparedProducts.length >= 3) {
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

  return (
    <div className="border border-gray-200 rounded-none flex flex-col items-center  col-span-2 h-[500px]">
      {/* Image Container with Icons */}
      <div className="relative group w-full">
        <Image
          src={product.imageUrl as string}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-[400px] object-cover p-4"
        />
        {/* Icons (Appear on Hover) */}
        <div className="absolute top-8 right-8 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Eye Icon */}
          <Link
            href={`/products/${product?.id}`}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <Eye className="h-5 w-5 text-warm-brown" />
          </Link>
          {/* Cart Icon */}
          <button
            onClick={() => handleAddToCartClick()}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <ShoppingCart className="h-5 w-5 text-warm-brown" />
          </button>
          {/* Compare Icon */}
          <button
            onClick={() => handleCompare(product)}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <GitCompare className="h-5 w-5 text-warm-brown" />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 w-full flex justify-center flex-col items-center py-4">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-center mb-2">
          {product.name}
        </h2>

        <div className="flex flex-row justify-between w-3/4 mx-auto items-center py-2">
          {/* Rating and Review */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <StarDisplay rating={product.rating || 0} />
              <p className="text-sm text-gray-500 ml-2">
                ({product.rating || 0})
              </p>
            </div>
          </div>
          {/* Price */}
          <p className="text-green-600 font-bold text-xl">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <VendorConflictModal
        visible={isModalOpen}
        onClose={() => setModalOpen(false)}
        onReplace={handleReplaceCartClick}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default FirstCard;
