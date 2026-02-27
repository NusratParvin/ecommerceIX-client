"use client";

import { useState, useEffect } from "react";
import { Package, Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types";

import Link from "next/link";
import {
  useDeleteProductMutation,
  useGetProductsForVendorQuery,
} from "@/redux/features/products/productsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Zap, Percent } from "lucide-react";
import { ProductSearch } from "./_components/serach";
import { ProductTable } from "./_components/table";
import { useRouter } from "next/navigation";
// import { ProductDrawer } from "./_components/drawer";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const ITEMS_PER_PAGE = 10;

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();

  const user = useAppSelector(useCurrentUser);
  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading, error, refetch } = useGetProductsForVendorQuery(
    {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sortBy,
      sortOrder,
      searchTerm: searchQuery,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !user?.email,
    },
  );

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch, currentPage, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  if (!user?.email || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600 mb-4">No products found</p>
        <Link
          href="/vendor/products/addProduct"
          className="flex items-center bg-deep-brown hover:bg-warm-brown text-white py-2 px-4 rounded-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Product
        </Link>
      </div>
    );
  }

  const unfilteredProducts = data?.data || [];
  const products = unfilteredProducts.filter(
    (product: Product) => !product.isDeleted,
  );
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  // console.log(products);

  // Handle delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success("Product deleted successfully!");
        refetch();
      }
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  // const handleViewProduct = (product: Product) => {
  //   setSelectedProduct(product);
  //   setIsDrawerOpen(true);
  // };

  // console.log(error);

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-2">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:items-center items-start md:justify-between justify-start">
        {/* Left side: Icon + Title */}
        <div className="flex items-center gap-1">
          <Package className="w-4 h-4 mb-0" />
          <h1 className="text-lg font-semibold text-slate-700">Products</h1>
        </div>

        {/* Right side: Button + Total count */}
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm">
            Total products: {totalRecords}
          </p>
          <Link
            href="/vendor/products/addProduct"
            className="flex items-center bg-deep-brown hover:bg-slate-500 text-xs text-white py-1.5 px-4 rounded-md"
          >
            <Plus className="w-3 h-3 mr-1 " />
            Add Product
          </Link>
        </div>
      </div>

      {/* Search, Sort & Filter */}
      <div className="flex md:flex-row flex-wrap justify-between items-center gap-4 mb-6 w-full">
        {/* Search Input */}
        {/* <div className="w-full max-w-sm"> */}
        <ProductSearch value={searchQuery} onChange={setSearchQuery} />
        {/* </div> */}

        {/* Sort By Dropdown */}

        {/* <div className="flex md:flex-row flex-wrap gap-4 md:justify-center justify-start items-center border  "> */}

        <div className="flex flex-col sm:flex-row lg:gap-4 md:gap-12 gap-4 lg:justify-center justify-start items-start md:items-center md:w-auto w-full ">
          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto ">
            <label htmlFor="sortBy" className="text-sm font-medium w-16">
              Sort By:
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              {/* <SelectTrigger className="w-full md:w-48 "> */}
              <SelectTrigger className="w-full md:w-40 h-8 text-xs px-2 focus:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="isFlashSale">On Flash Sale</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
            <label
              htmlFor="sortOrder"
              className="text-sm font-medium text-gray-900 w-16"
            >
              Order:
            </label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-40 h-8 text-xs px-2 focus:ring-0">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen">
        <ProductTable
          products={products?.map((product: Product) => ({
            ...product,
            flashSaleIcon: product.isFlashSale ? (
              <Zap className="w-4 h-4 text-green-500" />
            ) : (
              <Zap className="w-4 h-4 text-gray-400" />
            ),
            discountIcon:
              product.discount && product.discount > 0 ? (
                <Percent className="w-4 h-4 text-green-500" />
              ) : (
                <Percent className="w-4 h-4 text-gray-400" />
              ),
          }))}
          onEdit={(product) =>
            router.push(`/vendor/products/editProduct/${product.id}`)
          }
          onDelete={(product) => handleDeleteProduct(product.id)}
          // onView={handleViewProduct}
          onView={(product) => router.push(`/vendor/products/${product.id}`)}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      {/* Pagination */}
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
      </div>
      {/* <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedProduct(null);
        }}
      /> */}
    </div>
  );
};

export default ProductManagement;
