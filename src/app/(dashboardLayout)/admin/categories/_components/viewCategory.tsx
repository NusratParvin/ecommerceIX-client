"use client";

import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Calendar, Pencil, Package, Eye } from "lucide-react";
import { TCategory } from "@/types";

interface ViewCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: TCategory | null;
  onEdit: (category: TCategory) => void;
}

interface StatBoxProps {
  count: number;
  label: string;
  color: "blue" | "green" | "red" | "yellow";
}

export default function ViewCategory({
  open,
  onOpenChange,
  category,
  onEdit,
}: ViewCategoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] md:max-w-4xl h-4/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>
            View and manage category information
          </DialogDescription>
        </DialogHeader>

        {category && (
          <div className="space-y-6 py-4">
            {/* Category Header */}
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                  src={category.imageUrl || ""}
                  alt={category.name}
                  fill
                  className="object-cover rounded-lg border"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {category.name}
                    </h2>

                    <div className="flex items-center gap-3 mt-2">
                      <Badge
                        variant={category.isDeleted ? "destructive" : "default"}
                        className={
                          !category.isDeleted
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {category.isDeleted ? "Deleted" : "Active"}
                      </Badge>

                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>{category.products?.length || 0} products</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(category)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Category Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Category ID
                  </label>
                  <div className="p-2 bg-gray-50 rounded border text-sm font-mono text-gray-600">
                    {category.id}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Created: {moment(category.createdAt).format("MMM DD, YYYY")}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Updated: {moment(category.updatedAt).format("MMM DD, YYYY")}
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {category.products?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Total products in this category
                    </p>
                  </div>

                  <Link
                    href="/admin/products"
                    className="flex gap-1 text-xs items-center px-4 py-2 border shadow-sm hover:shadow-md"
                  >
                    <Eye className="h-4 w-4" />
                    View Products
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {category.products && category.products.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quick Stats
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatBox
                    label="Active"
                    count={
                      category.products.filter((p) => p.status === "ACTIVE")
                        .length
                    }
                    color="blue"
                  />
                  <StatBox
                    label="On Sale"
                    count={
                      category.products.filter((p) => p.isFlashSale).length
                    }
                    color="green"
                  />
                  <StatBox
                    label="Out of Stock"
                    count={
                      category.products.filter((p) => p.stock === 0).length
                    }
                    color="red"
                  />
                  <StatBox
                    label="Low Stock"
                    count={
                      category.products.filter(
                        (p) => p.stock < 10 && p.stock > 0,
                      ).length
                    }
                    color="yellow"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StatBox({ count, label, color }: StatBoxProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className={`text-center p-3 border rounded-lg ${colorClasses[color]}`}>
      <div className="text-lg font-bold">{count || 0}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}
