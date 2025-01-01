"use client";
import { useGetAllShopsForAllQuery } from "@/redux/features/shops/shopsApi";
import { Spinner } from "@/components/ui/spinner"; // Import a Spinner component
import ShopCard from "./_components/shopCard";
import { TShop } from "@/types";

export default function ShopsPage() {
  const { data, isLoading, isError } = useGetAllShopsForAllQuery(undefined);

  // Placeholder when no shops are found
  const shops = data?.data || [];

  console.log(shops);

  return (
    <>
      <div className="h-24 bg-deep-brown"></div>

      <div className="bg-gray-50 min-h-screen w-full md:w-11/12 mx-auto px-8">
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">All Shops</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
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
