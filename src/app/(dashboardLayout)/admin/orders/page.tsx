"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Search,
  Filter,
  RefreshCw,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGetOrdersQuery } from "@/redux/features/orders/ordersApi";
import { Spinner } from "@/components/ui/spinner";
import { TOrder } from "@/types";
import ViewOrderDialog from "./_components/viewOrder";
import OrdersPagination from "./_components/ordersPagination";
import OrdersTable from "./_components/ordersTable";

const ITEMS_PER_PAGE = 10;

const AdminOrdersPage = () => {
  const [viewOrder, setViewOrder] = useState<TOrder | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "PAID" | "UNPAID">(
    "all"
  );
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "card" | "cash" | "bank_transfer"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetOrdersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    searchTerm,
    sortBy,
    sortOrder,
  });

  const orders = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  // Calculate statistics
  const { paidOrders, pendingOrders, totalRevenue } = useMemo(() => {
    const paid = orders.filter(
      (order: TOrder) => order.paymentStatus === "PAID"
    ).length;
    const pending = orders.filter(
      (order: TOrder) => order.paymentStatus === "UNPAID"
    ).length;
    const revenue = orders
      .filter((order: TOrder) => order.paymentStatus === "PAID")
      .reduce((sum: number, order: TOrder) => sum + order.totalPrice, 0);

    return {
      paidOrders: paid,
      pendingOrders: pending,
      totalRevenue: revenue,
    };
  }, [orders]);

  // Filter orders based on status and payment method
  const filteredOrders = useMemo(() => {
    return orders.filter((order: TOrder) => {
      const matchesStatus =
        statusFilter === "all" || order.paymentStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || order.paymentMethod === paymentFilter;
      return matchesStatus && matchesPayment;
    });
  }, [orders, statusFilter, paymentFilter]);

  const handleViewOrder = (order: TOrder) => {
    setViewOrder(order);
    setViewDialogOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Loading and Error States
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Spinner />
        <p className="text-sm text-gray-600">Loading Orders...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 font-semibold">
                Failed to load orders.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Please try again later.
              </p>
              <Button
                onClick={() => refetch()}
                className="mt-4"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50 p-2 space-y-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-1 text-slate-700">
              <Package className="w-4 h-4" />
              <h1 className="text-lg font-semibold tracking-tight">
                Order Management
              </h1>
            </div>
            <p className="text-sm text-muted-foreground ps-5">
              Manage and monitor all customer orders
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Card className="h-16">
            <CardContent className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-lg font-bold text-blue-600">
                  {totalRecords}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Paid Orders</p>
                <p className="text-lg font-bold text-green-600">{paidOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-lg font-bold text-yellow-600">
                  {pendingOrders}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-lg font-bold text-purple-600">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search orders by ID, user, or shop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PAID")}>
                  Paid Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("UNPAID")}>
                  Pending Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Method Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  Payment: {paymentFilter === "all" ? "All" : paymentFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPaymentFilter("all")}>
                  All Methods
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter("card")}>
                  Card Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter("cash")}>
                  Cash Only
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setPaymentFilter("bank_transfer")}
                >
                  Bank Transfer Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="totalPrice">Amount</SelectItem>
                <SelectItem value="user.name">Customer</SelectItem>
                <SelectItem value="shop.name">Shop</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Recent First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen flex flex-col">
          <div className="flex-grow">
            {" "}
            <OrdersTable
              orders={filteredOrders}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              searchTerm={searchTerm}
              onViewOrder={handleViewOrder}
            />
          </div>
          {/* Pagination */}
          {totalRecords > 0 && (
            <OrdersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              currentItemsCount={filteredOrders.length}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* View Order Dialog */}
        <ViewOrderDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          order={viewOrder}
        />
      </div>
    </TooltipProvider>
  );
};

export default AdminOrdersPage;
