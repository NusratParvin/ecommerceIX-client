"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AllProductsList from "../../_components/allProductsList";
import AllProductsFilterSection from "../../_components/allProductsFilters";

const ProductsBySearch = () => {
  const { product } = useParams();
  const [filters, setFilters] = useState({});

  //   const selectedProductName = productName;
  const selectedProductName = Array.isArray(product) ? product[0] : product;
  console.log(selectedProductName, "pr");
  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="md:w-11/12 w-full mx-auto ">
        <div className="flex flex-col items-center justify-center py-20  bg-warm-brown/10">
          <h1 className="text-4xl font-medium text-charcoal">All Products</h1>
          <nav className="mt-4 text-deep-navy/80 text-base ">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="font-medium">All-Products</span>
              </li>
            </ol>
          </nav>
        </div>

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
