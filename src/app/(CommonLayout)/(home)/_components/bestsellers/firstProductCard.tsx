import Image from "next/image";
import { Eye, GitCompare, ShoppingBag } from "lucide-react";
import StarDisplay from "@/components/shared/starRating";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// import { useState } from "react";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";
import { toast } from "sonner";
// import VendorConflictModal from "@/components/shared/vendorConflictModal";
// import { handleAddToCart, handleReplaceCart } from "@/lib/addCartUtils";
import { handleAddToCart } from "@/lib/addCartUtils";
import { Product } from "@/types";

const FirstCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const { products: comparedProducts } = useAppSelector(
    (state) => state.compare,
  );
  // const [isModalOpen, setModalOpen] = useState(false);

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
        //   setModalOpen(true);
      }
    }
  };

  // const handleReplaceCartClick = () => {
  //   handleReplaceCart(dispatch, { product, quantity: 1 });
  //   setModalOpen(false);
  // };

  return (
    // <div className="  rounded-none flex flex-col items-center  col-span-2 h-[500px]">
    //   {/* Image Container with Icons */}
    //   <div className="relative group w-full">
    //     <Image
    //       src={product.imageUrl as string}
    //       alt={product.name}
    //       width={300}
    //       height={300}
    //       className="w-full h-[412px] object-cover"
    //     />

    <div className="rounded-none flex flex-col items-center col-span-2 h-[320px]  md:h-[500px] ">
      {/* Image Container with Icons */}
      <div className="relative group w-full">
        <Image
          src={product.imageUrl as string}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-[220px]  md:h-[412px] object-cover"
        />
        {/* Icons (Appear on Hover) */}
        <div className="absolute top-8 right-8 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Eye Icon */}
          <Link
            href={`/products/${product?.id}`}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <Eye className="h-5 w-5 text-deep-brown/80" />
          </Link>
          {/* Cart Icon */}
          <button
            onClick={() => handleAddToCartClick()}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <ShoppingBag className="h-5 w-5 text-deep-brown/80" />
          </button>
          {/* Compare Icon */}
          <button
            onClick={() => handleCompare(product)}
            className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <GitCompare className="h-5 w-5 text-deep-brown/80" />
          </button>
        </div>
      </div>

      <div className=" w-full flex justify-center flex-col items-center bg-muted   px-4 py-1">
        <div className="flex flex-row justify-between w-full  ">
          <p className="text-sm font-normal tracking-tight text-gray-500">
            {product?.category?.name}
          </p>
          <p className="text-sm font-normal tracking-tight text-gray-700 flex flex-row">
            <StarDisplay rating={product?.rating} /> (
            {product?.rating?.toFixed(1)})
          </p>
        </div>
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-center tracking-tight  ">
          {product?.name}
        </h2>

        <div className="w-full mx-auto  text-center">
          {/* Price */}
          <p className=" text-red-800 text-2xl font-semibold font-sans   ">
            ${product?.price?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* <VendorConflictModal
        visible={isModalOpen}
        onClose={() => setModalOpen(false)}
        onReplace={handleReplaceCartClick}
        onCancel={() => setModalOpen(false)}
      /> */}
    </div>
  );
};

export default FirstCard;
