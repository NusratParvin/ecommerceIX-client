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

export function MobileNav() {
  //   const [openItem, setOpenItem] = useState<string | null>(null)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? undefined : value);
  };

  return (
    <div className=" flex h-full flex-col py-4 ">
      <nav className="grid gap-2">
        <Link
          href="/"
          className="flex items-center justify-between px-4 py-2 text-sm font-medium"
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
              className="px-4 py-2 text-sm"
            >
              Shop
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 px-4">
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
                {/* <Link
                  href="/shop/sale"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  Sale
                  <ChevronRight className="h-4 w-4" />
                </Link> */}
              </div>
            </AccordionContent>
          </AccordionItem>
          <Link
            href="/about"
            className="flex items-center justify-between px-4 py-2 text-sm font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-between px-4 py-2 text-sm font-medium"
          >
            Contact
          </Link>
          {/* <AccordionItem value="pages" className="border-none">
            <AccordionTrigger
              onClick={() => handleItemClick("pages")}
              className="px-4 py-2 text-sm"
            >
              Pages
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 px-4">
                <Link
                  href="/about"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  About Us
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between py-2 text-sm"
                >
                  Contact
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </nav>
    </div>
  );
}
