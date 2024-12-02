"use client";

import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type SearchInputProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
};

const SearchInput = ({ isSearchOpen, setIsSearchOpen }: SearchInputProps) => {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Search Panel */}
      <div
        className={`bg-white shadow-lg rounded-lg transition-transform duration-300 transform ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        } w-full h-full md:w-2/3 md:h-2/3`}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm uppercase">
              What are you looking for?
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Search"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Search Input */}
          <div className="flex items-center border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="Search Products..."
              className="flex-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <Search className="h-5 w-5 text-gray-500 ml-2" />
          </div>

          {/* Categories */}
          <div className="mt-4">
            <h4 className="text-gray-500 text-sm uppercase mb-2">Categories</h4>
            <div className="flex space-x-4 flex-wrap">
              {["Accessories", "Bags", "Glasses", "Men", "Outerwear"].map(
                (category) => (
                  <span
                    key={category}
                    className="text-gray-800 hover:underline cursor-pointer"
                  >
                    {category}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
