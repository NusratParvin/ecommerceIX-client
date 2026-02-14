"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types";
import { Spinner } from "@/components/ui/spinner";

export function MobileNav() {
  //   const [openItem, setOpenItem] = useState<string | null>(null)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? undefined : value);
  };

  const { data: categoriesData, isLoading } =
    useGetCategoriesForAllQuery(undefined);
  const categories = categoriesData?.data || [];
  console.log(categories);
  return (
    <div className=" flex h-full flex-col py-4 ">
      <nav className="grid gap-2">
        <Link
          href="/"
          className="flex items-center justify-between px-4 py-2 text-base font-semibold"
        >
          Home
        </Link>
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="w-full"
        >
          <AccordionItem value="shop" className="border-none">
            <AccordionTrigger
              onClick={() => handleItemClick("shop")}
              className="px-4 py-2 text-base font-semibold"
            >
              Shop
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 px-4 ml-2">
                <Link
                  href="/allProducts"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  All Collections
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/flashSale"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  Flash Sale
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/allShops"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  By Shop
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category" className="border-none">
            <AccordionTrigger
              onClick={() => handleItemClick("shop")}
              className="px-4 py-2 text-base font-semibold"
            >
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 px-4 ml-2">
                {isLoading ? (
                  <Spinner />
                ) : (
                  categories.map((category: TCategory) => (
                    <Link
                      key={category.id}
                      href={`/allProducts/${category.id}`}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      {category.name}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Link
            href="/about"
            className="flex items-center justify-between px-4 py-2 text-base font-semibold"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-between px-4 py-2 text-base font-semibold"
          >
            Contact
          </Link>
        </Accordion>
      </nav>
    </div>
  );
}
