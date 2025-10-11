"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOrder } from "@/types";
import moment from "moment";
import Link from "next/link";

export const RecentVendorOrders = ({
  recentOrders,
}: {
  recentOrders: TOrder[];
}) => {
  return (
    <Card className="col-span-5 bg-white border border-dashed border-slate-300 rounded-none shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">#</TableHead>
              <TableHead className="font-bold">Order ID</TableHead>
              <TableHead className="font-bold">Product</TableHead>
              <TableHead className="font-bold">Total Price</TableHead>
              <TableHead className="font-bold">Payment Status</TableHead>
              <TableHead className="font-bold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.slice(0, 4).map((order, index: number) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="hover:underline">
                  <Link href={`/vendor/orders/${order.id}`}>
                    {order.id.slice(0, 8)}
                  </Link>
                </TableCell>
                <TableCell className="text-deep-brown">
                  {order.items
                    .slice(0, 3)
                    .map((item) => item.product?.name)
                    .join(", ")}
                  {order.items.length > 3 && " ..."}
                </TableCell>
                <TableCell className="font-semibold font-sans">
                  ${order.totalPrice.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>{" "}
                <TableCell>
                  {moment(order.createdAt).format("MMM Do YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
