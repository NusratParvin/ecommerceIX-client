"use client";

import { useState } from "react";

// import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { Product } from "@/types";
import { FlashSaleCarousel } from "./_flashSaleComponents/flashSaleCarousel";
// import { CountdownTimer } from "./_flashSaleComponents/countDownTimer";
import { Spinner } from "@/components/ui/spinner";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const FlashSaleProducts = () => {
  // const router = useRouter();
  const ITEMS_PER_PAGE = 8;
  const [page] = useState(1);

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    sortBy: "createdAt",
    sortOrder: "desc",
    minPrice: 0,
    maxPrice: 1000,
  });

  // const router = useRouter();

  if (isLoading) {
    return (
      <div className="py-12 px-4 text-center text-3xl">
        <Spinner />
      </div>
    );
  }

  if (error || !productsData) {
    return (
      <div className="py-12 px-4 text-center">
        <p className="text-red-600">Failed to load flash sale products.</p>
      </div>
    );
  }

  const flashSaleProducts: Product[] =
    Array.isArray(productsData?.data) &&
    productsData.data.filter(
      (product: Product) =>
        product.isFlashSale &&
        product.flashSalePrice !== null &&
        product.flashSaleEndDate !== null
    );

  if (flashSaleProducts.length === 0) {
    return null;
  }
  // console.log(flashSaleProducts);
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Flash Sale Banner */}

        <div className="grid grid-cols-3   items-center text-charcoal mb-0">
          <div className="col-span-2   flex justify-between items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold text-left mb-0 tracking-tight text-deep-brown">
                Dont Miss These
              </h1>
              <p className="font-medium text-xs tracking-tight py-1 uppercase text-charcoal/60">
                Enjoy the best quality products
              </p>
            </div>

            {/* Right Content */}
            <Link
              href="/allProducts"
              className="text-base hover:underline text-gray-600 px-6 py-1.5 bg-muted/70 tracking-tighter"
            >
              Explore More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3   overflow-hidden">
          <div className="col-span-2 h-full overflow-hidden">
            <FlashSaleCarousel products={flashSaleProducts} />
          </div>

          <div className="relative col-span-1 h-full">
            <Image
              src="/assets/offer/flash1.png"
              alt="Flash Sale"
              fill
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover  "
              priority
            />
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="mt-8 text-center">
          <Button
            onClick={() => router.push("/flashSale")}
            type="submit"
            className="relative p-6 rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group  "
          >
            <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>
            <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
              View More
            </span>
          </Button>
        </div> */}

        {/* <div className="relative w-full h-[510px] overflow-hidden border-none rounded-none mb-8 mt-24">
          <video
            src="/assets/YEAR-END SALE.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-fill border-none"
          />

           <div
            className="absolute inset-0 left-1/2   top-24 flex flex-col items-center justify-center
           text-red-600"
          >
            <h2 className="text-4xl font-bold mb-4">Flash Sale</h2>
            <CountdownTimer endDate={new Date(2025, 3, 30, 0, 0, 0)} />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FlashSaleProducts;
