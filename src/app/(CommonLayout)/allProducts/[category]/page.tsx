"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AllProductsFilterSection from "../_components/allProductsFilters";
import AllProductsList from "../_components/allProductsList";
import { House } from "lucide-react";

const ProductsByCategory = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({});

  const selectedCategoryId = Array.isArray(category) ? category[0] : category;
  // console.log(category);
  // filters.category = category;
  return (
    <div>
      <div className="h-16" />
      <div>
        <div className="flex flex-col items-center justify-center  py-3 md:py-10 bg-slate-800/80 text-white">
          <h1 className="text-3xl md:text-4xl font-medium">All Collections</h1>
          <nav className="mt-3 md:mt-4 text-base md:text-lg">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex items-start gap-1"
                >
                  <House size={16} className="mt-1.5" />
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <span className="font-medium">All-Collections</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="md:w-11/12 w-full mx-auto mb-20 ">
        <div className="min-h-screen flex md:flex-row flex-col mx-auto gap-0 w-full">
          <aside className="bg-gray-50 p-2 md:w-[25%] w-full">
            <AllProductsFilterSection
              filters={filters}
              onFilterChange={setFilters}
              selectedCategoryId={selectedCategoryId}
            />
          </aside>
          <div className="md:w-[75%] w-full">
            <AllProductsList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
