/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { TCategory } from "@/types";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";

type componentsProps = {
  title: string;
  href: string;
  image: string;
  description?: string;
};

const shopComponents: componentsProps[] = [
  {
    title: "All Collections",
    href: "/allProducts",
    image: "/assets/menu/all.jpg",
    description: "Browse through our extensive range of products.",
  },
  {
    title: "Flash Sale",
    href: "/flashSale",
    image: "/assets/menu/sale.jpeg",

    description: "Grab exclusive deals before they're gone!",
  },
  {
    title: "By Shop",
    href: "/allShops",
    image: "/assets/menu/shop.jpg",

    description: "Find your favorite shop.",
  },
  // {
  //   title: "Best Sellers",
  //   href: "/shop/best-sellers",
  //   description: "Discover our most popular items.",
  // },
];

const MenuSkeleton = () => (
  <ul className="grid gap-3 p-1 md:grid-cols-2">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <li key={i}>
        <div className="flex flex-row gap-2 p-2">
          <div className="min-w-[80px] min-h-[80px] w-[80px] h-[80px] bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-2 flex-1 justify-center">
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

// Error Component
const MenuError = () => (
  <div className="p-6 flex flex-col items-center justify-center gap-2 text-center">
    <p className="text-sm font-medium text-red-600">
      Failed to load categories
    </p>
    <p className="text-xs text-gray-500">Please try again later</p>
  </div>
);

export function MainNav({ isScrolled }: { isScrolled: boolean }) {
  const {
    data: categoriesData,
    isLoading,
    error,
  } = useGetCategoriesForAllQuery(undefined);
  const categories = categoriesData?.data || [];

  const categoryComponents = categories.map((category: TCategory) => ({
    title: category.name,
    href: `/allProducts/${category.id}`,
    image: category.imageUrl,
    description: category.desc,
  }));
  // console.log(categoryComponents);
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6 text-sm  ">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${
                isScrolled
                  ? "text-ivory hover:text-white"
                  : "text-gray-500 hover:text-deep-brown"
              } hover:underline transition-colors duration-200`}
            >
              HOME
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              isScrolled
                ? "text-ivory hover:text-ivory  focus:text-ivory"
                : "text-gray-500"
            } text-sm hover:bg-none transition-colors duration-200 bg-transparent hover:underline p-0 `}
          >
            SHOP
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 w-[500px] p-3 md:w-[600px] md:grid-cols-2 lg:w-[700px] rounded-none z-50">
            {/* <NavigationMenuContent className="absolute left-0 top-full w-[300px] md:w-[400px] transform translate-y-2 transition-transform duration-200 z-50"> */}
            <ul className="grid gap-3 p-1 md:grid-cols-2">
              {shopComponents.map((component) => (
                <li key={component.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={component.href}
                      className="block select-none space-y-1 rounded-none p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex flex-row gap-2">
                        <div className="min-w-[80px] min-h-[80px] w-[80px] h-[80px]">
                          <Image
                            src={component.image}
                            alt={component.title}
                            width={80}
                            height={80}
                            className="rounded-none object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="text-base leading-none font-semibold">
                            {component.title}
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              isScrolled
                ? "text-ivory hover:text-ivory  focus:text-ivory"
                : "text-gray-500"
            } text-sm hover:bg-none transition-colors duration-200 bg-transparent hover:underline p-0`}
          >
            CATEGORY
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 w-[500px] p-3 md:w-[600px] md:grid-cols-2 lg:w-[700px] rounded-none z-50">
            {isLoading ? (
              <MenuSkeleton />
            ) : error ? (
              <MenuError />
            ) : (
              <ul className="grid gap-3 p-1 md:grid-cols-2">
                {categoryComponents.map((component: any) => (
                  <li key={component.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={component.href}
                        className="block select-none space-y-1 rounded-none p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex flex-row gap-2">
                          <div className="min-w-[80px] min-h-[80px] w-[80px] h-[80px]">
                            <Image
                              src={component.image}
                              alt={component.title}
                              width={80}
                              height={80}
                              className="rounded-none object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="text-base leading-none font-semibold">
                              {component.title}
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                              {component.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${
                isScrolled
                  ? "text-ivory hover:text-white"
                  : "text-gray-500 hover:text-deep-brown"
              } hover:underline transition-colors duration-200 p-0`}
            >
              ABOUT
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${
                isScrolled
                  ? "text-ivory hover:text-white"
                  : "text-gray-500 hover:text-deep-brown"
              } hover:underline transition-colors duration-200 p-0`}
            >
              CONTACT
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
