"use client";
import { useGetAllShopsForAllQuery } from "@/redux/features/shops/shopsApi";
import ShopCard from "./_components/shopCard";
import { TShop } from "@/types";
import Link from "next/link";
import { House } from "lucide-react";
import ShopSkeletonCard from "./_components/shopSkeleton";

export default function ShopsPage() {
  const { data, isLoading, isError } = useGetAllShopsForAllQuery(undefined);

  //  when no shops are found
  const shops = data?.data || [];

  // console.log(shops);

  return (
    <>
      <div className="h-16" />
      <div>
        <div className="flex flex-col items-center justify-center py-10 bg-slate-800/80 text-white">
          <h1 className="text-4xl font-medium">Shops</h1>
          <nav className="mt-4 text-lg">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex items-start gap-1"
                >
                  <House size={16} className="mt-1" />
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <span className="font-medium">Shops</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="bg-slate-100 min-h-screen w-full md:w-11/12 mx-auto px-8">
        <div className="max-w-7xl mx-auto py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <ShopSkeletonCard key={id} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-red-600 text-center">
              Failed to load shops. Please try again later.
            </div>
          ) : shops.length === 0 ? (
            <div className="text-center text-gray-600">No shops found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {shops?.map((shop: TShop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
