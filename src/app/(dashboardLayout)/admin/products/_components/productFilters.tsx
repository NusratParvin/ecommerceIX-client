"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterState } from "../page";

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search Products by name..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Status: {filters.status === "all" ? "All" : filters.status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => onFilterChange({ status: "all" })}
              >
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilterChange({ status: "ACTIVE" })}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilterChange({ status: "HIDDEN" })}
              >
                Hidden
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Flash Sale Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Flash Sale:{" "}
                {filters.flashSale === "all" ? "All" : filters.flashSale}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => onFilterChange({ flashSale: "all" })}
              >
                All Products
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilterChange({ flashSale: "active" })}
              >
                Flash Sale Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilterChange({ flashSale: "inactive" })}
              >
                No Flash Sale
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange({ sortBy: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center space-x-2">
            <Select
              value={filters.sortOrder}
              onValueChange={(value: "asc" | "desc") =>
                onFilterChange({ sortOrder: value })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
