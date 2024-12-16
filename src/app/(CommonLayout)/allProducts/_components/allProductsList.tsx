// "use client";

// import { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { useGetProductsQuery } from "@/redux/features/products/productsApi";
// import NoDataFound from "@/components/ui/noDataFound";
// import { useDebounce } from "../../(home)/_components/_productListingComponents/hooks/debounceHook";
// import { Product } from "@/types";
// import { AllProductsCard } from "./allProductsCard";
// import { useGetFollowedShopsQuery } from "@/redux/features/shops/shopsApi";

// type FiltersType = {
//   search?: string;
//   maxPrice?: number;
//   rating?: number;
//   category?: string;
//   shop?: string;
// };

// const ITEMS_PER_PAGE = 6;

// interface AllProductsListProps {
//   filters: FiltersType;
//   selectedCategoryId?: string;
// }

// const AllProductsList: React.FC<AllProductsListProps> = ({
//   filters,
//   selectedCategoryId,
// }) => {
//   const [page, setPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const { ref, inView } = useInView();

//   const debouncedSearch = useDebounce(filters.search, 500);

//   const { data: productsData, isFetching } = useGetProductsQuery({
//     page,
//     limit: ITEMS_PER_PAGE,
//     sortBy: "createdAt",
//     sortOrder: "desc",
//     maxPrice: filters.maxPrice,
//     rating: filters.rating,
//     category: filters.category,
//     shop: filters.shop,
//     search: debouncedSearch,
//   });
//   // console.log(object);

//   // useEffect(() => {
//   //   filters.category = selectedCategoryId;
//   // }, [filters, selectedCategoryId]);

//   const { data: userFollowedShops } = useGetFollowedShopsQuery(undefined);
//   const followedShopIds =
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     userFollowedShops?.data?.followedShops?.map((shop: any) => shop.id) || [];
//   // console.log(userFollowedShops);

//   // Update products on new API response
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

//   // Infinite scroll logic
//   useEffect(() => {
//     if (inView && !isFetching && productsData?.meta?.hasNextPage) {
//       setPage((prev) => prev + 1);
//     }
//   }, [inView, isFetching, productsData?.meta?.hasNextPage]);

//   // Reset on filters change
//   useEffect(() => {
//     // console.log("parent filter");
//     setPage(1);
//   }, [filters]);

//   console.log(products);

//   return (
//     <div className="w-full mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
//         {/* Show skeleton while fetching on the first page */}
//         {isFetching && page === 1 ? (
//           <AllProductsGridSkeleton count={ITEMS_PER_PAGE} />
//         ) : products.length > 0 ? (
//           products.map((product: Product, index) => (
//             <AllProductsCard
//               key={product.id}
//               product={product}
//               index={index}
//               isFollowed={followedShopIds.includes(product?.shop?.id)}
//             />
//           ))
//         ) : (
//           !isFetching && <NoDataFound />
//         )}
//       </div>
//       <div ref={ref} className="mt-8 flex justify-center">
//         {isFetching && page > 1 && <AllProductsGridSkeleton count={4} />}
//       </div>
//     </div>
//   );
// };

// const AllProductsGridSkeleton = ({ count = 8 }) => (
//   <>
//     {Array.from({ length: count }).map((_, i) => (
//       <div
//         key={i}
//         className="w-full h-[300px] bg-gray-200 rounded-md animate-pulse mx-1"
//       />
//     ))}
//   </>
// );

// export default AllProductsList;

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import NoDataFound from "@/components/ui/noDataFound";
import { useDebounce } from "../../(home)/_components/_productListingComponents/hooks/debounceHook";
import { Product, TShop } from "@/types";
import { AllProductsCard } from "./allProductsCard";
import { useGetFollowedShopsQuery } from "@/redux/features/shops/shopsApi";

type FiltersType = {
  search?: string;
  maxPrice?: number;
  rating?: number;
  category?: string;
  shop?: string;
};

interface AllProductsListProps {
  filters: FiltersType;
}

const AllProductsList: React.FC<AllProductsListProps> = ({ filters }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const { ref, inView } = useInView();

  const debouncedSearch = useDebounce(filters.search, 500);

  const { data: productsData, isFetching } = useGetProductsQuery({
    page,
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
    maxPrice: filters.maxPrice,
    rating: filters.rating,
    category: filters.category,
    shop: filters.shop,
    search: debouncedSearch,
  });

  const { data: userFollowedShops } = useGetFollowedShopsQuery(undefined);
  const followedShopIds =
    userFollowedShops?.data?.followedShops.map((shop: TShop) => shop.id) || [];

  useEffect(() => {
    if (productsData?.data) {
      setProducts((prev) => {
        if (page === 1) return productsData.data;
        const existingIds = new Set(prev.map((product) => product.id));
        const newProducts = productsData.data.filter(
          (product: Product) => !existingIds.has(product.id)
        );
        return [...prev, ...newProducts];
      });
    }
  }, [productsData?.data, page]);

  useEffect(() => {
    if (inView && !isFetching && productsData?.meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, productsData?.meta?.hasNextPage]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
        {isFetching && page === 1 ? (
          <AllProductsGridSkeleton count={6} />
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <AllProductsCard
              key={product.id}
              product={product}
              index={index}
              isFollowed={followedShopIds.includes(product.shopId)}
            />
          ))
        ) : (
          !isFetching && <NoDataFound />
        )}
      </div>
      <div ref={ref} className="mt-8 flex justify-center">
        {isFetching && page > 1 && <AllProductsGridSkeleton count={4} />}
      </div>
    </div>
  );
};

const AllProductsGridSkeleton = ({ count = 8 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full h-[300px] bg-gray-200 rounded-md animate-pulse mx-1"
      />
    ))}
  </>
);

export default AllProductsList;
