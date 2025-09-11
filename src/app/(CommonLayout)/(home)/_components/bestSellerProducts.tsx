"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetBestSellerProductsQuery } from "@/redux/features/products/productsApi";
import Link from "next/link";
import RegularCard from "./bestsellers/regularProductCard";
import FirstCard from "./bestsellers/firstProductCard";
import { Product } from "@/types";

const BestSellerProducts = () => {
  const { data, isLoading, isError } = useGetBestSellerProductsQuery(undefined);
  const bestsellerProducts = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (isError || !bestsellerProducts) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">Failed to load bestseller products.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-11/12 mx-auto h-auto mb-12 px-4">
      <div className="flex flex-row justify-between items-center text-charcoal mb-1">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold text-left mb-0 tracking-tight text-deep-brown">
            Best Sellers
          </h1>
          <p className="font-medium text-xs tracking-tight pb-1 ps-1 uppercase text-charcoal/60">
            Enjoy the best quality products
          </p>
        </div>

        <Link
          href="/allProducts"
          className="text-base hover:underline text-gray-600 px-6 py-1.5 bg-muted/70 tracking-tighter"
        >
          Explore More
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {bestsellerProducts
          ?.slice(0, 9)
          .map((product: Product, index: number) =>
            index === 0 ? (
              <div key={product.id} className="col-span-2 row-span-2">
                <FirstCard product={product} />
              </div>
            ) : (
              <RegularCard key={product.id} product={product} />
            )
          )}
      </div>
    </div>
  );
};

export default BestSellerProducts;
