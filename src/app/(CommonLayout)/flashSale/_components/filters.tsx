/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <section>
      <div className="mx-auto w-full px-2 sm:px-1 py-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700">
            Filter Products
          </h3>
          <p className="md:text-base text-sm text-gray-500">
            Browse and filter products to find exactly what you need
          </p>
        </div>
        <div className="mt-4 p-0">
          <form className="flex flex-col gap-0">
            <div className="flex flex-col sm:flex-row items-center justify-between py-2">
              <h5 className="text-lg font-semibold text-slate-700">Filters</h5>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-base text-red-600 hover:underline mt-2 sm:mt-0"
              >
                Clear All
              </button>
            </div>

            <div className="relative w-full mb-6">
              <input
                type="text"
                className="block h-10 w-full rounded-none border-b-gray-300
                 bg-gray-100 px-7 py-2 text-sm sm:text-base font-medium text-gray-700"
                placeholder="Search by name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            <div className="flex flex-col gap-3  mb-8">
              <p className="text-lg font-semibold text-slate-700">
                Select by Categories
              </p>
              <div className="flex flex-col items-start  gap-2">
                {isFetchingCategories ? (
                  <Spinner />
                ) : (
                  categoriesData?.data?.map((category: TCategory) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`flex items-center gap-2 w-full rounded-md p-1 px-4 
                         text-base font-medium ${
                           filters.category === category.id
                             ? "bg-deep-brown/80 text-white"
                             : "bg-gray-100 hover:bg-gray-200"
                         }`}
                      onClick={() =>
                        handleFilterChange("category", category.id)
                      }
                    >
                      {category.imageUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                          <Image
                            src={category.imageUrl as string}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded-full" />
                      )}
                      <p className="text-sm sm:text-base">{category.name}</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* <div className="my-6 h-px w-full bg-gray-300"></div> */}

            <div className="flex flex-col gap-2  mb-6">
              <p className="text-lg font-semibold text-slate-700">
                Select by Shop
              </p>
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

            {/* <div className="my-6 h-px w-full bg-gray-300"></div> */}

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-lg font-semibold text-slate-700 ">
                Select by Price Range
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
                    className="ml-2 text-base font-medium"
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
