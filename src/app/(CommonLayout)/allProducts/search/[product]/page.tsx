"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AllProductsList from "../../_components/allProductsList";
import AllProductsFilterSection from "../../_components/allProductsFilters";
import { House } from "lucide-react";

const ProductsBySearch = () => {
  const { product } = useParams();
  const [filters, setFilters] = useState({});

  //   const selectedProductName = productName;
  const selectedProductName = Array.isArray(product) ? product[0] : product;
  console.log(selectedProductName, "pr");
  return (
    <div>
      <div className="h-16" />
      <div>
        <div className="flex flex-col items-center justify-center py-10 bg-slate-800/80 text-white">
          <h1 className="text-4xl font-medium">All Collections</h1>
          <nav className="mt-4 text-lg">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex items-start gap-1"
                >
                  <House size={16} className="mt-1" />
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
              selectedProductName={selectedProductName}
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

export default ProductsBySearch;
