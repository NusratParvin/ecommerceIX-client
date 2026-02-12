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

const components: {
  title: string;
  href: string;
  image: string;
  description: string;
}[] = [
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
  // {
  //   title: "Sale",
  //   href: "/shop/sale",
  //   description: "Great deals on selected items.",
  // },
];

export function MainNav({ isScrolled }: { isScrolled: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6 text-sm ">
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
            } text-sm hover:bg-none transition-colors duration-200 bg-transparent hover:underline `}
          >
            SHOP
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 w-[500px] p-1 md:w-[600px] md:grid-cols-2 lg:w-[700px] rounded-none">
            {/* <NavigationMenuContent className="absolute left-0 top-full w-[300px] md:w-[400px] transform translate-y-2 transition-transform duration-200 z-50"> */}
            <ul className="grid gap-3 p-1 md:grid-cols-2">
              {components.map((component) => (
                <li key={component.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={component.href}
                      className="block select-none space-y-1 rounded-none p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex flex-row gap-2">
                        <Image
                          src={component.image}
                          alt={component.title}
                          width={80}
                          height={80}
                          className="rounded-none object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium leading-none">
                            {component.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${
                isScrolled
                  ? "text-ivory hover:text-white"
                  : "text-gray-500 hover:text-deep-brown"
              } hover:underline transition-colors duration-200`}
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
              } hover:underline transition-colors duration-200`}
            >
              CONTACT
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              isScrolled ? "text-deep-brown" : "text-ivory"
            } text-lg transition-colors duration-200 bg-transparent`}
          >
            PAGES
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 w-[400px] p-4 md:w-[500px]">
            <ul className="grid gap-3 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      About Us
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn more about our story and mission.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Contact
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get in touch with our team.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
