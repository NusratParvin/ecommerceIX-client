"use client";

import { useState } from "react";
import ProductList from "./_components/saleProductList";
import Link from "next/link";
import FilterSection from "./_components/filters";

const FlashSalePage = () => {
  const [filters, setFilters] = useState({});

  return (
    <div>
      <div className="h-24 bg-deep-brown"></div>
      <div className="md:w-11/12 w-full mx-auto ">
        <div className="flex flex-col items-center justify-center py-10  bg-warm-brown/10">
          <h1 className="text-4xl font-medium text-charcoal">Flash Sale</h1>
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
                <span className="font-medium">Flash-Sale</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="min-h-screen flex md:flex-row flex-col mx-auto gap-0 w-full">
          <aside className="bg-gray-50 p-2 md:w-[25%] w-full">
            <FilterSection filters={filters} onFilterChange={setFilters} />
          </aside>
          <div className="md:w-[75%] w-full">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;
