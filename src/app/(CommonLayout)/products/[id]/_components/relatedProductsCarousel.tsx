import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Timer } from "lucide-react";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import { Product } from "@/types";

interface RelatedProductCarouselProps {
  categoryId: string;
  productId: string;
}

const RelatedProductCarousel: React.FC<RelatedProductCarouselProps> = ({
  categoryId,
  productId,
}) => {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(categoryId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !productsData) return <div>Error loading products.</div>;
  const relatedProducts = productsData?.data?.filter(
    (product: Product) => product.id !== productId,
  );
  // console.log(relatedProducts);

  return (
    <div className="mt-24 tracking-tight relative">
      {/* <div className=""> */}

      <div className="w-full mx-auto bg-white">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto bg-white p-0"
        >
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-semibold text-2xl text-slate-600 mb-4 ">
              Related Products
            </h1>
            <div className="absolute right-0 top-4">
              <CarouselPrevious className="hidden md:flex -left-20 " />
              <CarouselNext className="hidden md:flex right-0" />
            </div>
          </div>

          <CarouselContent className="-ml-3">
            {relatedProducts?.map((product: Product) => (
              <CarouselItem key={product.id} className="md:basis-1/4 basis-1/2">
                <div className="h-96">
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
                        <div className="absolute inset-0 flex flex-col justify-end ">
                          <div className="absolute top-2 right-2">
                            {(product?.isFlashSale &&
                              product?.flashSalePrice) ||
                              (product?.discount ? (
                                <div className="bg-red-700 text-cream px-3 py-1 mb-2 rounded-sm text-sm inline-flex items-center">
                                  <Timer className="w-4 h-4 mr-1" />
                                  {product?.isFlashSale &&
                                  product?.flashSalePrice
                                    ? `${Math.round(
                                        ((product.price -
                                          product.flashSalePrice) /
                                          product.price) *
                                          100,
                                      )}% OFF`
                                    : `${product?.discount}% OFF`}
                                </div>
                              ) : null)}
                          </div>

                          <div className="bg-black/70 p-4 text-white">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-medium text-lg transition-colors hover:underline cursor-pointer">
                                {product.name}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-2 mt-1 font-sans">
                              <span className="text-xl ">
                                $
                                {product?.isFlashSale && product?.flashSalePrice
                                  ? product.flashSalePrice.toFixed(2)
                                  : product?.discount
                                    ? (
                                        product.price *
                                        (1 - product.discount / 100)
                                      ).toFixed(2)
                                    : product.price.toFixed(2)}
                              </span>

                              {(product?.isFlashSale &&
                                product?.flashSalePrice) ||
                                (product?.discount ? (
                                  <span className="text-lg line-through text-gray-300/80">
                                    ${product.price.toFixed(2)}
                                  </span>
                                ) : null)}
                            </div>

                            <div className="mt-2 text-base text-white/80">
                              {product?.stock === 0
                                ? "Out of Stock"
                                : product?.stock >= 5
                                  ? "In Stock"
                                  : `${product.stock} items left`}
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
        </Carousel>
      </div>
      {/* </div> */}
    </div>
  );
};

export default RelatedProductCarousel;
