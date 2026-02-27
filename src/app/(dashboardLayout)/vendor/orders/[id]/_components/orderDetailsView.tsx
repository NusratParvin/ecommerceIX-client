// "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Package,
  CreditCard,
  Tag,
  Truck,
  User,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import moment from "moment";
import OrderProductsTable from "./orderProductsTable";
import { Product, TShop, TTransaction } from "@/types";

export interface OrderDetailsType {
  id: string;
  userId: string;
  shopId: string;
  totalPrice: number;
  paymentStatus: "PAID" | "UNPAID";
  paymentMethod: string;
  couponId?: string;
  shippingInfo: {
    city: string;
    name: string;
    address: string;
    country: string;
    postalCode: string;
  };
  createdAt: string | Date;

  // Relations
  user: {
    id: string;
    name: string;
    email: string;
  };
  shop?: TShop;
  coupon?: {
    id: string;
    code: string;
    discountAmount: number;
    expirationDate: string;
    createdAt: string;
  };
  items: Array<{
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product & {
      category: {
        id: string;
        name: string;
        imageUrl: string;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
      };
      shop: {
        id: string;
        name: string;
        description: string;
        logo?: string;
        ownerId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  }>;
  transaction?: TTransaction[];
  Transaction?: TTransaction[];
}

export interface OrderDetailsViewProps {
  order: OrderDetailsType;
}

export interface OrderDetailsViewProps {
  order: OrderDetailsType;
}
const OrderDetailsView = ({ order }: OrderDetailsViewProps) => {
  // console.log(order);
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  if (!order || !order.createdAt) {
    console.error("Order or order.createdAt is undefined.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateTotal = (items: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.reduce((acc: number, item: any) => {
      let itemPrice = item.product.price;
      if (item.product.isFlashSale) {
        itemPrice = item.product.price - item.product.flashSalePrice;
      } else if (item.product.discount > 0) {
        itemPrice =
          item.product.price -
          (item.product.price * item.product.discount) / 100;
      }
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  const totalCalculatedPrice = calculateTotal(order?.items);

  const finalPrice = (
    totalCalculatedPrice -
    (order?.coupon?.discountAmount || 0) +
    7
  ).toFixed(2);

  return (
    <motion.div
      className="w-full p-2 space-y-2 text-black/80"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Back Button and Order ID */}
      <div className="flex sm:flex-row flex-col sm:items-center items-start sm:justify-between justify-start">
        <p className="text-base text-slate-700 font-bold ">Order Details</p>
        <Link href="/vendor/orders">
          <Button size="sm" variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>

      {/* Order Status and Date */}
      <motion.div variants={itemAnimation}>
        <Card className=" border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start sm:justify-between justify-start gap-2">
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm font-mono text-slate-800 font-semibold">
                Order ID # {order?.id}
              </p>
              <div className="flex flex-row justify-start items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-700 mb-1" />

                <p className="font-medium text-xs">
                  {moment(order?.createdAt).format("MMMM D, YYYY [at] h:mm a")}
                </p>
              </div>
            </div>

            <Badge
              className={`uppercase px-5 py-1 ${
                order?.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-600 hover:bg-white"
                  : "bg-red-100 text-red-600 hover:bg-white"
              }`}
            >
              {order?.paymentStatus}
            </Badge>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Order Items */}
      <motion.div variants={itemAnimation}>
        <Card className=" border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
            <Package className="h-5 w-5 mb-1" />
            Order Items
          </CardTitle>
          <CardContent>
            {/* <div className="space-y-0">
              {order?.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="h-20 w-20 relative rounded-md overflow-hidden">
                    <Image
                      src={item?.product.imageUrl || ""}
                      alt={item?.product.name || "Product image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item?.product?.name}</h3>
                    <p className="text-sm text-slate-500">
                      Quantity: {item?.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {item?.product.discount > 0 && (
                        <Badge variant="secondary" className="text-red-600">
                          {item?.product.discount}% OFF
                        </Badge>
                      )}
                      {item?.product.isFlashSale && (
                        <Badge variant="secondary" className="text-red-600">
                          Flash Sale : ${item?.product?.flashSalePrice}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      $
                      {item?.product.isFlashSale
                        ? (
                            (item?.product.price -
                              (item?.product.flashSalePrice || 0)) *
                            item?.quantity
                          ).toFixed(2)
                        : item?.product.discount > 0
                        ? (
                            (item?.product.price -
                              (item?.product.price * item?.product.discount) /
                                100) *
                            item?.quantity
                          ).toFixed(2)
                        : (item?.product.price * item?.quantity).toFixed(2)}
                    </p>
                    {(item?.product.isFlashSale ||
                      item?.product.discount > 0) && (
                      <p className="text-sm text-red-400 line-through">
                        ${(item?.product.price * item?.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
            <OrderProductsTable order={order} />
          </CardContent>
        </Card>
      </motion.div>

      {/* shipping and Customer Info */}
      <div className="grid md:grid-cols-2 gap-2">
        <motion.div variants={itemAnimation} className="flex-1">
          <Card className="border border-dashed border-slate-300 rounded-none shadow-sm h-full">
            <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
              <Truck className="h-5 w-5 mb-1" />
              Shipping Information
            </CardTitle>
            <CardContent>
              <div className="grid grid-cols-1  gap-1 p-1 ps-5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Customer Name:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.shippingInfo?.name}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Address:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.shippingInfo?.address}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    City:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.shippingInfo?.city}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Country:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.shippingInfo?.country}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Postal Code:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.shippingInfo?.postalCode}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemAnimation} className="flex-1">
          <Card className=" border border-dashed border-slate-300 rounded-none shadow-sm h-full">
            <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
              <User className="h-5 w-5 mb-1" />
              Customer Information
            </CardTitle>
            <CardContent>
              <div className="grid grid-cols-1  gap-1 p-1 ps-5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Customer Name:
                  </span>
                  <span className="text-sm font-medium truncate">
                    {order?.user?.name}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Customer Email:
                  </span>
                  <span className="text-sm font-medium italic">
                    {order?.user?.email}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Shipping Information */}

      {/* Payment Information */}

      <motion.div variants={itemAnimation}>
        <Card className="border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
            <CreditCard className="h-5 w-5" />
            Payment & Earnings Breakdown
          </CardTitle>
          <CardContent className=" text-sm ps-11">
            <div className="space-y-2">
              {/* Payment Status */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Status</span>
                <Badge
                  className={`uppercase ${
                    order?.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-600 border-green-200"
                      : "bg-red-100 text-red-600 border-red-200"
                  }`}
                >
                  {order?.paymentStatus}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Method</span>
                <Badge variant="outline" className="uppercase">
                  {order?.paymentMethod}
                </Badge>
              </div>

              <Separator />

              {/* Customer Payment Breakdown */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Paid
                </h4>
                <div className="space-y-2 bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalCalculatedPrice.toFixed(2)}</span>
                  </div>

                  {order?.coupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Coupon ({order?.coupon.code})
                      </span>
                      <span>-${order?.coupon.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>$2.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total Paid by Customer</span>
                    <span>${finalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Vendor Earnings Breakdown */}
              <div className="pt-6   ">
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 mb-1" />
                  Your Earnings
                </h4>
                <div className="space-y-2 bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Order Subtotal</span>
                    <span>${totalCalculatedPrice.toFixed(2)}</span>
                  </div>

                  {order?.coupon && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Coupon Discount</span>
                      <span>-${order?.coupon.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Platform Fee (10%)</span>
                    <span className="text-red-600">
                      -$
                      {(
                        (totalCalculatedPrice -
                          (order?.coupon?.discountAmount || 0)) *
                        0.1
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Transaction Fee (2.9%)</span>
                    <span className="text-red-600">
                      -$
                      {(
                        (totalCalculatedPrice -
                          (order?.coupon?.discountAmount || 0)) *
                        0.029
                      ).toFixed(2)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-green-700">
                    <span>Net Earnings</span>
                    <span>
                      $
                      {(
                        totalCalculatedPrice -
                        (order?.coupon?.discountAmount || 0) -
                        (totalCalculatedPrice -
                          (order?.coupon?.discountAmount || 0)) *
                          0.1 -
                        (totalCalculatedPrice -
                          (order?.coupon?.discountAmount || 0)) *
                          0.029
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              {order?.Transaction?.[0] && (
                <>
                  <Separator />
                  <div className="space-y-2 text-xs pt-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction ID:</span>
                      <span className="font-mono">
                        {order.Transaction[0].id}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-slate-500">Stripe Payment ID:</span>
                      <span className="font-mono truncate ml-2">
                        {order.Transaction[0].stripePaymentIntentId}
                      </span>
                    </div> */}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Paid By:</span>
                      <span className="font-semibold">
                        {order?.user?.name}{" "}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Paid Date:</span>
                      <span>
                        {moment(order.Transaction[0].createdAt).format(
                          "MMM D, YYYY [at] h:mm a",
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsView;
