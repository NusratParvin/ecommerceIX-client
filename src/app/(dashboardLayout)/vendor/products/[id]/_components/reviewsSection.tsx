import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  MessageSquare,
  Star,
  User,
  Calendar,
  TrendingUp,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Product, TReview } from "@/types";

interface ReviewsSectionProps {
  product: Product;
}

export const ReviewsSection = ({ product }: ReviewsSectionProps) => {
  const reviews = product?.reviews || [];

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA; // Newest first
  });

  const hasReviews = sortedReviews.length > 0;

  const averageRating = hasReviews
    ? sortedReviews.reduce((acc: number, review: TReview) => {
        return acc + (parseFloat(String(review?.rating)) || 0);
      }, 0) / sortedReviews.length
    : 0;

  // Vendor metrics
  const positiveReviews = sortedReviews.filter(
    (review) => (review?.rating || 0) >= 4
  ).length;
  const criticalReviews = sortedReviews.filter(
    (review) => (review?.rating || 0) <= 2
  ).length;
  const positivePercentage = hasReviews
    ? Math.round((positiveReviews / sortedReviews.length) * 100)
    : 0;
  const criticalPercentage = hasReviews
    ? Math.round((criticalReviews / sortedReviews.length) * 100)
    : 0;

  return (
    <Card className="border border-dashed border-slate-300 rounded-none shadow-lg h-full flex flex-col">
      <CardHeader className="bg-slate-50 border-b shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-slate-700" />
            <span className="text-slate-800 text-lg">Customer Feedback</span>
          </div>
          {hasReviews && (
            <Badge
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1 bg-white border"
            >
              <span className="font-semibold text-slate-800">
                {sortedReviews.length}
              </span>
              <span className="text-slate-500 text-sm">Reviews</span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col min-h-0">
        {!hasReviews ? (
          <div className="text-center py-8 flex-1 flex items-center justify-center">
            <div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-700 mb-1">
                No Customer Reviews Yet
              </h3>
              <p className="text-slate-500 text-sm">
                Customer reviews will appear here once customers start reviewing
                this product.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            {/* Metrics Section - Fixed Height */}
            <div className="shrink-0">
              <div className="grid grid-cols-6 justify-between items-center gap-4">
                {/* 3-Column Metrics Row */}
                <div className="grid grid-cols-3 gap-2 col-span-4">
                  {/* Average Rating */}
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-xl font-bold text-slate-800">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Average Rating
                    </div>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(averageRating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Positive Reviews */}
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-xl font-bold text-green-700">
                        {positiveReviews}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Positive (4-5★)
                    </div>
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      {positivePercentage}%
                    </div>
                  </div>

                  {/* Needs Attention */}
                  <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-xl font-bold text-amber-700">
                        {criticalReviews}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Needs Attention (1-2★)
                    </div>
                    <div className="text-xs text-amber-600 font-semibold mt-1">
                      {criticalPercentage}%
                    </div>
                  </div>
                </div>

                {/* Rating Distribution - Compact */}
                <div className="bg-slate-100 shadow-md rounded-lg p-3 col-span-2">
                  <h4 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    Rating Distribution
                  </h4>
                  <div className="space-y-0">
                    {[5, 4, 3, 2, 1].map((starRating) => {
                      const count = sortedReviews.filter(
                        (review) => review?.rating === starRating
                      ).length;
                      const percentage = hasReviews
                        ? (count / sortedReviews.length) * 100
                        : 0;

                      return (
                        <div
                          key={starRating}
                          className="flex items-center gap-0 text-xs"
                        >
                          <div className="flex items-center gap-1 w-8">
                            <span className="font-medium text-slate-700 ">
                              {starRating}
                            </span>
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mb-1" />
                          </div>
                          <div className="flex-1 bg-white rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                starRating >= 4
                                  ? "bg-green-400"
                                  : starRating >= 3
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-slate-600 w-12 text-right text-xs">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Reviews Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2 shrink-0">
                <User className="w-3 h-3" />
                Customer Reviews ({sortedReviews.length})
              </h4>

              <div className="flex-1 min-h-0 overflow-y-auto">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-1"
                >
                  {sortedReviews.map((review: TReview) => (
                    <AccordionItem
                      key={review?.id}
                      value={review?.id || `review-${Math.random()}`}
                      className="border border-slate-100 rounded-none bg-slate-100/60 px-3 hover:bg-slate-100 transition-colors"
                    >
                      <AccordionTrigger className="py-3 hover:no-underline [&[data-state=open]]:border-b [&[data-state=open]]:border-slate-200 [&[data-state=open]]:pb-3">
                        <div className="flex items-center justify-between w-full pr-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Avatar className="w-8 h-8 border border-slate-200 shrink-0">
                              <AvatarImage
                                src={review?.user?.profilePhoto}
                                alt={review?.user?.name}
                              />
                              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-medium text-slate-800 text-sm truncate">
                                {review?.user?.name || "Customer"}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {review?.createdAt
                                    ? format(
                                        new Date(review.createdAt),
                                        "MMM d, yyyy"
                                      )
                                    : "Recent"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`
                              shrink-0 text-xs
                              ${
                                (review?.rating || 0) >= 4
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : (review?.rating || 0) >= 3
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            `}
                          >
                            {review?.rating || 0}.0 ★
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-3 pb-3">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                          className="pl-11 pr-3"
                        >
                          {review?.comment ? (
                            <div>
                              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                                {review.comment}
                              </p>
                            </div>
                          ) : (
                            <p className="text-slate-500 italic text-sm">
                              No comment provided
                            </p>
                          )}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
