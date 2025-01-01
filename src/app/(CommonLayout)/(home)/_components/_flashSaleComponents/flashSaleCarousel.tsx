"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Image from "next/image";
import { Timer } from "lucide-react";
import Link from "next/link";

interface FlashSaleCarouselProps {
  products: Product[];
}

export function FlashSaleCarousel({ products }: FlashSaleCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto bg-white p-0"
    >
      <CarouselContent className="-ml-3">
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/3 basis-1/2  ">
            <div className="h-64 p-0">
              <Card className="group overflow-hidden border-none rounded-none transition-all duration-300 h-full">
                <CardContent className="p-0 h-full relative">
                  {/* Product Image Container */}
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={product.imageUrl as string}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlaid Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      {product.isFlashSale && (
                        <div className="absolute top-2 right-2">
                          <div className=" bg-red-700 text-cream px-3 py-1 mb-2 rounded-sm text-sm inline-flex items-center">
                            <Timer className="w-4 h-4 mr-1" />
                            {product.flashSalePrice &&
                              `${Math.round(
                                ((product.price - product.flashSalePrice) /
                                  product.price) *
                                  100
                              )}% OFF`}
                          </div>
                        </div>
                      )}
                      <div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-xl text-warm-gray group-hover:text-warm-gray line-clamp-1 transition-colors hover:underline cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-bold text-green-600">
                            ${product.flashSalePrice?.toFixed(2)}
                          </span>
                          <span className="text-sm line-through text-white/80">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-2 text-sm text-white/80">
                          {product.stock} items left
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12 " />
      <CarouselNext className="hidden md:flex -right-12" />
    </Carousel>
  );
}
