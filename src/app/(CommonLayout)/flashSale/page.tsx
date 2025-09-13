"use client";

import { useState } from "react";
import ProductList from "./_components/saleProductList";
import Link from "next/link";
import FilterSection from "./_components/filters";
import { House } from "lucide-react";

const FlashSalePage = () => {
  const [filters, setFilters] = useState({});

  return (
    <div>
      <div className="h-16" />
      <div>
        <div className="flex flex-col items-center justify-center py-10 bg-slate-800/80 text-white">
          <h1 className="text-4xl font-medium">Flash Sale</h1>
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
                <span className="font-medium">Flash-Sale</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>{" "}
      <div className="md:w-11/12 w-full mx-auto ">
        <div className="min-h-screen flex md:flex-row flex-col mx-auto gap-0 w-full text-slate-800 tracking-tight">
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
