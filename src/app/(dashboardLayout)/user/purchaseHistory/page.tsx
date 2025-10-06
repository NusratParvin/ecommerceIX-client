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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetUserOrdersQuery } from "@/redux/features/orders/ordersApi";
import { TOrder } from "@/types";

const UserOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch user orders using a custom hook or RTK Query
  const { data, isLoading, isError } = useGetUserOrdersQuery({
    // userId: "user-id-from-auth-context-or-param",
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
  });
  console.log(data?.data);
  const orders = data?.data || [];
  const totalRecords = data?.meta?.total || 0;

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-4 tracking-tight text-slate-700">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold ">Your Previous Orders</h1>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-2/5 text-xs ">
          <Input
            placeholder="Search by Order ID / product / shop "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-row  gap-4 justify-center items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Sort By:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">{sortBy}</SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="totalPrice">Total Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Order:</label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32">{sortOrder}</SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-grow border border-slate-200/60 rounded-none p-4 shadow-xl min-h-screen text-black">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <div>Error loading orders</div>
        ) : orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <Table>
            <TableHeader className="font-semibold">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: TOrder, index: number) => (
                <TableRow key={order?.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{order?.id}</TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order?.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order?.paymentStatus === "PAID"
                          ? "bg-green-600 hover:bg-green-600"
                          : "bg-red-600  hover:bg-red-600"
                      }
                    >
                      {order?.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/user/purchaseHistory/${order?.id}`}>
                      <Eye className="h-4 w-4 text-deep-brown/70" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="mt-auto flex justify-between items-center bg-transparent p-4">
        <Button
          variant="outline"
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= totalRecords}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserOrdersPage;
