// "use client";

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
  User,
} from "lucide-react";
import Link from "next/link";

interface OrderDetailsViewProps {
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
        name: string;
        imageUrl: string;
        price: number;
        discount: number;
        isFlashSale: boolean;
        flashSalePrice: number | null;
      };
    }>;
    shop: {
      name: string;
      logo: string;
    };
    user: {
      name: string;
      email: string;
    };
    coupon?: {
      code: string;
      discountAmount: number;
    };
  };
}

const OrderDetailsView = ({ order }: OrderDetailsViewProps) => {
  console.log(order);
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

  const orderDate = format(new Date(order?.createdAt), "PPP p");
  return (
    <motion.div
      className="max-w-4xl mx-auto p-2 space-y-2"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Back Button and Order ID */}
      <div className="flex justify-between items-center">
        <Link href="/vendor/orders">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Badge variant="outline" className="text-sm font-mono">
          Order #{order?.id}
          {/* Order #{order?.id.slice(0, 8)} */}
        </Badge>
      </div>

      {/* Order Status and Date */}
      <motion.div variants={itemAnimation}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Order Date
                </p>
                <p className="font-medium text-xs">
                  {orderDate}
                  {/* {order?.createdAt} */}
                </p>
              </div>
            </div>

            <Badge
              className={`uppercase ${
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

      {/* shipping and Customer Info */}
      <div className="grid md:grid-cols-2 gap-2">
        <motion.div variants={itemAnimation}>
          <Card>
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
                  <p className="font-medium text-sm">
                    {order?.shippingInfo?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-sm">
                    {order?.shippingInfo.address}, {order?.shippingInfo?.city}
                  </p>
                  <p className="font-medium text-sm ">
                    {order?.shippingInfo.country},{" "}
                    {order?.shippingInfo?.postalCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemAnimation}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{order?.user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {order?.user?.email}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Shipping Information */}

      {/* Order Items */}
      <motion.div variants={itemAnimation}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {order?.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="h-20 w-20 relative rounded-md overflow-hidden">
                    <Image
                      src={item?.product.imageUrl}
                      alt={item?.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item?.product?.name}</h3>
                    <p className="text-sm text-muted-foreground">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Information */}
      <motion.div variants={itemAnimation}>
        <Card>
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
                  {/* <span>${order?.totalPrice.toFixed(2)}</span> */}
                  <span>{totalCalculatedPrice}</span>
                </div>

                {order?.coupon && (
                  <div className="flex justify-between text-green-600 text-sm font-bold">
                    <span className="flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      Coupon ({order?.coupon.code})
                    </span>
                    <span>-${order?.coupon.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$2.00</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${finalPrice}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsView;
