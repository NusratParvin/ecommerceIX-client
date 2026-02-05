"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleUpdateQuantity } from "@/lib/addCartUtils";
import { CartSummary } from "./_components/cartSummary";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  // console.log(cart.vendorId);

  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    handleUpdateQuantity(dispatch, productId, newQuantity);
  };

  // console.log(FinalTotalPrice, "cart");
  return (
    <>
      <div className="h-16" />
      <div className="py-5 bg-slate-600/80 text-white tracking-tight">
        <div className="flex flex-row  items-center justify-between w-11/12 mx-auto px-4">
          <h1 className="text-2xl font-medium">Shopping Cart</h1>
        </div>
      </div>

      <div className="min-h-screen md:w-11/12 w-full mx-auto bg-white py-4 mb-20">
        {cart.items.length === 0 ? (
          <p className="text-gray-600 my-20 text-base text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Cart Items */}
            <div className="md:col-span-2 bg-slate-50 border border-dashed border-slate-300 p-4  ">
              {cart.items.map((cartItem) => (
                <div
                  key={cartItem.productInfo.id}
                  className="grid grid-cols-4 items-center justify-between bg-white p-2 rounded-none mb-4 shadow"
                >
                  <div className="flex items-start gap-4 col-span-2">
                    {/* Product Image */}
                    <div className="w-24 h-24 shrink-0 bg-gray-200  ">
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
                      <h3 className="text-lg font-semibold text-slate-700 pt-1">
                        {cartItem.productInfo.name}
                      </h3>
                      <p className="text-base text-gray-500 pt-2">
                        Regular Price: ${cartItem.productInfo.price.toFixed(2)}
                      </p>
                      {/* Second row: Display discount or flash sale details */}
                      <div className="text-xs text-gray-500 font-medium font-sans">
                        {cartItem.productInfo.discount > 0 && (
                          <span className="text-red-500 text-xs">
                            **{cartItem.productInfo.discount}% discounted
                          </span>
                        )}
                        {cartItem.productInfo.isFlashSale && (
                          <span className="text-red-500 text-xs">
                            **Flash Sale! $
                            {(
                              cartItem.productInfo.price -
                              (cartItem.productInfo.flashSalePrice ?? 0)
                            ).toFixed(2)}{" "}
                            off
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-5 justify-center items-center col-span-1">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none "
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.productInfo.id,
                            cartItem.quantity - 1,
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-xl font-medium">
                        {cartItem.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.productInfo.id,
                            cartItem.quantity + 1,
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <button
                      className="text-base text-red-500 mt-1"
                      onClick={() =>
                        dispatch(removeFromCart(cartItem.productInfo.id))
                      }
                    >
                      <Trash2 />
                    </button>
                  </div>
                  {/* Item Total */}
                  <div className="text-right text-lg font-semibold text-slate-800 col-span-1 font-sans">
                    <p className="text-2xl text-slate-800 pe-4">
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
                          {
                            // cartItem.productInfo.price -
                            (
                              cartItem?.productInfo?.flashSalePrice ?? 0
                            ).toFixed(2)
                          }
                        </>
                      ) : (
                        // If neither, show the regular price
                        <>${cartItem.productInfo.price.toFixed(2)}</>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
