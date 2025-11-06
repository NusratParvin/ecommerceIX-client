/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Eye, Search, Trash2, Star } from "lucide-react";
// import { Spinner } from "@/components/ui/spinner";
// import {
//   useDeleteReviewMutation,
//   useGetAllProductsReviewQuery,
// } from "@/redux/features/reviews/reviewsApi";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { TReview } from "@/types";

// const AdminReviews = () => {
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [selectedReview, setSelectedReview] = useState(null);
//   const [selectedReview, setSelectedReview] = useState<TReview | null>(null);

//   const [reviews, setReviews] = useState<TReview[]>([]);

//   const { data, isLoading, error } = useGetAllProductsReviewQuery({
//     page,
//     limit,
//     sortBy,
//     sortOrder,
//     searchTerm,
//   });

//   const updatedReviews = data?.data || [];
//   // const totalRecords = data?.meta?.total || 0;
//   console.log(updatedReviews, error);
//   const [deleteReview] = useDeleteReviewMutation();

//   useEffect(() => {
//     setReviews(updatedReviews);
//   }, [data]);

//   const handleDeleteReview = async (id: string) => {
//     try {
//       await deleteReview(id).unwrap();
//       toast.success("Review deleted successfully!");
//       setReviews(
//         reviews?.map((review: TReview) =>
//           review.id === id ? { ...review, isDeleted: true } : review
//         )
//       );
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
//     } catch (error: any) {
//       toast.error("Failed to delete review.");
//     }
//   };

//   return (
//     <div className="p-2 space-y-2 min-h-screen">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-charcoal">
//           Product Reviews
//         </h1>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
//         {/* Search Input */}
//         <div className="relative w-full max-w-md">
//           <Input
//             placeholder="Search reviews by user name/product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 w-full max-w-md"
//           />
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <Search className="h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="flex  items-center space-x-2 w-44">
//           <label
//             htmlFor="sortBy"
//             className="text-sm font-medium text-gray-900 w-20"
//           >
//             Sort By:
//           </label>
//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger>
//               <SelectValue placeholder="Sort By" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="product.name">Product Name</SelectItem>
//               <SelectItem value="user.name">User Name</SelectItem>
//               <SelectItem value="rating">Rating</SelectItem>
//               <SelectItem value="createdAt">date</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Sort Order Dropdown */}
//         <div className="flex items-center space-x-2 w-44">
//           <label
//             htmlFor="sortOrder"
//             className="text-sm font-medium text-gray-900"
//           >
//             Order:
//           </label>
//           <Select value={sortOrder} onValueChange={setSortOrder}>
//             <SelectTrigger>
//               <SelectValue placeholder="Sort Order" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="asc">Ascending</SelectItem>
//               <SelectItem value="desc">Descending</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border rounded-lg shadow-md overflow-hidden">
//         {isLoading ? (
//           <Spinner />
//         ) : reviews.length === 0 ? (
//           <p className="text-center text-gray-500">No reviews found.</p>
//         ) : (
//           <>
//             <ScrollArea className="h-[calc(100vh-200px)]">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[50px]">#</TableHead>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Image</TableHead>
//                     <TableHead>Shop</TableHead>
//                     <TableHead>Rating</TableHead>
//                     <TableHead>Comment</TableHead>
//                     <TableHead>User</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Created At</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {reviews.map((review, index) => (
//                     <TableRow key={review?.id} className="hover:bg-muted/50">
//                       <TableCell>{(page - 1) * limit + index + 1}</TableCell>
//                       <TableCell className="font-medium">
//                         {review?.product?.name}
//                       </TableCell>
//                       <TableCell>
//                         {review?.product?.imageUrl ? (
//                           <Image
//                             src={review.product.imageUrl}
//                             alt={review.product.name}
//                             width={40}
//                             height={40}
//                             className="object-cover rounded"
//                             priority={false}
//                           />
//                         ) : (
//                           "No Image"
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {review?.product?.shop?.name || "N/A"}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center">
//                           {review?.rating}
//                           <Star
//                             className="w-4 h-4 text-yellow-400 ml-1"
//                             fill="currentColor"
//                           />
//                         </div>
//                       </TableCell>
//                       <TableCell className="max-w-[200px] truncate">
//                         {review?.comment || "No comment"}
//                       </TableCell>
//                       <TableCell>{review?.user?.name || "Anonymous"}</TableCell>
//                       <TableCell>
//                         <Badge
//                           className={`px-2 py-1 rounded-sm text-xs font-medium ${
//                             review?.isDeleted
//                               ? "bg-red-100 text-red-600"
//                               : "bg-green-100 text-green-600"
//                           }`}
//                         >
//                           {review?.isDeleted ? "DELETED" : "ACTIVE"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {new Date(review?.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => setSelectedReview(review)}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteReview(review?.id)}
//                           disabled={review?.isDeleted}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </ScrollArea>
//             <div className="flex justify-between items-center mt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               >
//                 Previous
//               </Button>
//               <span>Page {page}</span>
//               <Button
//                 variant="outline"
//                 onClick={() => setPage((prev) => prev + 1)}
//                 disabled={reviews.length < limit}
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Review Dialog */}
//       {selectedReview && (
//         <Dialog
//           open={!!selectedReview}
//           onOpenChange={() => setSelectedReview(null)}
//         >
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Review Details</DialogTitle>
//               <DialogDescription>
//                 Detailed information about the selected review.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Image
//                   src={selectedReview?.product?.imageUrl as string}
//                   alt={selectedReview?.product?.name as string}
//                   width={80}
//                   height={80}
//                   className="object-cover rounded col-span-1"
//                 />
//                 <div className="col-span-3">
//                   <h3 className="font-semibold">
//                     {selectedReview?.product?.name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {selectedReview?.product?.shop?.name}
//                   </p>
//                 </div>
//               </div>
//               <Separator />
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <span className="font-semibold mr-2">Rating:</span>
//                   <div className="flex items-center">
//                     {selectedReview?.rating}
//                     <Star
//                       className="w-4 h-4 text-yellow-400 ml-1"
//                       fill="currentColor"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <span className="font-semibold">Comment:</span>
//                   <p className="text-sm mt-1">
//                     {selectedReview?.comment || "No comment"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="font-semibold">User:</span>
//                   <p className="text-sm">
//                     {selectedReview?.user?.name || "Anonymous"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="font-semibold">Date:</span>
//                   <p className="text-sm">
//                     {new Date(selectedReview?.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="font-semibold">Status:</span>
//                   <Badge
//                     className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
//                       selectedReview?.isDeleted
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-600"
//                     }`}
//                   >
//                     {selectedReview?.isDeleted ? "DELETED" : "ACTIVE"}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default AdminReviews;
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
import { MessageSquare, Search, Star } from "lucide-react";
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
