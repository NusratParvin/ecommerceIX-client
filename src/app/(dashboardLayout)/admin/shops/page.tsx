/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Filter,
  RefreshCw,
  Users,
  Package,
  Store,
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
import {
  useGetAllShopsQuery,
  useUpdateShopStatusMutation,
} from "@/redux/features/shops/shopsApi";
import { Spinner } from "@/components/ui/spinner";
import { TShopInputProp } from "@/types";
import ShopsTable from "./_components/shopsTable";
import ShopsPagination from "./_components/shopsPagination";
import ViewShopDialog from "./_components/viewShop";

const ITEMS_PER_PAGE = 10;

const AdminShopsPage = () => {
  // State
  const [viewShop, setViewShop] = useState<TShopInputProp | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ACTIVE" | "BLACKLISTED" | "RESTRICTED" | "DELETED"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  // API Calls
  const { data, isLoading, isError, refetch } = useGetAllShopsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sortBy,
    sortOrder,
    searchTerm,
  });

  const [updateShopStatus] = useUpdateShopStatusMutation();

  const shops = data?.data || [];
  const totalRecords = data?.meta?.totalRecords || 0;
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
  // console.log(data?.meta);
  // Calculate statistics
  const { activeShops, restrictedShops, totalProducts, totalFollowers } =
    useMemo(() => {
      const active = shops.filter(
        (shop: TShopInputProp) => shop.status === "ACTIVE",
      ).length;
      const restricted = shops.filter(
        (shop: TShopInputProp) =>
          shop.status === "RESTRICTED" || shop.status === "BLACKLISTED",
      ).length;
      const products = shops.reduce(
        (sum: number, shop: TShopInputProp) => sum + (shop.productCount ?? 0),
        0,
      );
      const followers = shops.reduce(
        (sum: number, shop: TShopInputProp) => sum + (shop.followerCount ?? 0),
        0,
      );

      return {
        activeShops: active,
        restrictedShops: restricted,
        totalProducts: products,
        totalFollowers: followers,
      };
    }, [shops]);

  // Filter shops based on status
  const filteredShops = useMemo(() => {
    return shops.filter((shop: TShopInputProp) => {
      return statusFilter === "all" || shop.status === statusFilter;
    });
  }, [shops, statusFilter]);

  const handleStatusChange = async (shopId: string, newStatus: string) => {
    try {
      await updateShopStatus({ shopId, status: newStatus }).unwrap();
      toast.success(`Shop status updated to ${newStatus}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update shop status");
    }
  };

  const handleViewShop = (shop: TShopInputProp) => {
    setViewShop(shop);
    setViewDialogOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Loading and Error States
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Spinner />
        <p className="text-sm text-gray-600">Loading Shops...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 font-semibold">
                Failed to load shops.
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
              <ShoppingCart className="w-4 h-4" />
              <h1 className="text-lg font-semibold tracking-tight">
                Shop Management
              </h1>
            </div>
            <p className="text-sm text-muted-foreground ps-5">
              Manage and monitor all shops
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Store className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Total Shops</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalRecords}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Active Shops
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {activeShops}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Store className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Restricted</p>
                <p className="text-2xl font-bold text-red-600">
                  {restrictedShops}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalProducts}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Total Followers
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalFollowers}
                </p>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search shops by name or owner..."
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
                <Button variant="outline" size="default" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Shops
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("ACTIVE")}>
                  Active Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("BLACKLISTED")}
                >
                  Blacklisted Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("RESTRICTED")}>
                  Restricted Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("DELETED")}>
                  Deleted Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                {/* <SelectItem value="productCount">Products</SelectItem>
                <SelectItem value="followerCount">Followers</SelectItem>
                <SelectItem value="name">Name</SelectItem> */}
                <SelectItem value="ownerId">Owner</SelectItem>
                <SelectItem value="status">Status</SelectItem>
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

        {/* Shops Table */}
        <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen">
          <ShopsTable
            shops={filteredShops}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            searchTerm={searchTerm}
            isEditingStatus={isEditingStatus}
            onViewShop={handleViewShop}
            onStatusChange={handleStatusChange}
            onToggleEditStatus={() => setIsEditingStatus(!isEditingStatus)}
          />

          {/* Pagination */}
          {totalRecords && (
            <ShopsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              currentItemsCount={filteredShops.length}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* View Shop Dialog */}
        <ViewShopDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          shop={viewShop}
        />
      </div>
    </TooltipProvider>
  );
};

export default AdminShopsPage;
