"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import RatingInput from "./ratingInput";
import { useSubmitReviewMutation } from "@/redux/features/reviews/reviewsApi";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export const ReviewDialog = ({
  isOpen,
  onClose,
  productId,
  productName,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitReview] = useSubmitReviewMutation();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      console.log(productId, rating, comment);
      const res = await submitReview({ productId, rating, comment }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Thank you for your review!");
        setIsSubmitting(false);
        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-2">
            <label className="text-base font-medium">Your Rating</label>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="min-h-[100px]"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-deep-brown hover:bg-warm-brown"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
