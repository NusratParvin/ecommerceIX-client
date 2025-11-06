"use client";

import { TReview } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import moment from "moment";

interface ReviewsTableProps {
  reviews: TReview[];
  currentPage: number;
  itemsPerPage: number;
  onViewReview: (review: TReview) => void;
  onDeleteReview: (id: string) => void;
}

export const FeedbackTable = ({
  reviews,
  currentPage,
  itemsPerPage,
  onViewReview,
  onDeleteReview,
}: ReviewsTableProps) => {
  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-bold">#</TableHead>
              <TableHead className="min-w-32 font-bold">Product</TableHead>
              <TableHead className="min-w-32 font-bold">Product ID</TableHead>
              <TableHead className="min-w-20 font-bold">Image</TableHead>
              <TableHead className="min-w-28 font-bold">Shop</TableHead>
              <TableHead className="min-w-24 font-bold">Rating</TableHead>
              <TableHead className="min-w-28 font-bold">User</TableHead>
              <TableHead className="min-w-24 font-bold">Status</TableHead>
              <TableHead className="min-w-28 font-bold">Date</TableHead>
              <TableHead className="min-w-24 font-bold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review: TReview, index: number) => (
              <TableRow key={review.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>

                {/* Product Name */}
                <TableCell>
                  <div className="">{review.product?.name}</div>
                </TableCell>

                {/* Product ID */}
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded cursor-help">
                        {review.product?.id.slice(0, 8)}...
                      </code>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{review.product?.id}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>

                {/* Product Image */}
                <TableCell>
                  {review.product?.imageUrl ? (
                    <Image
                      src={review.product.imageUrl}
                      alt={review.product.name}
                      width={40}
                      height={40}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </TableCell>

                {/* Shop Name */}
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {review.product?.shop?.name || "N/A"}
                  </span>
                </TableCell>

                {/* Rating */}
                <TableCell>{review.rating}⭐ </TableCell>

                {/* User */}
                <TableCell>
                  <div className="text-sm">
                    {review.user?.name || "Anonymous"}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      review.isDeleted
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }`}
                  >
                    {review.isDeleted ? "DELETED" : "ACTIVE"}
                  </Badge>
                </TableCell>

                {/* Date */}
                <TableCell className="text-sm text-gray-600">
                  {moment(review.createdAt).format("MMM DD, YYYY")}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReview(review)}
                      className="h-8 w-8 p-0"
                      title="View review"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteReview(review.id)}
                      disabled={review.isDeleted}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      title="Delete review"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};
