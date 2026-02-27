"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Package,
  CreditCard,
  Tag,
  Truck,
  Store,
  Shield,
} from "lucide-react";
import Link from "next/link";
import moment from "moment";
import { Product, TShop, TTransaction } from "@/types";
import CustomerOrderProductsTable from "./customerOrderProductsTable";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CustomerOrderDetailsType {
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

export interface CustomerOrderDetailsViewProps {
  order: CustomerOrderDetailsType;
}

export const UserOrderDetails = ({ order }: CustomerOrderDetailsViewProps) => {
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

  const calculateTotal = () => {
    return order?.items.reduce((acc, item) => {
      let itemPrice = item?.product?.price;
      if (item?.product?.isFlashSale && item?.product?.flashSalePrice) {
        itemPrice = item?.product?.price - item?.product?.flashSalePrice;
      } else if (item?.product?.discount > 0) {
        itemPrice =
          item?.product?.price -
          (item?.product?.price * item?.product?.discount) / 100;
      } else {
        itemPrice = item?.product?.price;
      }
      return acc + itemPrice * item?.quantity;
    }, 0);
  };

  const subtotal = calculateTotal();
  const shipping = 5;
  const tax = 2;
  const discount = order?.coupon?.discountAmount || 0;
  const total = subtotal - discount + shipping + tax;

  // console.log(subtotal);
  return (
    <motion.div
      className="w-full   p-2 space-y-2  text-black/80 "
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Header */}
      <div className="flex sm:flex-row flex-col gap-3  sm:justify-between justify-start sm:items-center items-start">
        <div className="flex items-center gap-1">
          <Package className="w-4 h-4 mb-0" />
          <p className="text-base text-slate-700 font-bold">Order Details</p>
        </div>

        <Link href="/user/purchaseHistory">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4 transform transition-transform duration-200 hover:-translate-x-2" />
            Back to Purchase History
          </Button>
        </Link>
      </div>

      {/* Order Status and Date */}
      <motion.div variants={itemAnimation}>
        <Card className="border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardHeader className="flex sm:flex-row flex-col gap-3  sm:justify-between justify-start sm:items-center ">
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm font-mono text-slate-800 font-semibold">
                Order # {order?.id}
              </p>
              <div className="flex flex-row justify-start items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-700 mb-1" />
                <p className="font-medium text-xs">
                  Placed on{" "}
                  {moment(order?.createdAt).format("MMMM D, YYYY [at] h:mm a")}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end items-start gap-2">
              <Badge
                className={`uppercase px-5 py-1 ${
                  order?.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-600 hover:bg-white"
                    : "bg-red-100 text-red-600 hover:bg-white"
                }`}
              >
                {order?.paymentStatus}
              </Badge>
              <p className="text-xs text-slate-500">Payment Status</p>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Order Items */}
      <motion.div variants={itemAnimation}>
        <Card className="border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
            <Package className="h-5 w-5 mb-1" />
            Order Items
          </CardTitle>
          <CardContent>
            {/* <CustomerOrderProductsTable order={order} />
             */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] font-medium">
                    Product
                  </TableHead>
                  <TableHead className="text-center font-medium">
                    Category
                  </TableHead>
                  <TableHead className="text-center font-medium">
                    Quantity
                  </TableHead>
                  <TableHead className="text-center font-medium">
                    Original Price
                  </TableHead>
                  <TableHead className="text-center font-medium">
                    Savings
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    Total
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.items?.map((item, index) => (
                  <CustomerOrderProductsTable
                    key={item.id || index}
                    item={item}
                    order={order}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shop Information and Shipping Info */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Shop Information */}
        <motion.div variants={itemAnimation} className="flex-1">
          <Card className="border border-dashed border-slate-300 rounded-none shadow-sm h-full">
            <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
              <Store className="h-5 w-5 mb-1" />
              Shop Information
            </CardTitle>
            <CardContent>
              <div className="grid grid-cols-1 gap-1 p-1 ps-5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Shop Name:
                  </span>
                  <span className="text-sm font-medium text-deep-brown hover:cursor-pointer">
                    <Link href={`/shop/${order?.shop?.id}`}>
                      {order?.shop?.name || "N/A"}
                    </Link>
                  </span>
                </div>
                {order?.shop?.logo && (
                  <div className="mt-2">
                    <div className="h-16 w-16 relative rounded-md overflow-hidden">
                      <Image
                        src={order.shop.logo}
                        alt={order.shop.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipping Information */}
        <motion.div variants={itemAnimation} className="flex-1">
          <Card className="border border-dashed border-slate-300 rounded-none shadow-sm h-full">
            <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
              <Truck className="h-5 w-5 mb-1" />
              Shipping Information
            </CardTitle>
            <CardContent>
              <div className="grid grid-cols-1 gap-1 p-1 ps-5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Full Name:
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
      </div>

      {/* Payment Summary */}
      <motion.div variants={itemAnimation}>
        <Card className="border border-dashed border-slate-300 rounded-none shadow-sm">
          <CardTitle className="flex items-center gap-2 text-slate-700 p-4 pb-3">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
          <CardContent className="text-sm ps-11">
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
                  {order?.paymentMethod === "card"
                    ? "Credit Card"
                    : order?.paymentMethod}
                </Badge>
              </div>

              <Separator />

              {/* Order Total Breakdown */}
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Order Total
                </h4>
                <div className="space-y-2 bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Items Subtotal</span>
                    <span>${subtotal}</span>
                  </div>

                  {order?.coupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Coupon Savings ({order?.coupon.code})
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

                  <div className="flex justify-between font-bold text-base">
                    <span>Total Paid</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              {order?.Transaction?.[0] && (
                <>
                  <Separator />
                  <div className="space-y-2 text-xs pt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction ID:</span>
                      <span className="font-mono text-xs">
                        {order.Transaction[0].id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Date:</span>
                      <span>
                        {moment(order.Transaction[0].createdAt).format(
                          "MMM D, YYYY [at] h:mm a",
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Support Information */}
              <div className="pt-4 border-t">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    Need help with your order?{" "}
                    {/* <Link
                      href="/support"
                      className="text-blue-600 hover:underline"
                    > */}
                    Contact Support
                    {/* </Link> */}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* .............................. */}
    </motion.div>
  );
};
