import * as React from "react";
import Link from "next/link";
import { Product, TShop } from "@/types";
import Image from "next/image";

function isFlashSaleLive(p: Product, now = new Date()) {
  if (!p?.isFlashSale) return false;
  const s = p.flashSaleStartDate ? new Date(p.flashSaleStartDate) : null;
  const e = p.flashSaleEndDate ? new Date(p.flashSaleEndDate) : null;
  if (s && now < s) return false;
  if (e && now > e) return false;
  return true;
}

function getCover(shop: TShop) {
  return shop.products?.find((p) => p.imageUrl)?.imageUrl ?? "";
}

function getStats(shop: TShop) {
  const products = (shop.products ?? []).filter((p) => !p.isDeleted);
  const rated = products.map((p) => p.rating ?? 0).filter((r) => r > 0);
  const avgRating = rated.length
    ? +(rated.reduce((a, b) => a + b, 0) / rated.length).toFixed(1)
    : 0;
  const followers = shop.followers?.length ?? 0;
  const flashLive = products.some((p) => isFlashSaleLive(p));
  return {
    productCount: products.length,
    avgRating,
    ratedCount: rated.length,
    followers,
    flashLive,
  };
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 .587 15.668 8.018l8.2 1.193-5.934 5.787 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.211l8.2-1.193L12 .587z" />
    </svg>
  );
}

export default function ShopCard({ shop }: { shop: TShop }) {
  const { productCount, avgRating, ratedCount, followers, flashLive } =
    getStats(shop);
  const cover = getCover(shop);

  return (
    <div className="group relative rounded-md bg-white shadow-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cover */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {cover ? (
          <Image
            src={shop.logo || ""}
            alt="Cover"
            fill
            className="h-full w-full object-cover object-center opacity-90 group-hover:scale-[1.3] transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
            No image
          </div>
        )}
        {flashLive && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-rose-600 text-white text-xs font-medium px-2.5 py-1 shadow">
            Sale live
          </span>
        )}
      </div>

      {/* Body */}
      <div className="py-4 px-3">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {shop.name?.trim() || "Untitled shop"}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-sm font-medium text-yellow-500">
                  {avgRating.toFixed(1)}
                </span>
                <StarIcon className="w-4 h-3 mb-1 fill-yellow-500" />
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-0.5  break-words line-clamp-2">
              {shop.description || "—"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-2 grid grid-cols-3 gap-1 text-center text-sm">
          <div className="rounded-lg bg-gray-50 py-2  ">
            <div className=" font-semibold text-gray-900 font-sans">
              {productCount}
            </div>
            <div className="text-xs pt-1 text-gray-500">Products</div>
          </div>
          <div className="rounded-lg bg-gray-50 py-2 ">
            <div className="  font-semibold text-gray-900   font-sans">
              {ratedCount}
            </div>
            <div className=" text-xs pt-1 text-gray-500  ">Rated</div>
          </div>
          <div className="rounded-lg bg-gray-50 py-2">
            <div className=" font-semibold text-gray-900 font-sans">
              {followers}
            </div>
            <div className="text-xs pt-1 text-gray-500">Followers</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end text-base">
          <Link
            href={`/shop/${shop.id}`}
            className="inline-flex items-center gap-1 text-deep-brown font-medium hover:text-indigo-700 hover:underline"
          >
            View Shop
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M13 5l7 7-7 7M5 12h14" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
