// "use client";
// import { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { ProductCard } from "./productCard";
// import { useGetProductsQuery } from "@/redux/features/products/productsApi";
// import { ProductFilters } from "./productFilters";
// import { useDebounce } from "./hooks/debounceHook";
// import NoDataFound from "@/components/ui/noDataFound";
// import { useGetFollowedShopsQuery } from "@/redux/features/shops/shopsApi";
// import { Product } from "@/types";

// const ITEMS_PER_PAGE = 8;

// const ProductGrid = () => {
//   const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({
//     minPrice: 0,
//     maxPrice: 1000,
//     category: null,
//     shop: null,
//     search: "",
//   });
//   const [products, setProducts] = useState([]);
//   // const { ref, inView } = useInView();
//   const { ref, inView } = useInView({ threshold: 0.1 });

//   // Debounced search value
//   const debouncedSearch = useDebounce(filters.search, 500);

//   const { data: userFollowedShops } = useGetFollowedShopsQuery(undefined);

//   const followedShopIds =
//     userFollowedShops?.data?.followedShops?.map(
//       (shop: { shopId: string }) => shop.shopId
//     ) || [];
//   // const isFollowed = followedShopIds.includes(product?.shop?.id);

//   // console.log(isFollowed);
//   // console.log(userFollowedShops);
//   const { data: productsData, isFetching } = useGetProductsQuery({
//     page,
//     limit: ITEMS_PER_PAGE,
//     sortBy: "createdAt",
//     sortOrder: "desc",
//     minPrice: filters.minPrice,
//     maxPrice: filters.maxPrice,
//     category: filters.category,
//     shop: filters.shop,
//     search: debouncedSearch,
//   });

//   console.log(userFollowedShops);

//   useEffect(() => {
//     if (productsData?.data) {
//       setProducts((prev) => {
//         if (page === 1) return productsData.data;

//         const existingIds = new Set(prev.map((product: Product) => product.id));
//         const newProducts = productsData.data.filter(
//           (product: Product) => !existingIds.has(product.id)
//         );
//         return [...prev, ...newProducts];
//       });
//     }
//   }, [productsData?.data, page]);

//   useEffect(() => {
//      if (inView && !isFetching && productsData?.meta?.hasNextPage) {
//       console.log("in view");
//       setPage((prev) => prev + 1);
//     }
//   }, [inView, isFetching, productsData?.meta?.hasNextPage]);

//   useEffect(() => {
//     console.log("Page changed:", page);
//   }, [page]);

//   useEffect(() => {
//     // console.log("Fetched products:", productsData);
//   }, [productsData]);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleFilterChange = (newFilters: any) => {
//     const processedFilters = {
//       ...newFilters,
//       category: newFilters.category === "null" ? null : newFilters.category,
//       shop: newFilters.shop === "null" ? null : newFilters.shop,
//     };
//     setPage(1);
//     setProducts([]);
//     setFilters(processedFilters);
//   };

//   return (
//     <div className="w-full md:w-11/12 mx-auto px-4 py-8">
//       {/* Filters Section */}
//       <div className="mb-8 space-y-4">
//         <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px]">
//         {isFetching && page === 1 ? (
//           <ProductGridSkeleton count={ITEMS_PER_PAGE} />
//         ) : products.length > 0 ? (
//           products.map((product: Product, index: number) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               isFollowed={followedShopIds.includes(product?.shop?.id)}
//               index={index}
//             />
//           ))
//         ) : (
//           <div className="w-full col-span-full flex justify-center items-center">
//             <NoDataFound />
//           </div>
//         )}
//       </div>

//       {/* Skeleton Loader for Infinite Scroll */}

//       <div ref={ref} className="mt-8 flex justify-center">
//         {isFetching && page > 1 && <ProductGridSkeleton count={4} />}
//       </div>
//     </div>
//   );
// };

// const ProductGridSkeleton = ({ count = 8 }) => (
//   <>
//     {Array.from({ length: count }).map((_, i) => (
//       <div
//         key={i}
//         className="w-full h-[300px] bg-gray-200 rounded-md animate-pulse mx-1"
//       />
//     ))}
//   </>
// );

// export default ProductGrid;

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
  const [products, setProducts] = useState<Product[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Debounced search value
  const debouncedSearch = useDebounce(filters.search, 500);

  // Fetch followed shops
  const { data: userFollowedShops } = useGetFollowedShopsQuery(undefined);
  const followedShopIds =
    userFollowedShops?.data?.followedShops?.map(
      (shop: { shopId: string }) => shop.shopId
    ) || [];

  // Fetch products
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

  // Prioritize products from followed shops
  const prioritizeProducts = (allProducts: Product[]) => {
    const followedProducts = allProducts.filter((product) =>
      followedShopIds.includes(product.shop.id)
    );
    const otherProducts = allProducts.filter(
      (product) => !followedShopIds.includes(product.shop.id)
    );
    return [...followedProducts, ...otherProducts];
  };

  useEffect(() => {
    if (productsData?.data) {
      setProducts((prev) => {
        const newProducts = prioritizeProducts(productsData.data);

        // Avoid unnecessary updates if the data is the same
        const existingIds = new Set(prev.map((product: Product) => product.id));
        const filteredNewProducts = newProducts.filter(
          (product: Product) => !existingIds.has(product.id)
        );

        if (filteredNewProducts.length === 0) {
          return prev; // Return the current state if no new products are added
        }

        return page === 1 ? newProducts : [...prev, ...filteredNewProducts];
      });
    }
  }, [productsData?.data, page, followedShopIds]);

  useEffect(() => {
    if (inView && !isFetching && productsData?.meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, productsData?.meta?.hasNextPage]);

  const handleFilterChange = (newFilters: any) => {
    const processedFilters = {
      ...newFilters,
      category: newFilters.category === "null" ? null : newFilters.category,
      shop: newFilters.shop === "null" ? null : newFilters.shop,
    };
    setPage(1);
    setProducts([]);
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
