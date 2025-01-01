import Image from "next/image";
import { Eye, GitCompare, ShoppingCart } from "lucide-react";
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

const RegularCard = ({ product }: { product: Product }) => {
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
    // <div className="border rounded-none p-2 flex flex-col items-center relative group">
    //   {/* Image with Hover Icons */}
    //   <div className="relative w-full">
    //     <Image
    //       src={product.imageUrl as string}
    //       alt={product.name}
    //       width={160}
    //       height={160}
    //       className="w-full object-cover h-36" // Adjusted height for a compact image
    //     />
    //     {/* Icons on Hover */}
    //     <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //       {/* Eye Icon */}
    //       <Link
    //         href={`/products/${product?.id}`}
    //         className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
    //       >
    //         <Eye className="h-4 w-4 text-warm-brown" />
    //       </Link>
    //       {/* Cart Icon */}
    //       <button
    //         onClick={() => handleAddToCartClick()}
    //         className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
    //       >
    //         <ShoppingCart className="h-4 w-4 text-warm-brown" />
    //       </button>
    //       {/* Compare Icon */}
    //       <button
    //         onClick={() => handleCompare(product)}
    //         className="p-2 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
    //       >
    //         <GitCompare className="h-4 w-4 text-warm-brown" />
    //       </button>
    //     </div>
    //   </div>

    //   <div className="border-t w-full py-2 flex flex-col items-center">
    //     {/* Product Info */}
    //     <h2 className="text-sm font-semibold text-center mb-1">
    //       {product.name}
    //     </h2>
    //     <p className="text-green-600 text-center font-bold text-base">
    //       ${product.price.toFixed(2)}
    //     </p>
    //   </div>
    //   {/* Vendor Conflict Modal */}
    //   <VendorConflictModal
    //     visible={isModalOpen}
    //     onClose={() => setModalOpen(false)}
    //     onReplace={handleReplaceCartClick}
    //     onCancel={() => setModalOpen(false)}
    //   />
    // </div>

    <div className="border rounded-none p-2 flex flex-col items-center relative group ">
      {/* Image with Hover Icons */}
      <div className="relative w-full h-40">
        <Image
          src={product.imageUrl as string}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-sm"
        />
        {/* Icons on Hover */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/products/${product?.id}`}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <Eye className="h-3 w-3 text-warm-brown" />
          </Link>
          <button
            onClick={() => handleAddToCartClick()}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <ShoppingCart className="h-3 w-3 text-warm-brown" />
          </button>
          <button
            onClick={() => handleCompare(product)}
            className="p-1.5 bg-gray-100 shadow-lg rounded-full hover:bg-gray-50"
          >
            <GitCompare className="h-3 w-3 text-warm-brown" />
          </button>
        </div>
      </div>

      <div className="w-full py-2 flex flex-col items-center justify-between flex-grow">
        <h2 className="text-xs font-semibold text-center mb-1 line-clamp-2">
          {product.name}
        </h2>
        <p className="text-green-600 text-center font-bold text-sm">
          ${product.price.toFixed(2)}
        </p>
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

export default RegularCard;
