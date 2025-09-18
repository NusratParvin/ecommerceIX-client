"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetFlashSaleProductsQuery } from "@/redux/features/products/productsApi";
import NoDataFound from "@/components/ui/noDataFound";
import { Product } from "@/types";
import { useDebounce } from "../../(home)/_components/_productListingComponents/hooks/debounceHook";
import { FlashSaleCard } from "./flashCard";

type FiltersType = {
  search?: string;
  maxPrice?: number;
  category?: string;
  shop?: string;
};

const ITEMS_PER_PAGE = 3;

interface SaleProductListProps {
  filters: FiltersType;
}

const SaleProductList: React.FC<SaleProductListProps> = ({ filters }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView();

  const debouncedSearch = useDebounce(filters.search, 500);

  // Fetch products using the query with filters
  const { data: productsData, isFetching } = useGetFlashSaleProductsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    sortBy: "createdAt",
    sortOrder: "desc",
    maxPrice: filters.maxPrice,
    category: filters.category,
    shop: filters.shop,
    search: debouncedSearch,
  });

  // Update products on new API response
  useEffect(() => {
    if (productsData?.data) {
      setProducts((prev) => {
        // Replace on page 1, append otherwise
        if (page === 1) return productsData.data;
        const existingIds = new Set(prev.map((product: Product) => product.id));
        const newProducts = productsData.data.filter(
          (product: Product) => !existingIds.has(product.id)
        );
        return [...prev, ...newProducts];
      });
    }
  }, [productsData?.data, page]);

  // Infinite scroll logic
  useEffect(() => {
    if (inView && !isFetching && productsData?.meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, productsData?.meta?.hasNextPage]);

  // Reset on filters change
  useEffect(() => {
    // console.log("parent filter");
    setPage(1);
    // setProducts([]);
  }, [filters]);

  console.log(products);

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
        {/* Show skeleton while fetching on the first page */}
        {isFetching && page === 1 ? (
          <SaleProductGridSkeleton count={ITEMS_PER_PAGE} />
        ) : products.length > 0 ? (
          products.map((product: Product, index) => (
            <FlashSaleCard key={product.id} product={product} index={index} />
          ))
        ) : (
          !isFetching && <NoDataFound />
        )}
      </div>
      <div ref={ref} className="mt-8 flex justify-center">
        {isFetching && page > 1 && <SaleProductGridSkeleton count={4} />}
      </div>
    </div>
  );
};

const SaleProductGridSkeleton = ({ count = 8 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full h-[300px] bg-gray-200 rounded-md animate-pulse mx-1"
      />
    ))}
  </>
);

export default SaleProductList;
