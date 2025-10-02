"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { stripePromise } from "@/lib/stripe";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { clearCart } from "@/redux/features/cart/cartSlice";
import OrderSummary from "./_components/orderSummary";
import ShippingForm from "./_components/shippingForm";
import PaymentForm from "./_components/paymentForm";
import { useProcessOrderAndPaymentMutation } from "@/redux/features/orders/ordersApi";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersApi";
import { ProcessOrderAndPaymentProps, ShippingInfoProps } from "@/types";
import BillingSummary from "./_components/billingSummary";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfoProps | null>(
    null
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const isUser = useAppSelector((state: RootState) => state.auth.user);
  const cart = useAppSelector((state: RootState) => state.cart);
  const { items: cartItems } = cart;

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [processOrderAndPayment] = useProcessOrderAndPaymentMutation();
  const { data: user } = useGetUserByEmailQuery(isUser?.email);

  const totalAmount = searchParams.get("totalPrice")
    ? parseFloat(searchParams.get("totalPrice")!)
    : 0;

  const discountAmount = searchParams.get("discount")
    ? parseFloat(searchParams.get("discount")!)
    : 0;
  // console.log(totalAmount);
  const couponId = searchParams.get("couponId");
  const shopId = searchParams.get("shopId");

  const finalAmount = totalAmount - discountAmount + 5 + 2;

  // console.log(couponId, shopId);

  if (!shopId) {
    toast.error("Shop ID information is missing.");
    return;
  }
  if (!isUser) {
    throw new Error("User is not logged in.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShippingSubmit = async (data: ShippingInfoProps) => {
    try {
      console.log("Shipping Info Submitted:", data);
      setShippingInfo(data);

      // Create Payment Intent
      const response = await createPaymentIntent({
        amount: Math.round(finalAmount * 100),
        userId: user.data.id,
      }).unwrap();

      setClientSecret(response.data.client_secret);
      console.log(response.data);
      setStep(2);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error, "checkout");
      toast.error("Failed to create payment intent. Please try again.");
    }
  };
  // console.log(clientSecret);
  // console.log(user);
  // // **Step 2: Handle Payment Confirmation and Backend API Call**
  const handlePaymentSubmit = async (paymentIntentId: string) => {
    try {
      if (!shippingInfo) {
        toast.error("Shipping information is missing.");
        return;
      }
      if (!shippingInfo) {
        toast.error("Shipping information is missing.");
        return;
      }
      const transformedCartItems = cartItems.map((item) => ({
        productId: item.productInfo.id,
        quantity: item.quantity,
        price: item.productInfo.price,
        shopId: shopId,
      }));

      const payload: ProcessOrderAndPaymentProps = {
        userId: user.data.id,
        shopId,
        items: transformedCartItems,
        totalPrice: finalAmount,
        couponId: couponId || null,
        shippingInfo,
        paymentIntentId,
      };
      // console.log(paymentIntentId, "page");
      // console.log(payload.userId);
      await processOrderAndPayment(payload).unwrap();
      // if (response) {
      // console.log(response);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push("/checkout/success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <>
      <div className="h-16" />
      <div className="py-5 bg-slate-600/80 text-white tracking-tight">
        <div className="flex flex-row  items-center justify-between w-11/12 mx-auto px-4">
          <h1 className="text-2xl font-medium">Checkout</h1>
        </div>
      </div>
      <div className="w-full md:w-11/12 mx-auto mt-4 min-h-screen">
        <div className="grid md:grid-cols-5 justify-center gap-4 ">
          <div className="md:col-span-3">
            {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
            {step === 2 && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSubmit={handlePaymentSubmit}
                />
              </Elements>
            )}
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <OrderSummary items={cartItems} />
            <BillingSummary
              discountAmount={discountAmount}
              totalAmount={Number(totalAmount) || 0}
              finalAmount={finalAmount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
