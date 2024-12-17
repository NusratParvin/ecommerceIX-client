"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Heart, ShoppingCart, Timer, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductReviews from "./_components/productReviews";
import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import StarDisplay from "@/components/shared/starRating";
import RelatedProductCarousel from "./_components/relatedProductsCarousel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersApi";
import {
  useFollowShopMutation,
  useUnfollowShopMutation,
} from "@/redux/features/shops/shopsApi";
import { useEffect, useState } from "react";
import { handleAddToCart } from "@/lib/addCartUtils";
import { Product } from "@/types";

const ProductDetails = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const [isShopFollowed, setIsShopFollowed] = useState(false);

  const { data, isFetching, isError, isSuccess } = useGetProductByIdQuery(id);
  const product = data?.data;
  // console.log(product);

  const { data: userDetails } = useGetUserByEmailQuery(user?.email, {
    skip: !user,
  });

  const [followShop] = useFollowShopMutation();
  const [unfollowShop] = useUnfollowShopMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(userDetails);
      setIsShopFollowed(
        userDetails?.data?.followedShops.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (shop: any) => shop.shopId === product?.shopId
        )
      );
    }
  }, [userDetails, product, isSuccess]);

  useEffect(() => {
    const recentProductsKey = "recentProducts";

    const recentProducts = JSON.parse(
      localStorage.getItem(recentProductsKey) || "[]"
    ) as Product[];

    const filteredProducts = recentProducts.filter(
      (p) => p?.id !== product?.id
    );

    const updatedProducts = [product, ...filteredProducts].slice(0, 10);

    localStorage.setItem(recentProductsKey, JSON.stringify(updatedProducts));
  }, [product]);

  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("Please log in to follow the shop.");
      return;
    }
    // const handleBuy = async (dispatch, { product, quantity }) => {
    //   try {
    //     // Call add to cart function
    //     const result = await handleAddToCart(dispatch, { product, quantity });

    //     // Check if the addition to cart was successful
    //     if (result.success) {
    //       // Redirect to cart page
    //       router.push("/cart");
    //     } else {
    //       // Handle any errors or unsuccessful attempts
    //       toast.error("Failed to add item to cart");
    //     }
    //   } catch (error) {
    //     toast.error("An error occurred");
    //   }
    // };

    const action = isShopFollowed ? unfollowShop : followShop;
    try {
      await action({
        shopId: product?.shopId,
        email: user.email,
      });
      setIsShopFollowed(!isShopFollowed);
      toast.success(
        isShopFollowed
          ? "You have unfollowed the shop."
          : "You are now following the shop."
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <>
        <div className="h-36 bg-deep-brown"></div>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-[500px] w-full" />
        </div>
      </>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading product
        </h2>
      </div>
    );
  }
  console.log(product.reviews, "details");
  return (
    <>
      <div className="h-36 bg-deep-brown"></div>
      <div className=" w-full md:w-10/12 mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/allProducts" className="hover:underline">
            {product?.category?.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product?.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            <Image
              src={product?.imageUrl as string}
              alt={product?.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            {product?.isFlashSale && (
              <Badge
                variant="destructive"
                className="absolute top-4 left-4 animate-pulse"
              >
                <Timer className="w-4 h-4 mr-1" />
                Flash Sale
              </Badge>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6 h-full"
          >
            <div className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-warm-brown"
                  >
                    <Link href={`/shop/${product?.shop?.id}`}>
                      <span className="hover:underline">
                        {" "}
                        {product?.shop?.name}
                      </span>
                    </Link>
                  </Badge>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFollowToggle}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isShopFollowed
                          ? "text-red-500 fill-current"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </div>
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-warm-brown/30 text-charcoal"
                  >
                    {product?.category?.name}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    {/* Dynamic Star Display and Review Count */}
                    <StarDisplay rating={product?.rating} />
                    <span className="ml-1 text-sm font-medium">
                      {product?.rating.toFixed(1)} (
                      {product?.reviews?.length || 0}
                      <span> reviews</span>)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex-grow">
              <div className="space-y-2 mb-6">
                <div className="space-y-1">
                  {product?.isFlashSale ? (
                    <>
                      <p className="text-2xl font-bold text-primary">
                        ${product?.flashSalePrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-charcoal line-through">
                        ${product?.price}
                      </p>
                    </>
                  ) : (
                    <>
                      {/* No flash sale, regular discount may apply */}
                      <p className="text-2xl font-bold text-primary">
                        $
                        {(
                          product?.price *
                          (1 - (product?.discount || 0) / 100)
                        ).toFixed(2)}
                      </p>
                      {product?.discount > 0 && (
                        <p className="text-sm text-muted-foreground line-through">
                          ${product?.price.toFixed(2)}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 ">
                  {product?.stock < 10 ? (
                    <Badge variant="destructive">
                      Only {product?.stock} left
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{product?.stock} in stock</Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-lg">Description</h3>
                <p className="text-muted-foreground text-base">
                  {product?.description}
                </p>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <Button
                onClick={() =>
                  handleAddToCart(dispatch, { product, quantity: 1 })
                }
                className="flex-1 relative w-full rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-4"
              >
                <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>
                <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase flex">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </span>
              </Button>

              {/* <Button
                onClick={() => handleBuy(dispatch, { product, quantity: 1 })}
                variant="secondary"
                className="flex-1 relative w-full rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-4"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-deep-brown transform origin-top-left -skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

                <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase flex justify-center">
                  Buy Now
                </span>
              </Button> */}
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <div>
            <h1 className="font-semibold text-2xl text-warm-brown mb-4">
              Related Products
            </h1>
            <RelatedProductCarousel
              categoryId={product?.categoryId}
              productId={product?.id}
            />
          </div>
        </div>

        <div className="my-24">
          {/* Reviews Section */}
          <ProductReviews reviews={product?.reviews} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
