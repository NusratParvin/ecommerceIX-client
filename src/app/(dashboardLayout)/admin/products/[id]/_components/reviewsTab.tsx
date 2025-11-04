import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MessageSquare } from "lucide-react";
import { Product, TReview } from "@/types";
import Image from "next/image";
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StarDisplay from "@/components/shared/starRating";

export const ReviewsTab = ({ product }: { product: Product }) => {
  const reviews = product.reviews || [];

  // Sort reviews by date (most recent first)
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const reviewCount = sortedReviews.length;
  const averageRating =
    reviewCount > 0
      ? sortedReviews.reduce((acc, review) => acc + review.rating, 0) /
        reviewCount
      : 0;

  if (reviewCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              No ratings
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              This product has not received any reviews yet. Customer reviews
              will appear here once they start sharing their experiences.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customer Reviews</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {averageRating.toFixed(1)} ({reviewCount})
          </Badge>
        </CardTitle>
        <CardDescription>
          {reviewCount} reviews found for this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sortedReviews.map((review: TReview) => (
            <AccordionItem key={review.id} value={review.id}>
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {review.user?.profilePhoto ? (
                        <Image
                          src={review.user.profilePhoto}
                          alt={review.user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <Users className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{review.user?.name}</p>
                      <p className="text-xs text-gray-500">
                        {moment(review.createdAt).format("MMMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarDisplay rating={review.rating} />
                    <span className="text-sm font-medium ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pl-13">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
