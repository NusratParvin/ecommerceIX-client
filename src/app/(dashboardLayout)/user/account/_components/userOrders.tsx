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
import { Spinner } from "@/components/ui/spinner";

interface UserOrdersProps {
  orders?: TOrder[];
  isOrdersLoading?: boolean;
  isOrdersError?: boolean;
}

export function UserOrders({
  orders = [],
  isOrdersLoading,
  isOrdersError,
}: UserOrdersProps) {
  if (!orders) return null;
  if (isOrdersLoading) {
    return (
      <div className="text-center py-8 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
        <Spinner />
      </div>
    );
  }

  if (isOrdersError) {
    return (
      <div className="text-center py-8 text-red-600">
        Failed to load orders.
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
        You have no recent orders.
      </div>
    );
  }

  return (
    <Card className="bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 3).map((order, index: number) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-semibold">{order.id}</TableCell>
                <TableCell>
                  {moment(order.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell
                  className={
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {order.paymentStatus}
                </TableCell>
                <TableCell className="font-bold font-sans">
                  ${order.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
