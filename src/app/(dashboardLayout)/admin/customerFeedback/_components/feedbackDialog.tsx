// "use client";

// import { TReview } from "@/types";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import {
//   Star,
//   User,
//   Package,
//   Store,
//   Calendar,
//   MessageSquare,
// } from "lucide-react";
// import Image from "next/image";
// import StarDisplay from "@/components/shared/starRating";

// interface ReviewDialogProps {
//   review: TReview | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const FeedbackDialog = ({
//   review,
//   isOpen,
//   onClose,
// }: ReviewDialogProps) => {
//   if (!review) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
//           <DialogTitle className="text-xl">
//             Customer Feedback Details
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6 mt-4">
//           {/* Review Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-3 ps-5">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Rating</p>
//                 <div className="mt-2 flex items-center">
//                   <StarDisplay rating={review.rating} />
//                   <span className="ps-2">({review.rating.toFixed(1)})</span>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-gray-600">Status</p>
//                 <Badge
//                   className={`mt-1 ${
//                     review.isDeleted
//                       ? "bg-red-50 text-red-700 border-red-200"
//                       : "bg-green-50 text-green-700 border-green-200"
//                   }`}
//                 >
//                   {review.isDeleted ? "DELETED" : "ACTIVE"}
//                 </Badge>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-gray-500" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Reviewed On
//                   </p>
//                   <p className="text-sm">
//                     {new Date(review.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Comment Section */}
//           {review.comment && (
//             <div className="p-4 bg-blue-50 rounded-lg">
//               <div className="flex items-center gap-2 mb-3">
//                 <MessageSquare className="w-4 h-4 text-blue-600" />
//                 <h3 className="font-medium text-blue-900">Customer Comment</h3>
//               </div>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {review.comment}
//               </p>
//             </div>
//           )}

//           {/* Product Information */}
//           {review.product && (
//             <div className="p-4 bg-green-50 rounded-lg">
//               <div className="flex items-center gap-2 mb-3">
//                 <Package className="w-4 h-4 text-green-600" />
//                 <h3 className="font-medium text-green-900">
//                   Product Information
//                 </h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   {review.product.imageUrl && (
//                     <Image
//                       src={review.product.imageUrl}
//                       alt={review.product.name}
//                       width={60}
//                       height={60}
//                       className="object-cover rounded"
//                     />
//                   )}
//                   <div>
//                     <p className="font-medium text-sm">{review.product.name}</p>
//                     {review.product.shop && (
//                       <div className="flex items-center gap-1 mt-1">
//                         <Store className="w-3 h-3 text-gray-500" />
//                         <p className="text-xs text-gray-600">
//                           {review.product.shop.name}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* User Information */}
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center gap-2 mb-3">
//               <User className="w-4 h-4 text-gray-600" />
//               <h3 className="font-medium text-gray-900">User Information</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Name</p>
//                 <p className="text-sm">{review.user?.name || "Anonymous"}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Email</p>
//                 <p className="text-sm">{review.user?.email || "N/A"}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

"use client";

import { TReview } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  User,
  Package,
  Store,
  MessageSquare,
  ShoppingBag,
  Shield,
  Clock,
  Edit3,
  DollarSign,
  Database,
  Layers,
  FileText,
} from "lucide-react";
import Image from "next/image";
import StarDisplay from "@/components/shared/starRating";
import moment from "moment";

interface ReviewDialogProps {
  review: TReview | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackDialog = ({
  review,
  isOpen,
  onClose,
}: ReviewDialogProps) => {
  if (!review) return null;

  const formatDate = (dateString: string | Date) => {
    return moment(dateString).format("MMM DD, YYYY • hh:mm A");
  };

  const getTimeAgo = (dateString: string | Date) => {
    return moment(dateString).fromNow();
  };

  const getDetailedTime = (dateString: string | Date) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm:ss a");
  };

  const getUserMemberSince = (dateString: string | Date) => {
    return moment(dateString).format("MMM YYYY");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Feedback Details</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Comprehensive customer review details
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 ">
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Rating Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Rating</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-blue-900">
                      {review.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-blue-600">/ 5.0</span>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="mt-2 flex">
                <StarDisplay rating={review.rating} size="w-4 h-4" />
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Status</p>
                  <p className="text-lg font-semibold text-green-900 mt-1">
                    {review.isDeleted ? "Archived" : "Active"}
                  </p>
                </div>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <Badge
                className={`mt-2 text-xs ${
                  review.isDeleted
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {review.isDeleted ? "DELETED" : "LIVE"}
              </Badge>
            </div>

            {/* Comment Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Feedback
                  </p>
                  <p className="text-lg font-semibold text-purple-900 mt-1">
                    {review.comment ? "With Comment" : "Rating Only"}
                  </p>
                </div>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                <Edit3 className="w-3 h-3" />
                {review.comment ? `${review.comment.length} chars` : "No text"}
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">
                    Submitted
                  </p>
                  <p className="text-sm font-semibold text-orange-900 mt-1">
                    {getTimeAgo(review.createdAt)}
                  </p>
                </div>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <p className="text-xs text-orange-600 mt-2">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* Left Column - Customer & Review Details */}
            <div className="lg:col-span-2 space-y-2">
              {/* Customer Feedback Section */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Customer Feedback
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted {getTimeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  {review.comment ? (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                        {review.comment}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">
                        No comment provided
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Customer left a rating without additional feedback
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information Section */}
              {review.product && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Product Details
                      </h3>
                      <p className="text-sm text-gray-500">
                        Added{" "}
                        {review.product.createdAt &&
                          getTimeAgo(review.product.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {review.product.imageUrl && (
                        <div className="flex-shrink-0">
                          <Image
                            src={review.product.imageUrl}
                            alt={review.product.name}
                            width={80}
                            height={80}
                            className="object-cover rounded-lg border shadow-sm"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {review.product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {review.product.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              review.product.status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {review.product.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                ${review.product.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {review.product.stock} in stock
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600">
                                Product:{" "}
                                {review.product.rating?.toFixed(1) || "N/A"}
                              </span>
                            </div>
                            {review.product.discount > 0 && (
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-red-600">
                                  {review.product.discount}% off
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Shop Information */}
                        {review.product.shop && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Store className="w-3 h-3 text-gray-400" />
                              <span className="text-xs font-medium text-gray-700">
                                Sold by
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {review.product.shop.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {review.product.shop.description}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {review.product.shop.status}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Database className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Record Information
                    </h3>
                    <p className="text-sm text-gray-500">
                      Internal tracking and reference numbers
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 py-2 ">
                    <label className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      Review ID
                    </label>
                    <code className="text-xs bg-gray-50 px-3 py-1 rounded border truncate flex-1">
                      {review.id}
                    </code>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <label className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      User ID
                    </label>
                    <code className="text-xs bg-gray-50 px-3 py-1 rounded border truncate flex-1 ">
                      {review.userId}
                    </code>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2  ">
                    <label className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      Product ID
                    </label>
                    <code className="text-xs bg-gray-50 px-3 py-1 rounded border truncate flex-1">
                      {review.productId}
                    </code>
                  </div>

                  {review.product?.shop && (
                    <div className="flex items-center justify-between gap-4 py-2  ">
                      <label className="text-xs font-medium text-gray-500 whitespace-nowrap">
                        Shop ID
                      </label>
                      <code className="text-xs bg-gray-50 px-3 py-1 rounded border truncate flex-1">
                        {review.product.shop.id}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Metadata & User Info */}
            <div className="space-y-2">
              {/* User Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reviewer</h3>
                    <p className="text-sm text-gray-500">
                      {review.user?.createdAt &&
                        `Member since ${getUserMemberSince(
                          review.user.createdAt
                        )}`}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {review.user?.profilePhoto ? (
                      <Image
                        src={review.user.profilePhoto}
                        alt={review.user.name}
                        width={48}
                        height={48}
                        className="rounded-full border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.user?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {review.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Role</span>
                      <Badge variant="outline" className="text-xs">
                        {review.user?.role}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          review.user?.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {review.user?.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Member for</span>
                      <span className="text-xs text-gray-700">
                        {review.user?.createdAt &&
                          moment(review.user.createdAt).fromNow(true)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Timeline</h3>
                    <p className="text-sm text-gray-500">Activity history</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Review Submitted
                        </p>
                        <p className="text-xs text-gray-500">
                          {getDetailedTime(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Last Updated
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.updatedAt
                            ? getDetailedTime(review.updatedAt)
                            : "Never modified"}
                        </p>
                      </div>
                    </div> */}
                    {review.user?.createdAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            User Registered
                          </p>
                          <p className="text-xs text-gray-500">
                            {getDetailedTime(review.user.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                    {review.product?.createdAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            Product Created
                          </p>
                          <p className="text-xs text-gray-500">
                            {getDetailedTime(review.product.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
