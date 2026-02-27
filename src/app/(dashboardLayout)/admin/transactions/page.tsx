/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { BarChart3, Search } from "lucide-react";
import { TTransaction } from "@/types";
import { useGetAdminTransactionsQuery } from "@/redux/features/transactions/transactionsApi";
import { TransactionDrawer } from "./_components/transactionDrawer";
import { Badge } from "@/components/ui/badge";
import { TransactionsTable } from "./_components/transactionTable";
import { TransactionsPagination } from "./_components/transactionPagination";

const AdminTransactionsPage = () => {
  const initialSortBy = "createdAt";
  const initialSortOrder = "desc";
  const initialSearchTerm = "";
  const initialPage = 1;

  const [userId, setUserId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  const totalPages = Math.ceil(totalRecords / limit);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, userId, orderId, sortBy, sortOrder]);

  const handleRowClick = (transaction: TTransaction) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const paidTransactions = transactions.filter(
    (t: TTransaction) => t.paymentStatus === "PAID",
  ).length;
  const pendingTransactions = transactions.filter(
    (t: TTransaction) => t.paymentStatus === "UNPAID",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50/30 p-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <BarChart3 className="w-4 h-4" />
            <h1 className="text-lg font-semibold tracking-tight">
              Transaction Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Monitor and manage all financial transactions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Search Input */}
        <div className="md:w-1/2 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Transaction ID, User Email, or Order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="paymentStatus">Status</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-2 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Spinner />
              <p className="text-sm text-gray-600 mt-2">
                Loading transactions...
              </p>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <TransactionsTable
              transactions={transactions}
              currentPage={page}
              itemsPerPage={limit}
              onRowClick={handleRowClick}
            />

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-end gap-2 p-4 border-t">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {totalRecords} Total
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {paidTransactions} Paid
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {pendingTransactions} Pending
              </Badge>
            </div>

            {/* Pagination */}
            <TransactionsPagination
              currentPage={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              // itemsPerPage={limit}
              currentItemsCount={transactions.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Transaction Details Drawer */}
      <TransactionDrawer
        transaction={selectedTransaction}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
};

export default AdminTransactionsPage;
