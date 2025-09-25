"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Package,
  CreditCard,
  Tag,
  Truck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { OrderItemCard } from "./orderItemCard";

interface UserOrderDetailsProps {
  order: {
    id: string;
    createdAt: string;
    totalPrice: number;
    paymentStatus: string;
    paymentMethod: string;
    shippingInfo: {
      name: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
    };
    items: Array<{
      quantity: number;
      price: number;
      product: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        discount: number;
        isFlashSale: boolean;
        flashSalePrice: number | null;
      };
    }>;
    shop: {
      id: string;
      name: string;
      logo: string;
    };
    coupon?: {
      code: string;
      discountAmount: number;
    };
  };
}

export const UserOrderDetails = ({ order }: UserOrderDetailsProps) => {
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
      className="w-full mx-auto p-2 space-y-2  "
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Header */}
      <div className="flex justify-between items-center ">
        <Link href="/user/purchaseHistory">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4 transform transition-transform duration-200 hover:-translate-x-2" />
            Back to Purchase History
          </Button>
        </Link>
        <Badge variant="outline" className="text-lg font-mono border-none">
          {/* Order #{order?.id.slice(0, 8)} */}
          Order# {order?.id}
        </Badge>
      </div>

      {/* Order Status and Date */}
      <motion.div variants={itemAnimation}>
        <Card className="border-slate-200/50 shadow-lg rounded-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {format(new Date(order?.createdAt), "PPP p")}
                </p>
              </div>
            </div>
            <Badge
              variant={
                order?.paymentStatus === "PAID" ? "outline" : "destructive"
              }
              className="uppercase "
            >
              {order?.paymentStatus}
            </Badge>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 justify-center gap-2 items-center">
        {/* Shop Information */}
        <motion.div variants={itemAnimation}>
          <Card className="border-slate-200/50 shadow-lg rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Shop Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/shop/${order?.shop.id}`}>
                <div className="flex items-center gap-4 group">
                  <div className="h-16 w-16 relative rounded-full overflow-hidden">
                    <Image
                      src={order?.shop?.logo}
                      alt={order?.shop?.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium  text-deep-brown  underline">
                      {order?.shop?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">View Shop</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipping Information */}
        <motion.div variants={itemAnimation}>
          <Card className="border-slate-200/50 shadow-lg rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Delivery To</p>
                  <p className="font-medium">{order?.shippingInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {order?.shippingInfo.address}, {order?.shippingInfo.city}
                  </p>
                  <p className="font-medium">
                    {order?.shippingInfo.country},{" "}
                    {order?.shippingInfo.postalCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Items */}
      <motion.div variants={itemAnimation}>
        <Card className="border-slate-200/50 shadow-lg rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {order?.items?.map((item, index) => (
              <OrderItemCard key={index} item={item} />
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Information */}
      <motion.div variants={itemAnimation}>
        <Card className="border-slate-200/50 shadow-lg rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <Badge variant="outline" className="uppercase">
                  {order?.paymentMethod}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {order?.coupon && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Coupon ({order?.coupon.code})
                    </span>
                    <span>-${order?.coupon.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
