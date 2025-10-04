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

interface UserOrdersProps {
  orders?: TOrder[];
}

export function UserOrders({ orders }: UserOrdersProps) {
  if (!orders) return null;

  return (
    <Card className="bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                {/* <TableCell>{order.createdAt}</TableCell> */}
                <TableCell>
                  {moment(order.createdAt).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
