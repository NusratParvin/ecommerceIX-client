"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  useApplyCouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/features/coupons/couponsApi";
import { TCoupon } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CouponCode } from "./coupon";

export function CartSummary() {
  const user = useAppSelector(useCurrentUser);
  const cart = useSelector((state: RootState) => state.cart);

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
      // itemPrice = price - (flashSalePrice ?? 0);
      itemPrice = flashSalePrice ?? 0;
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
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="bg-slate-50 p-4 pb-4 text-sm flex flex-col items-center justify-center gap-2 border border-dashed border-slate-300 ">
          <h1 className="text-lg font-semibold text-center text-slate-600 border-b border-dashed border-slate-300 w-full mx-1 tracking-tight py-1 mb-2">
            Available Coupons
          </h1>
          <div className="flex flex-wrap gap-2">
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
                    coupon.expirationDate,
                  ).toLocaleDateString()}
                />
              ))
            )}
          </div>
        </div>
        <div className="bg-slate-50 border border-dashed border-slate-300 px-4 py-8">
          <div className="flex border border-slate-200/80 overflow-hidden mb-8">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
              className="w-full outline-none bg-white text-gray-600 text-base px-4 py-2.5"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponCodeApplied || isApplying}
              className={`flex items-center justify-center font-semibold tracking-tight px-4 text-base text-white ${
                couponCodeApplied || isApplying
                  ? "bg-gray-700 hover:bg-gray-500 cursor-not-allowed"
                  : "bg-slate-500 hover:bg-slate-700"
              }`}
            >
              Apply
            </button>
          </div>
          <ul className="text-gray-800 space-y-3 font-sans px-2">
            {couponCodeApplied ? (
              <li className="flex justify-between text-lg">
                Discount <span className="font-bold">-${discountAmount}</span>
              </li>
            ) : (
              <li className="flex justify-between text-lg">
                Discount <span className="font-bold">0</span>
              </li>
            )}
            <li className="flex justify-between text-lg">
              Shipping <span className="font-bold"> $5.00</span>
            </li>
            <li className="flex justify-between text-lg">
              Tax <span className="font-bold">$2.00</span>
            </li>
            <hr />
            <li className="flex justify-between text-lg font-bold">
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
                pathname: !user ? "/login" : "/checkout",
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
                className={` px-4 py-2.5 w-full font-semibold tracking-tight text-lg mb-4 ${
                  user
                    ? "bg-slate-500 hover:bg-slate-700 text-white"
                    : "bg-gray-300 text-gray-500 "
                }`}
              >
                Checkout
              </button>
            </Link>
            <Link href="/allProducts">
              <button className="text-lg px-4 py-2.5 w-full font-semibold tracking-tight bg-slate-500/40 hover:bg-slate-500/80 hover:text-white text-gray-800 mb-8">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
