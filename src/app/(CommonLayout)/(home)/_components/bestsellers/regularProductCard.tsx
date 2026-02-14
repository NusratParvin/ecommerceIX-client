import Image from "next/image";
import { Eye, GitCompare, ShoppingCart } from "lucide-react";
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
import StarDisplay from "@/components/shared/starRating";

const RegularCard = ({ product }: { product: Product }) => {
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
        // setModalOpen(true);
      }
    }
  };

  // const handleReplaceCartClick = () => {
  //   handleReplaceCart(dispatch, { product, quantity: 1 });
  //   setModalOpen(false);
  // };

  return (
    <div className="bg-muted rounded-none flex flex-col items-center relative group ">
      {/* Image with Hover Icons */}
      <div className="relative w-full h-40">
        <Image
          src={product.imageUrl as string}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-none"
        />
        {/* Icons on Hover */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/products/${product?.id}`}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 text-deep-brown" />
          </Link>
          <button
            onClick={() => handleAddToCartClick()}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <ShoppingCart className="h-4 w-4 text-deep-brown" />
          </button>
          <button
            onClick={() => handleCompare(product)}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <GitCompare className="h-4 w-4 text-deep-brown" />
          </button>
        </div>
      </div>

      <div className="w-full py-2 flex flex-col items-start px-2 justify-between flex-grow">
        <div className="flex flex-row justify-between w-full">
          <p className="text-sm font-normal tracking-tight text-gray-500">
            {product?.category?.name}
          </p>
          <p className="text-sm font-normal tracking-tight text-gray-700 flex flex-row">
            <StarDisplay rating={product?.rating} /> (
            {product?.rating?.toFixed(1)})
          </p>
        </div>
        <h2 className="text-base font-medium text-left tracking-tight">
          {product?.name}
        </h2>
        <p className="text-red-800 text-center font-semibold text-sm font-sans">
          $ {product?.price?.toFixed(2)}k
        </p>
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

export default RegularCard;
