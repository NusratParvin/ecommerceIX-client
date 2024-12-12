"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { useGetAllShopsForAllQuery } from "@/redux/features/shops/shopsApi";
import { TCategory, TShop } from "@/types";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface FilterSectionProps {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { data: categoriesData, isFetching: isFetchingCategories } =
    useGetCategoriesForAllQuery(undefined);
  const { data: shopsData, isFetching: isFetchingShops } =
    useGetAllShopsForAllQuery(undefined);

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value || "" };
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      search: "",
      category: "",
      rating: "",
      shop: "",
      maxPrice: "",
    };
    onFilterChange(defaultFilters);
  };
  // console.log(filters);

  useEffect(() => {
    // console.log("filter");
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    // <section>
    //   <div className="mx-auto w-full px-2 py-6">
    //     <div className="flex flex-col gap-2">
    //       <h3 className="text-base font-semibold md:text-xl">
    //         Filter Products
    //       </h3>
    //       <p className="text-sm text-gray-500">
    //         Browse and filter products to find exactly what you need
    //       </p>
    //     </div>
    //     <div className="mt-4 p-0">
    //       <form className="flex flex-col gap-0">
    //         <div className="mb-6 flex items-center justify-between py-2">
    //           <h5 className="text-lg font-semibold text-warm-brown">Filters</h5>
    //           <button
    //             type="button"
    //             onClick={clearAllFilters}
    //             className="text-sm text-red-600 hover:underline"
    //           >
    //             Clear All
    //           </button>
    //         </div>

    //         <div className="relative w-full mb-10">
    //           <input
    //             type="text"
    //             className="block h-10 w-full rounded-none border-b-gray-300 bg-gray-100 px-10 py-2 text-sm font-medium text-gray-700"
    //             placeholder="Search by name..."
    //             value={filters.search}
    //             onChange={(e) => handleFilterChange("search", e.target.value)}
    //           />
    //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    //         </div>

    //         <div className="flex flex-col gap-3">
    //           <p className="text-lg font-semibold text-warm-brown">
    //             Categories
    //           </p>
    //           <div className="flex flex-wrap items-center gap-2">
    //             {isFetchingCategories ? (
    //               <Spinner />
    //             ) : (
    //               categoriesData?.data?.map((category: TCategory) => (
    //                 <button
    //                   key={category.id}
    //                   type="button"
    //                   className={`flex items-center gap-3 rounded-md p-3 font-semibold transition-colors ${
    //                     filters.category === category.id
    //                       ? "bg-black text-white"
    //                       : "bg-gray-100 hover:bg-gray-200"
    //                   }`}
    //                   onClick={() =>
    //                     handleFilterChange("category", category.id)
    //                   }
    //                 >
    //                   {category.imageUrl ? (
    //                     <Image
    //                       src={category.imageUrl}
    //                       alt={category.name}
    //                       width={20}
    //                       height={20}
    //                       className="rounded-full"
    //                     />
    //                   ) : (
    //                     <div className="w-5 h-5 bg-gray-300 rounded-full" />
    //                   )}
    //                   <p className="text-sm">{category.name}</p>
    //                 </button>
    //               ))
    //             )}
    //           </div>
    //         </div>

    //         <div className="my-6 h-px w-full bg-gray-300"></div>

    //         {/* rating */}
    //         {/* <div className="flex flex-col gap-6">
    //           <p className="text-lg font-semibold text-warm-brown">Rating</p>
    //           <div className="flex flex-wrap gap-2">
    //             {[1, 2, 3, 4, 5].map((rating) => (
    //               <button
    //                 key={rating}
    //                 type="button"
    //                 className={`flex h-8 w-10 items-center justify-center rounded-md ${
    //                   filters.rating === rating
    //                     ? "bg-warm-brown text-cream"
    //                     : "bg-gray-100 text-gray-700"
    //                 } text-base font-medium`}
    //                 onClick={() => handleFilterChange("rating", rating)}
    //               >
    //                 {rating}
    //               </button>
    //             ))}
    //           </div>
    //         </div> */}

    //         <div className="my-6 h-px w-full bg-gray-300"></div>

    //         <div className="flex flex-col gap-2">
    //           <p className="text-lg font-semibold text-warm-brown">By Shop</p>
    //           {isFetchingShops ? (
    //             <Spinner />
    //           ) : (
    //             <Select
    //               value={filters.shop || "all"}
    //               onValueChange={(value) =>
    //                 handleFilterChange("shop", value === "all" ? null : value)
    //               }
    //             >
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Select Shop" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="all">All Shops</SelectItem>
    //                 {shopsData?.data?.map((shop: TShop) => (
    //                   <SelectItem key={shop.id} value={shop.id}>
    //                     {shop.name}
    //                   </SelectItem>
    //                 ))}
    //               </SelectContent>
    //             </Select>
    //           )}
    //         </div>

    //         <div className="my-6 h-px w-full bg-gray-300"></div>

    //         <div className="flex flex-col gap-3">
    //           <p className="text-lg font-semibold text-warm-brown">
    //             Price Range
    //           </p>
    //           {[100, 200, 300, 500, 1000].map((price) => (
    //             <div key={price} className="flex items-center">
    //               <Checkbox
    //                 checked={filters.maxPrice === price}
    //                 onCheckedChange={(checked) =>
    //                   handleFilterChange("maxPrice", checked ? price : null)
    //                 }
    //                 id={`price-${price}`}
    //               />
    //               <label
    //                 htmlFor={`price-${price}`}
    //                 className="ml-2 text-sm font-medium"
    //               >
    //                 Below ${price}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </section>

    <section>
      <div className="mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            Filter Products
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            Browse and filter products to find exactly what you need
          </p>
        </div>
        <div className="mt-4 p-0">
          <form className="flex flex-col gap-0">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between py-2">
              <h5 className="text-lg font-semibold text-warm-brown">Filters</h5>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:underline mt-2 sm:mt-0"
              >
                Clear All
              </button>
            </div>

            <div className="relative w-full mb-10">
              <input
                type="text"
                className="block h-10 w-full rounded-none border-b-gray-300 bg-gray-100 px-10 py-2 text-sm sm:text-base font-medium text-gray-700"
                placeholder="Search by name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold text-warm-brown">
                Categories
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {isFetchingCategories ? (
                  <Spinner />
                ) : (
                  categoriesData?.data?.map((category: TCategory) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`flex items-center gap-3 rounded-md p-3 font-semibold transition-colors ${
                        filters.category === category.id
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleFilterChange("category", category.id)
                      }
                    >
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full" />
                      )}
                      <p className="text-sm sm:text-base">{category.name}</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="my-6 h-px w-full bg-gray-300"></div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-warm-brown">By Shop</p>
              {isFetchingShops ? (
                <Spinner />
              ) : (
                <Select
                  value={filters.shop || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("shop", value === "all" ? null : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Shop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Shops</SelectItem>
                    {shopsData?.data?.map((shop: TShop) => (
                      <SelectItem key={shop.id} value={shop.id}>
                        {shop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="my-6 h-px w-full bg-gray-300"></div>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold text-warm-brown">
                Price Range
              </p>
              {[100, 200, 300, 500, 1000].map((price) => (
                <div key={price} className="flex items-center">
                  <Checkbox
                    checked={filters.maxPrice === price}
                    onCheckedChange={(checked) =>
                      handleFilterChange("maxPrice", checked ? price : null)
                    }
                    id={`price-${price}`}
                  />
                  <label
                    htmlFor={`price-${price}`}
                    className="ml-2 text-sm sm:text-base font-medium"
                  >
                    Below ${price}
                  </label>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
