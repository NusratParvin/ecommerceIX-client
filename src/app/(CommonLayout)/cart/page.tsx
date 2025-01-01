"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleUpdateQuantity } from "@/lib/addCartUtils";
import {
  useApplyCouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/features/coupons/couponsApi";
import { CouponCode } from "./_components/coupon";
import { TCoupon } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useAppSelector(useCurrentUser);

  // console.log(cart.vendorId);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeApplied, setCouponCodeApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponIdApplied, setCouponIdApplied] = useState("");
  const [applyCoupon, { isLoading: isApplying }] = useApplyCouponMutation();

  const {
    data,
    isLoading: isCouponsLoading,
    isError: isCouponsError,
    error,
  } = useGetAllCouponsQuery(undefined);
  console.log(error);
  const coupons = data?.data;

  const FinalTotalPrice = cart.items.reduce((total, item) => {
    const { price, discount, isFlashSale, flashSalePrice } = item.productInfo;

    let itemPrice = price;

    if (discount > 0) {
      itemPrice = price - (price * discount) / 100;
    }

    if (isFlashSale) {
      itemPrice = price - (flashSalePrice ?? 0);
    }

    return total + itemPrice * item.quantity;
  }, 0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPrice, setTotalPrice] = useState(FinalTotalPrice);

  const handleApplyCoupon = async () => {
    try {
      const result = await applyCoupon({ code: couponCode }).unwrap();
      console.log(result);
      const coupon = result?.data?.discount;
      setDiscountAmount(coupon.discountAmount || 0);
      setTotalPrice(FinalTotalPrice - (coupon.discountAmount || 0));
      setCouponCodeApplied(true);
      // console.log(result.data);
      setCouponIdApplied(coupon.id);
      toast.success(`Coupon applied `);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err, "Failed to apply coupon");

      toast.error(err?.data?.message || "Failed to apply coupon");
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    handleUpdateQuantity(dispatch, productId, newQuantity);
  };

  // console.log(FinalTotalPrice, "cart");
  return (
    <>
      <div className="h-24 bg-deep-brown"></div>

      <div className="min-h-screen md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4 mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        {cart.items.length === 0 ? (
          <p className="text-gray-600 my-20 text-base text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Cart Items */}
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
              {cart.items.map((cartItem) => (
                <div
                  key={cartItem.productInfo.id}
                  className="flex items-center justify-between bg-white p-4 rounded-md mb-4 shadow"
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 shrink-0 bg-gray-200 rounded-md">
                      <Image
                        src={cartItem.productInfo.imageUrl as string}
                        alt={cartItem.productInfo.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Product Info */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {cartItem.productInfo.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Price: ${cartItem.productInfo.price.toFixed(2)}
                      </p>

                      <div className="flex flex-row gap-5 justify-start">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.productInfo.id,
                                cartItem.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-base font-medium">
                            {cartItem.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.productInfo.id,
                                cartItem.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <button
                          className="text-xs text-red-500 mt-1"
                          onClick={() =>
                            dispatch(removeFromCart(cartItem.productInfo.id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Item Total */}
                  <h4 className="text-lg font-semibold text-gray-800   w-1/4">
                    <p className="text-lg text-gray-500">
                      {cartItem.productInfo.discount > 0 ? (
                        // If there's a discount, apply the discount percentage
                        <>
                          $
                          {(
                            cartItem.productInfo.price -
                            (cartItem.productInfo.price *
                              cartItem.productInfo.discount) /
                              100
                          ).toFixed(2)}
                        </>
                      ) : cartItem.productInfo.isFlashSale ? (
                        // If it's a flash sale, show the flash sale price
                        <>
                          $
                          {(
                            cartItem.productInfo.price -
                            (cartItem?.productInfo?.flashSalePrice ?? 0)
                          ).toFixed(2)}
                        </>
                      ) : (
                        // If neither, show the regular price
                        <>${cartItem.productInfo.price.toFixed(2)}</>
                      )}
                    </p>

                    {/* Second row: Display discount or flash sale details */}
                    <div className="text-xs text-gray-500 font-medium font-sans">
                      {cartItem.productInfo.discount > 0 && (
                        <span className="text-red-500 text-xs">
                          **{cartItem.productInfo.discount}% off
                        </span>
                      )}
                      {cartItem.productInfo.isFlashSale && (
                        <span className="text-red-500 text-xs">
                          **Flash Sale! $
                          {cartItem.productInfo.flashSalePrice ?? 0} off
                        </span>
                      )}
                    </div>
                  </h4>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 p-2 pb-4 rounded-md text-sm flex flex-col items-center justify-center gap-2  ">
                <h1 className="text-base font-semibold text-center text-deep-brown border-b w-full mx-1">
                  Available Coupons
                </h1>
                <div className="space-y-0 flex flex-wrap gap-1">
                  {isCouponsLoading ? (
                    <Spinner />
                  ) : isCouponsError ? (
                    <div className="text-red-500">
                      <AlertTriangle
                        className="inline-block mr-2 text-sm"
                        size={16}
                      />
                      Failed to load coupons.
                    </div>
                  ) : (
                    coupons.map((coupon: TCoupon) => (
                      <CouponCode
                        key={coupon.code}
                        code={coupon.code}
                        discount={coupon.discountAmount}
                        expirationDate={new Date(
                          coupon.expirationDate
                        ).toLocaleDateString()}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex border border-deep-brown/50 overflow-hidden rounded-md mb-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="w-full outline-none bg-white text-gray-600 text-xs px-4 py-2.5"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponCodeApplied || isApplying}
                    className={`flex items-center justify-center font-semibold tracking-wide px-4 text-sm text-white ${
                      couponCodeApplied || isApplying
                        ? "bg-gray-700 hover:bg-gray-500 cursor-not-allowed"
                        : "bg-warm-brown hover:bg-deep-brown"
                    }`}
                  >
                    Apply
                  </button>
                </div>
                <ul className="text-gray-800 space-y-4">
                  {couponCodeApplied ? (
                    <li className="flex justify-between text-base">
                      Discount{" "}
                      <span className="font-bold">-${discountAmount}</span>
                    </li>
                  ) : (
                    <li className="flex justify-between text-base">
                      Discount <span className="font-bold">0</span>
                    </li>
                  )}
                  <li className="flex justify-between text-base">
                    Shipping <span className="font-bold">$5.00</span>
                  </li>
                  <li className="flex justify-between text-base">
                    Tax <span className="font-bold">$2.00</span>
                  </li>
                  <li className="flex justify-between text-base font-bold">
                    Total
                    <span>
                      {couponCodeApplied ? (
                        <>
                          {/* Discount Applied:{" "} */}
                          {/* <span>-${discountAmount.toFixed(2)}</span>{" "} */}
                          <span>
                            ${(FinalTotalPrice + 7 - discountAmount).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>${(FinalTotalPrice + 7).toFixed(2)}</span>
                      )}
                    </span>
                  </li>
                </ul>
                <div className="mt-8 space-y-2">
                  <Link
                    href={{
                      pathname: "/checkout",
                      query: {
                        cart: JSON.stringify(cart.items),
                        totalPrice: FinalTotalPrice,
                        discount: discountAmount || 0,
                        couponId: couponIdApplied,
                        shopId: cart.vendorId,
                      },
                    }}
                  >
                    <button
                      disabled={!user} // Disable the button if there's no user
                      className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md mb-4 ${
                        user
                          ? "bg-warm-brown hover:bg-deep-brown text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}

                      // className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-warm-brown hover:bg-deep-brown text-white rounded-md mb-4"
                    >
                      Checkout
                    </button>
                  </Link>
                  <Link href="/allProducts">
                    <button className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-warm-brown/40 text-gray-800 border border-gray-300 rounded-md mb-8">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
