/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { MessageSquare, Search } from "lucide-react";
import { TReview } from "@/types";
import {
  useDeleteReviewMutation,
  useGetAllProductsReviewQuery,
} from "@/redux/features/reviews/reviewsApi";
import { Badge } from "@/components/ui/badge";
import { FeedbackDialog } from "./_components/feedbackDialog";
import { FeedbackPagination } from "./_components/feedbackPagination";
import { FeedbackTable } from "./_components/feedbackTable";

const CustomerFeedbacks = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<TReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetAllProductsReviewQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm,
  });

  const reviews = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  const [deleteReview] = useDeleteReviewMutation();
  console.log(reviews);
  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, sortOrder]);

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete review.");
    }
  };

  const handleViewReview = (review: TReview) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const activeReviews = reviews.filter(
    (review: TReview) => !review.isDeleted
  ).length;
  const deletedReviews = reviews.filter(
    (review: TReview) => review.isDeleted
  ).length;

  return (
    <div className="min-h-screen bg-gray-50/30 p-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <MessageSquare className="w-4 h-4" />
            <h1 className="text-lg font-semibold tracking-tight">
              Customer Feedback
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Manage and monitor all product reviews and ratings
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Search Input */}
        <div className="w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews by user name or product name..."
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
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="product.name">Product Name</SelectItem>
                <SelectItem value="user.name">User Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32 h-9">
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

      {/* Reviews Table */}
      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-2 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Spinner />
              <p className="text-sm text-gray-600 mt-2">Loading reviews...</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No reviews found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <FeedbackTable
              reviews={reviews}
              currentPage={page}
              itemsPerPage={limit}
              onViewReview={handleViewReview}
              onDeleteReview={handleDeleteReview}
            />

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-end gap-2 p-4 border-t">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {totalRecords} Total
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {activeReviews} Active
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700">
                {deletedReviews} Deleted
              </Badge>
            </div>

            {/* Pagination */}
            <FeedbackPagination
              currentPage={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              currentItemsCount={reviews.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Review Details Dialog */}
      <FeedbackDialog
        review={selectedReview}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedReview(null);
        }}
      />
    </div>
  );
};

export default CustomerFeedbacks;
