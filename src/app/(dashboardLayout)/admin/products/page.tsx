"use client";

import { useState, useEffect } from "react";
import { Search, Tags } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types";

import {
  useDeleteProductMutation,
  useGetProductsForAdminQuery,
  useUpdateProductStatusMutation,
} from "@/redux/features/products/productsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ProductTable } from "./_components/table";
import { ProductDrawer } from "./_components/drawer";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const { data, isLoading, error } = useGetProductsForAdminQuery({
    page: currentPage,
    limit: 10,
    sortBy,
    sortOrder,
    searchTerm,
  });
  const products = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / 10) : 1;

  console.log(searchTerm);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  // Handle delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Product deleted successfully!");
      }
    } catch {
      toast.error("Failed to delete product.");
    }
  };
  // Handle update status product
  const handleUpdateStatusProduct = async (
    id: string,
    status: "ACTIVE" | "HIDDEN"
  ) => {
    try {
      console.log("Updating status:", id, status);
      const res = await updateProductStatus({ id, status }).unwrap();
      console.log("Response:", res);
      if (res.success) {
        toast.success("Product status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update product status.");
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="flex flex-col min-h-screen container mx-auto p-0">
      {/* Header */}
      <div className="flex flex-row   items-center gap-2 mb-4">
        <Tags className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-deep-brown">Products</h1>
      </div>

      {/* Search, Sort & Filter */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search Products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full max-w-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex  items-center space-x-2 w-44">
          <label
            htmlFor="sortBy"
            className="text-sm font-medium text-gray-900 w-20"
          >
            Sort By:
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order Dropdown */}
        <div className="flex items-center space-x-2 w-44">
          <label
            htmlFor="sortOrder"
            className="text-sm font-medium text-gray-900"
          >
            Order:
          </label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger>
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <p className="text-muted-foreground p-4">
          Total Products: {products.length}
        </p>
        <ProductTable
          products={products.map((product: Product) => ({
            ...product,
          }))}
          onDelete={(product) => handleDeleteProduct(product.id)}
          onUpdateStatus={(id, status) => handleUpdateStatusProduct(id, status)}
          onView={handleViewProduct}
        />
      </div>

      {/* Pagination */}
      {/* {totalPages > 1 && ( */}
      <div className="flex justify-between items-center mt-4">
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {/* )} */}
      </div>

      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default ProductManagement;
