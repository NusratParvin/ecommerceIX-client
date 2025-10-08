/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Router, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrdersByShopQuery } from "@/redux/features/orders/ordersApi";
import { TOrder } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminOrdersPage = () => {
  // Filters and sorting states
  const [userId, setUserId] = useState<string | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetOrdersByShopQuery({
    // shopId,
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm,
  });
  // console.log(data, error);
  const orders = data?.data || [];
  const totalRecords = data?.meta?.total || 0;

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 mb-1" />
        <h1 className="text-2xl font-semibold text-charcoal">Orders</h1>
      </div>

      {/* Filters */}
      <div className="flex  justify-around items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Input
            placeholder="Search by Order ID or Coupon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-900">Sort By:</label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <span>{sortBy}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="userId">User</SelectItem>
              <SelectItem value="shopId">Shop</SelectItem>
              <SelectItem value="totalPrice">Total Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order By Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-900">Order:</label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-32">
              <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="flex-grow border rounded-lg p-4 shadow-md min-h-screen">
        {isLoading ? (
          <Spinner />
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Total Records: <span className="font-medium">{totalRecords}</span>
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Shop</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>#Items Bought</TableHead>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {orders.map((order: TOrder, index: number) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell className="text-green-600">
                      {order.shop.name}
                    </TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-blue-600">
                      {order.items.length}
                    </TableCell>
                    <TableCell>
                      {order.coupon ? (
                        <Badge className="bg-red-100 text-red-700">
                          {order.coupon.code}
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500">
                          No Coupon
                        </Badge>
                      )}
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
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="text-warm-brown hover:underline flex items-center gap-2 cursor-pointer">
                        <Link href={`/vendor/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex justify-between items-center bg-transparent p-4">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * limit >= totalRecords}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
