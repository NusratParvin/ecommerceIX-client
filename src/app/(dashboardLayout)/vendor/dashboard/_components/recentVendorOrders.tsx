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

const recentOrders = [
  {
    id: "1",
    product: "Gaming Laptop",
    customer: "John Doe",
    status: "Paid",
    amount: "$1,999.00",
    date: "2024-02-20",
  },
  {
    id: "2",
    product: "Wireless Earbuds",
    customer: "Jane Smith",
    status: "Processing",
    amount: "$129.00",
    date: "2024-02-19",
  },
  {
    id: "3",
    product: "Smart Watch",
    customer: "Bob Johnson",
    status: "Shipped",
    amount: "$299.00",
    date: "2024-02-18",
  },
];

export function RecentVendorOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
