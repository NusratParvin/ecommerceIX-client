"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import moment from "moment";
import { Spinner } from "@/components/ui/spinner";
import { useGetAdminDashboardRecentReviewsInfoQuery } from "@/redux/features/analytics/analyticsApi";

type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  isDeleted: boolean;
};

export const RecentReviews = () => {
  const {
    data: recentReviewsData,
    isLoading,
    error,
  } = useGetAdminDashboardRecentReviewsInfoQuery(undefined);

  const recentReviews = recentReviewsData?.data || [];

  const getRatingBadge = (rating: number) => {
    if (rating >= 4) {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <Star className="w-3 h-3 mr-1 fill-green-700" />
          {rating}
        </Badge>
      );
    } else if (rating >= 3) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          <Star className="w-3 h-3 mr-1 fill-yellow-700" />
          {rating}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <Star className="w-3 h-3 mr-1 fill-red-700" />
          {rating}
        </Badge>
      );
    }
  };

  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-none">
      <div className="border-b border-dashed border-slate-300 p-6">
        <h3 className="text-lg font-semibold">Recent Reviews</h3>
        <p className="text-sm text-gray-500 mt-1">Latest customer feedback</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-sm text-red-600">
          Failed to load recent reviews
        </div>
      ) : recentReviews.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500">
          No recent reviews found
        </div>
      ) : (
        <TooltipProvider>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-dashed border-slate-300 hover:bg-transparent">
                  <TableHead className="font-semibold text-gray-700">
                    Product ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Rating
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Comment
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReviews.slice(0, 8).map((review: Review) => (
                  <TableRow
                    key={review.id}
                    className="border-b border-dashed border-slate-300 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help font-mono text-xs">
                            #{review.productId.slice(0, 8)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{review.productId}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell>{getRatingBadge(review.rating)}</TableCell>

                    {/* <TableCell className="max-w-xs">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-gray-600 truncate cursor-help">
                            {review.comment}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p className="text-xs">{review.comment}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell> */}

                    <TableCell className="text-sm text-gray-600">
                      {moment(review.createdAt).format("MMM DD, YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};
