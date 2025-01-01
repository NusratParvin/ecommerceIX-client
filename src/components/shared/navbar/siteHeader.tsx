"use client";

import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "./mobileNav";
import { MainNav } from "./mainNav";
import { Logo } from "./logo";
import SearchInput from "./search";
import UserMenu from "./user";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
// import LoginModal from "../login/login";
import { RootState } from "@/redux/store";
import { CartItem } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );

  useEffect(() => {
    const resetScroll = () => {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    };

    const observer = new MutationObserver(() => {
      resetScroll();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleCart = () => {
  //   if (!user) {
  //     router.push("/login");
  //   } else {
  //     router.push("/cart");
  //   }
  // };

  return (
    // <header
    //   className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 md:px-8 ${
    //     isScrolled ? "bg-white shadow-md" : "bg-transparent"
    //   }`}
    // >

    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-screen transition-all duration-300 md:px-8 md:h-auto   h-24 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className=" w-full mx-auto flex items-center   justify-center  pe-0  ">
        {/* Mobile Navigation Drawer */}
        <div className="flex flex-1 md:hidden justify-start  ">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link" size="icon" aria-label="Toggle menu">
                <Menu
                  className={`${
                    isScrolled ? "text-deep-brown" : "text-ivory"
                  } h-6 w-6`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] px-4 py-12">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Navigation for Medium Screens and Above */}
        <div className="hidden md:flex    ">
          <MainNav isScrolled={isScrolled} />
        </div>

        {/* Logo */}
        <div className="flex flex-1 justify-center    ">
          <Logo isScrolled={isScrolled} />
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-1 justify-end items-center   md:space-x-4  `}
        >
          <Button
            variant="link"
            size="icon"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search
              className={`h-5 w-5 ${
                isScrolled ? "text-charcoal" : "text-cream"
              }`}
            />
          </Button>

          <Link href="/cart" className="relative">
            <div className="relative">
              <ShoppingCart
                // onClick={handleCart}
                className={` h-5 w-5 ${
                  isScrolled ? "text-charcoal" : "text-cream"
                }`}
              />
              <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-deep-brown text-xs text-primary-foreground">
                {cartItemCount}
              </span>{" "}
            </div>
          </Link>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login">
              <User
                className={`h-5 w-5 ${
                  isScrolled ? "text-charcoal" : "text-cream"
                }`}
              />
            </Link>
          )}

          {/* Login Modal */}
          {/* {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            /> 
          )}*/}
        </div>
      </div>

      {/* Sliding Search Panel */}
      {isSearchOpen && (
        <SearchInput
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </header>
  );
}
