/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Ticket,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  Percent,
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
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useUpdateCouponMutation,
} from "@/redux/features/coupons/couponsApi";
import { Spinner } from "@/components/ui/spinner";
import { TCoupon } from "@/types";
import CouponsTable from "./_components/couponTable";
import PaginationComponent from "./_components/couponPagination";
import CreateCouponDialog from "./_components/createCoupon";
import EditCouponDialog from "./_components/editCoupon";
import ViewCouponDialog from "./_components/viewCoupon";

const ITEMS_PER_PAGE = 10;

const AdminCouponsPage = () => {
  // State
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountAmount: "",
    expirationDate: "",
    // minOrderAmount: "",
    // maxUsage: "",
    // description: "",
  });
  const [editCoupon, setEditCoupon] = useState<TCoupon | null>(null);
  const [viewCoupon, setViewCoupon] = useState<TCoupon | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "expired"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  // API Calls
  const { data, isLoading, isError, refetch } =
    useGetAllCouponsQuery(undefined);
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = data?.data || [];
  const totalCoupons = coupons.length;

  // Filter and sort coupons
  const { filteredCoupons, activeCoupons, expiredCoupons } = useMemo(() => {
    const filtered = coupons.filter((coupon: TCoupon) => {
      const matchesSearch = coupon.code
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isActive = new Date(coupon.expirationDate) > new Date();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "expired" && !isActive);
      return matchesSearch && matchesStatus;
    });

    const sorted = filtered.sort((a: TCoupon, b: TCoupon) => {
      let aValue: any = a[sortBy as keyof TCoupon];
      let bValue: any = b[sortBy as keyof TCoupon];

      if (sortBy === "createdAt" || sortBy === "expirationDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    const active = coupons.filter(
      (coupon: TCoupon) => new Date(coupon.expirationDate) > new Date()
    ).length;
    const expired = coupons.filter(
      (coupon: TCoupon) => new Date(coupon.expirationDate) <= new Date()
    ).length;

    return {
      filteredCoupons: sorted,
      activeCoupons: active,
      expiredCoupons: expired,
    };
  }, [coupons, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handlers
  const handleInputChange = (field: keyof typeof newCoupon, value: string) => {
    setNewCoupon((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditChange = (field: keyof TCoupon, value: string) => {
    setEditCoupon((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleDialogClose = () => {
    setNewCoupon({
      code: "",
      discountAmount: "",
      expirationDate: "",
    });
    setDialogOpen(false);
  };

  const handleCreate = async () => {
    if (
      !newCoupon.code ||
      !newCoupon.discountAmount ||
      !newCoupon.expirationDate
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const discount = parseFloat(newCoupon.discountAmount);
    if (isNaN(discount) || discount <= 0) {
      toast.error("Discount amount must be a positive number.");
      return;
    }

    const formattedData = {
      code: newCoupon.code.trim(),
      discountAmount: discount,
      expirationDate: new Date(newCoupon.expirationDate).toISOString(),
    };

    const toastId = toast.loading("Creating coupon...");

    try {
      await createCoupon(formattedData).unwrap();
      toast.success("Coupon created successfully!", { id: toastId });
      handleDialogClose();
      setCurrentPage(1);
    } catch (error: any) {
      toast.error("Failed to create coupon.", { id: toastId });
    }
  };

  const handleUpdate = async () => {
    if (!editCoupon) return;

    const updatedDiscount = parseFloat(editCoupon.discountAmount.toString());
    if (isNaN(updatedDiscount)) {
      toast.error("Invalid discount amount.");
      return;
    }

    const toastId = toast.loading("Updating coupon...");

    try {
      await updateCoupon({
        ...editCoupon,
        discountAmount: updatedDiscount,
      }).unwrap();
      toast.success("Coupon updated successfully!", { id: toastId });
      setEditDialogOpen(false);
      setEditCoupon(null);
    } catch (error: any) {
      toast.error("Failed to update coupon.", { id: toastId });
    }
  };

  const handleDelete = async (id: string, code: string) => {
    const toastId = toast.loading("Deleting coupon...");
    try {
      await deleteCoupon(id).unwrap();
      toast.success(`Coupon ${code} deleted successfully!`, { id: toastId });
      if (paginatedCoupons.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error: any) {
      toast.error("Failed to delete coupon.", { id: toastId });
    }
  };

  const handleViewCoupon = (coupon: TCoupon) => {
    setViewCoupon(coupon);
    setViewDialogOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Loading and Error States
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Spinner />
        <p className="text-sm text-gray-600">Loading Coupons...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 font-semibold">
                Failed to load coupons.
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
              <Ticket className="w-4 h-4" />
              <h1 className="text-lg font-semibold tracking-tight">
                Coupon Management
              </h1>
            </div>
            <p className="text-sm text-muted-foreground ps-5">
              Manage and monitor all discount coupons
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2 bg-white text-deep-brown hover:bg-slate-600 hover:text-white"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Ticket className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Total Coupons
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCoupons}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Percent className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Active Coupons
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {activeCoupons}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-16">
            <CardContent className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Expired Coupons
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {expiredCoupons}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search coupons by code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  Status:{" "}
                  {statusFilter === "all"
                    ? "All"
                    : statusFilter === "active"
                    ? "Active"
                    : "Expired"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Coupons
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                  Expired Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="expirationDate">Expiration</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="discountAmount">Discount</SelectItem>
              </SelectContent>
            </Select>

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

        {/* Table with Pagination */}
        <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen flex flex-col">
          <div className="flex-grow">
            <CouponsTable
              coupons={paginatedCoupons}
              searchTerm={searchTerm}
              onEditCoupon={(coupon) => {
                setEditCoupon(coupon);
                setEditDialogOpen(true);
              }}
              onDeleteCoupon={handleDelete}
              onViewCoupon={handleViewCoupon}
            />
          </div>

          {/* Pagination at the bottom of the container */}
          {filteredCoupons.length > 0 && (
            <div className="mt-auto pt-4">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                totalCoupons={totalCoupons}
                activeCoupons={activeCoupons}
                expiredCoupons={expiredCoupons}
                totalRecords={filteredCoupons.length}
                currentItemsCount={paginatedCoupons.length}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        {/* Dialogs */}
        <CreateCouponDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          newCoupon={newCoupon}
          onInputChange={handleInputChange}
          onCreate={handleCreate}
        />

        <EditCouponDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          editCoupon={editCoupon}
          onEditChange={handleEditChange}
          onUpdate={handleUpdate}
        />

        <ViewCouponDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          viewCoupon={viewCoupon}
          onEditClick={() => {
            setViewDialogOpen(false);
            if (viewCoupon) {
              setEditCoupon(viewCoupon);
              setEditDialogOpen(true);
            }
          }}
        />
      </div>
    </TooltipProvider>
  );
};

export default AdminCouponsPage;
