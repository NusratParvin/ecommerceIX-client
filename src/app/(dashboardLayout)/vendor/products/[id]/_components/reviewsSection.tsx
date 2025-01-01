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
import { MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product, TReview } from "@/types";

interface ReviewsSectionProps {
  product: Product;
}

export const ReviewsSection = ({ product }: ReviewsSectionProps) => {
  const averageRating =
    product.reviews.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        product.reviews.reduce((acc: number, review: any) => {
          return acc + parseFloat(review?.rating || 0);
        }, 0) / product.reviews.length
      : 0;

  //   console.log(averageRating);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Customer Reviews
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {averageRating.toFixed(1)} ({product?.reviews?.length})
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {product.reviews.map((review: TReview) => (
            <AccordionItem key={review?.id} value={review?.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review?.user?.profilePhoto} />
                      <AvatarFallback>{review?.user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">{review?.user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(review?.createdAt), "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review?.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-16 pr-4"
                >
                  {review?.comment}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
