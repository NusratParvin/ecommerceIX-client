"use client";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import moment from "moment";
import { TablePagination } from "./tablePagination";
import { Check, Eye, Trash2, X } from "lucide-react";
import { useState } from "react";

interface ProductTableProps {
  products: Product[];
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
  onDelete: (product: Product) => void;
  onUpdateStatus: (id: string, status: "ACTIVE" | "HIDDEN") => void;
  onView: (product: Product) => void;
  onPageChange: (page: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  page,
  limit,
  totalPages,
  totalRecords,
  onDelete,
  onUpdateStatus,
  onView,
  onPageChange,
}) => {
  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMM DD, YYYY");
  };

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [confirmingProductId, setConfirmingProductId] = useState<string | null>(
    null
  );

  const handleDeleteRequest = (productId: string) => {
    setConfirmingProductId(productId);
  };

  const cancelDelete = () => {
    setConfirmingProductId(null);
  };

  const confirmDelete = (product: Product) => {
    setConfirmingProductId(null);
    onDelete(product);
  };

  //   const getStatusBadge = (status: string | undefined) => {
  //     switch (status) {
  //       case "ACTIVE":
  //         return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  //       case "HIDDEN":
  //         return (
  //           <Badge variant="outline" className="text-orange-600">
  //             Hidden
  //           </Badge>
  //         );
  //       default:
  //         return <Badge variant="secondary">{status || "Unknown"}</Badge>;
  //     }
  //   };

  const getSaleBadge = (isFlashSale: boolean, discount?: number) => {
    const hasDiscount = discount && discount > 0;

    if (isFlashSale && hasDiscount) {
      return (
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
          Flash & Discount
        </Badge>
      );
    } else if (isFlashSale) {
      return (
        <Badge className="bg-purple-100 text-purple-800">Flash Sale</Badge>
      );
    } else if (hasDiscount) {
      return <Badge className="bg-blue-100 text-blue-800">Discount</Badge>;
    } else {
      return <Badge variant="outline">Regular</Badge>;
    }
  };
  // Calculate counts for current page
  const activeCount = products.filter((p) => p.status === "ACTIVE").length;
  const hiddenCount = products.filter((p) => p.status === "HIDDEN").length;

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="text-slate-800">
            <TableRow>
              <TableHead className="w-12 text-center font-bold">#</TableHead>
              <TableHead className="w-16 font-bold">Image</TableHead>
              <TableHead className="min-w-[200px] font-bold">Product</TableHead>
              <TableHead className="min-w-[120px] font-bold">Shop</TableHead>
              <TableHead className="min-w-[100px] font-bold">Price</TableHead>
              <TableHead className="min-w-[80px] font-bold">Stock</TableHead>
              <TableHead className="text-center min-w-[90px] font-bold">
                <div className="flex items-center gap-2 justify-center font-bold">
                  Status
                  <input
                    type="checkbox"
                    checked={isEditingStatus}
                    onChange={(e) => setIsEditingStatus(e.target.checked)}
                    className="cursor-pointer"
                  />
                </div>
              </TableHead>
              <TableHead className="min-w-[100px] font-bold">Type</TableHead>
              <TableHead className="min-w-[100px] font-bold">Created</TableHead>
              <TableHead className="text-right min-w-[80px] font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product, index: number) => (
              <TableRow key={product.id} className="hover:bg-gray-50/50">
                <TableCell className="text-center font-medium text-gray-600">
                  {(page - 1) * limit + index + 1}
                </TableCell>
                {/* Product Image */}
                <TableCell>
                  <div className="w-12 h-12 relative">
                    <Image
                      src={product.imageUrl || "/placeholder-image.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                </TableCell>

                {/* Product Info */}
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">
                      {product.name}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {product.category?.name}
                    </div>
                  </div>
                </TableCell>

                {/* Shop */}
                <TableCell>
                  <div className="text-sm text-gray-900">
                    {product.shop?.name}
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell>
                  <div className="flex flex-col font-semibold">
                    $ {product.price}
                  </div>
                </TableCell>

                {/* Stock */}
                <TableCell>
                  <div
                    className={`font-semibold ${
                      product.stock < 10 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {product.stock}
                  </div>
                </TableCell>

                {/* Status
                <TableCell>{getStatusBadge(product.status)}</TableCell> */}

                {/* Product Status */}
                <TableCell className="text-center">
                  {product.isDeleted ? (
                    <span
                      className="px-2 py-1 rounded-md text-xs font-semibold bg-gray-200 text-gray-600"
                      title="Product is deleted and cannot be edited"
                    >
                      DELETED
                    </span>
                  ) : isEditingStatus ? (
                    <select
                      value={product.status}
                      onChange={(e) =>
                        onUpdateStatus(
                          product.id,
                          e.target.value as "ACTIVE" | "HIDDEN"
                        )
                      }
                      className="p-1 text-xs border rounded"
                      disabled={product.isDeleted}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  )}
                </TableCell>

                {/* Sale Type */}
                <TableCell>
                  {getSaleBadge(product.isFlashSale, product.discount)}
                </TableCell>

                {/* Created Date */}
                <TableCell className="text-sm text-gray-600">
                  {formatDate(product.createdAt)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right ">
                  <div className="flex justify-end gap-0">
                    {confirmingProductId === product.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(product)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelDelete}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRequest(product.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer with Pagination and Status */}
      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={totalRecords}
        currentItems={products.length}
        activeCount={activeCount}
        hiddenCount={hiddenCount}
        onPageChange={onPageChange}
      />
    </>
  );
};
