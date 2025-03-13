"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { Product } from "@/types";
import { FlashSaleCarousel } from "./_flashSaleComponents/flashSaleCarousel";
import { CountdownTimer } from "./_flashSaleComponents/countDownTimer";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
// import Link from "next/link";

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
  console.log(productsData);

  const router = useRouter();

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

  // const latestEndDate = new Date(
  //   Math.max(
  //     ...flashSaleProducts.map((p) =>
  //       new Date(p.flashSaleEndDate || "").getTime()
  //     )
  //   )
  // );

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Flash Sale Banner */}
        {/* <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold mb-4">Flash Sale</h2>
            <CountdownTimer endDate={latestEndDate} />
          </div>
        </div> */}

        <div className="flex flex-row justify-between items-center text-charcoal mb-6">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold text-left mb-0 tracking-tight text-warm-brown">
              Flash Sale
            </h1>
            <p className="font-medium text-xs tracking-tight py-1 ps-1 uppercase text-charcoal/60">
              Enjoy the best quality products
            </p>
          </div>

          {/* <Link
            href="/flashSale"
            className="text-sm hover:underline text-deep-brown px-3 py-1.5 bg-muted/70"
          >
            Explore More
          </Link> */}
        </div>

        {/* Flash Sale Products Carousel */}
        <FlashSaleCarousel products={flashSaleProducts} />

        {/* View All Button */}
        <div className="mt-8 text-center">
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
        </div>

        <div className="relative w-full h-[510px] overflow-hidden border-none rounded-none mb-8 mt-24">
          {/* Background Video */}
          <video
            src="/assets/YEAR-END SALE.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-fill border-none"
          />

          {/* Content Overlay */}
          <div
            className="absolute inset-0 left-1/2   top-24 flex flex-col items-center justify-center
           text-red-600"
          >
            <h2 className="text-4xl font-bold mb-4">Flash Sale</h2>
            <CountdownTimer endDate={new Date(2025, 3, 30, 0, 0, 0)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleProducts;
