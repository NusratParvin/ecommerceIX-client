"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { useGetAllShopsForAllQuery } from "@/redux/features/shops/shopsApi";
import { TCategory, TShop } from "@/types";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  category: string | null;
  shop: string | null;
  search: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const ProductFilters = ({
  filters,
  onFilterChange,
}: ProductFiltersProps) => {
  const { data: categoriesData, isFetching: isFetchingCategories } =
    useGetCategoriesForAllQuery(undefined);

  const { data: shopsData, isFetching: isFetchingShops } =
    useGetAllShopsForAllQuery(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="flex-1 min-w-[150px]">
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      {/* Price Slider */}
      <div className="flex-1 min-w-[200px]">
        <Slider
          defaultValue={[filters.minPrice, filters.maxPrice]}
          max={1000}
          step={10}
          onValueChange={(values) => {
            handleFilterChange("minPrice", values[0]);
            handleFilterChange("maxPrice", values[1]);
          }}
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      {/* Category Select */}
      <div className="flex-1 min-w-[150px]">
        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            handleFilterChange("category", value === "all" ? null : value)
          }
          disabled={isFetchingCategories}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoriesData?.data?.map((category: TCategory) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Shop Select */}
      <div className="flex-1 min-w-[150px]">
        <Select
          value={filters.shop || "all"}
          onValueChange={(value) =>
            handleFilterChange("shop", value === "all" ? null : value)
          }
          disabled={isFetchingShops}
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
      </div>

      {/* Reset Filters Button */}
      <div className="flex-shrink-0">
        <Button
          variant="outline"
          onClick={() =>
            onFilterChange({
              minPrice: 0,
              maxPrice: 1000,
              category: null,
              shop: null,
              search: "",
            })
          }
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
