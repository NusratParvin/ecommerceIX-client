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
      <div className="flex sm:flex-row flex-col justify-between  md:gap-5 gap-2 text-charcoal mb-1">
        <div className="flex flex-col items-start">
          <h2 className="text-left text-2xl md:text-3xl text-deep-brown tracking-tight font-semibold ">
            Best Sellers
          </h2>
          <p className="font-medium text-xs tracking-tight pb-1 ps-1 uppercase text-charcoal/60">
            Enjoy the best quality products
          </p>
        </div>

        <div className="flex items-center mt-0   ">
          <Link
            href="/allProducts"
            className="text-base hover:underline text-gray-600 px-6 py-1.5 bg-muted/70 tracking-tighter"
          >
            Explore More
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-4 lg:grid-cols-5 gap-2">
        {bestsellerProducts
          ?.slice(0, 9)
          .map((product: Product, index: number) =>
            index === 0 ? (
              <div key={product.id} className="sm:col-span-2 col-span-1 ">
                <FirstCard product={product} />
              </div>
            ) : (
              <RegularCard key={product.id} product={product} />
            ),
          )}
      </div>
    </div>
  );
};

export default BestSellerProducts;
