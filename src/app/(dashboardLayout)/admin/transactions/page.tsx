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
import { BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TTransaction } from "@/types";
import { useGetAdminTransactionsQuery } from "@/redux/features/transactions/transactionsApi";

const AdminTransactionsPage = () => {
  const initialSortBy = "createdAt";
  const initialSortOrder = "desc";
  const initialSearchTerm = "";
  const initialPage = 1;

  //   const [userId, setUserId] = useState<string | null>(null);
  //   const [orderId, setOrderId] = useState<string | null>(null);
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [page, setPage] = useState(1);
  //   const [limit] = useState(10);
  //   const [sortBy, setSortBy] = useState("createdAt");
  //   const [sortOrder, setSortOrder] = useState("desc");

  const [userId, setUserId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const { data, isLoading, error } = useGetAdminTransactionsQuery({
    page,
    limit,
    userId,
    orderId,
    searchTerm,
    sortBy,
    sortOrder,
  });

  const transactions = data?.data || [];
  const totalRecords = data?.meta?.total || 0;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, userId, orderId, sortBy, sortOrder]);

  const resetFilters = () => {
    setSearchTerm(initialSearchTerm);
    setPage(initialPage);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    // Optionally reset userId and orderId if needed
    setUserId(null);
    setOrderId(null);
  };

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        <h1 className="text-2xl font-semibold text-charcoal">Transactions</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-around items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search by Transaction ID or User Email"
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
              <SelectItem value="orderId">Order</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
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

        <Button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Reset </span>
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="flex-grow border rounded-lg p-4 shadow-md">
        {isLoading ? (
          <Spinner />
        ) : transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Total Records: <span className="font-medium">{totalRecords}</span>
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map(
                  (transaction: TTransaction, index: number) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="text-xs">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.user.name}</TableCell>
                      <TableCell className="text-xs">
                        {transaction.order ? transaction.order.id : "N/A"}
                      </TableCell>
                      <TableCell className="text-green-600">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded ${
                            transaction.paymentStatus === "PAID"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-white">
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )
                )}
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

export default AdminTransactionsPage;
