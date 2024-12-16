"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types";

const SkeletonCard = () => (
  <div className="h-80 relative bg-gray-200 animate-pulse rounded-md"></div>
);

const CategoriesSection = () => {
  // Fetch categories using RTK Query
  const { data, isLoading, error } = useGetCategoriesForAllQuery(undefined);

  const categories = data?.data;
  console.log(categories);
  // Handle error state
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load categories.</p>
    );

  return (
    <div className="flex md:flex-row flex-col w-full md:w-11/12 mx-auto h-auto mb-36 mt-8">
      {/* Left Panel with ALL CATEGORY */}
      <div className="md:w-1/4 w-full py-6 bg-warm-brown/10 flex items-center justify-center">
        <h3 className="transform md:-rotate-90 text-4xl font-bold text-deep-brown uppercase whitespace-nowrap">
          ALL CATEGORY
        </h3>
      </div>

      {/* Right Panel with Grid of Categories */}
      <div className="w-full md:w-3/4 px-0 py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : categories?.map((category: TCategory) => (
                <Link
                  key={category.id}
                  href={`/allProducts/${category.id}`}
                  className="group"
                >
                  <div className="h-80 relative rounded-none overflow-hidden shadow-lg group">
                    {/* Category Image */}
                    <Image
                      src={category.imageUrl || ""}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-125"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                    {/* Text Content */}
                    <div className="absolute bottom-4 left-4 text-cream">
                      <h3 className="text-3xl font-semibold">
                        {category.name}
                      </h3>
                      <p className="text-base opacity-80">
                        {category?.products?.length} products
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
