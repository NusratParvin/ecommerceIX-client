"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "./productCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { ProductFilters } from "./productFilters";
import { useDebounce } from "./hooks/debounceHook";
import NoDataFound from "@/components/ui/noDataFound";
import { useGetFollowedShopsQuery } from "@/redux/features/shops/shopsApi";
import { Product } from "@/types";

const ITEMS_PER_PAGE = 8;

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    category: null,
    shop: null,
    search: "",
  });
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView();

  // Debounced search value
  const debouncedSearch = useDebounce(filters.search, 500);

  const { data: userFollowedShops } = useGetFollowedShopsQuery(undefined);
  const followedShopIds =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userFollowedShops?.data?.followedShops?.map((shop: any) => shop.id) || [];
  console.log(userFollowedShops);
  // Query products with dynamic filters
  const { data: productsData, isFetching } = useGetProductsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    sortBy: "createdAt",
    sortOrder: "desc",
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    category: filters.category,
    shop: filters.shop,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (productsData?.data) {
      setProducts((prev) => {
        // Reset products when page is 1
        if (page === 1) return productsData.data;

        // Avoid duplicate products when appending
        const existingIds = new Set(prev.map((product: Product) => product.id));
        const newProducts = productsData.data.filter(
          (product: Product) => !existingIds.has(product.id)
        );
        return [...prev, ...newProducts];
      });
    }
  }, [productsData?.data, page]);

  useEffect(() => {
    // Trigger the next page fetch when in view
    if (inView && !isFetching && productsData?.meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, productsData?.meta?.hasNextPage]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (newFilters: any) => {
    const processedFilters = {
      ...newFilters,
      category: newFilters.category === "null" ? null : newFilters.category,
      shop: newFilters.shop === "null" ? null : newFilters.shop,
    };
    setPage(1);
    setProducts([]); // Clear current products
    setFilters(processedFilters);
  };

  return (
    <div className="w-full md:w-11/12 mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px]">
        {isFetching && page === 1 ? (
          <ProductGridSkeleton count={ITEMS_PER_PAGE} />
        ) : products.length > 0 ? (
          products.map((product: Product, index: number) => (
            <ProductCard
              key={product.id}
              product={product}
              isFollowed={followedShopIds.includes(product?.shop?.id)}
              index={index}
            />
          ))
        ) : (
          <div className="w-full col-span-full flex justify-center items-center">
            <NoDataFound />
          </div>
        )}
      </div>

      {/* Skeleton Loader for Infinite Scroll */}
      <div ref={ref} className="mt-8 flex justify-center">
        {isFetching && page > 1 && <ProductGridSkeleton count={4} />}
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 8 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full h-[300px] bg-gray-200 rounded-md animate-pulse mx-1"
      />
    ))}
  </>
);

export default ProductGrid;
