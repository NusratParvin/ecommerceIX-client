/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import ReviewSummary from "./reviewSummary";
import StarDisplay from "@/components/shared/starRating";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  isDeleted: boolean;
  user: {
    id: string;
    name: string;
    profilePhoto: string;
  };
}

interface ReviewProps {
  reviews: Review[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductReviews = ({ reviews }: ReviewProps) => {
  // console.log(reviews, "review");

  function formatReviewDate(iso: string) {
    const d = new Date(iso);
    const date = d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    // e.g., "10 Aug 2024 11:05 AM"
    return `${date} ${time}`;
  }

  // console.log(reviews);
  return (
    <div className="my-20 tracking-tight">
      <h2 className="font-semibold text-2xl text-slate-600 mb-4">Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3  border border-dashed border-slate-300">
        <div className="col-span-2">
          <ReviewSummary reviews={reviews} />
        </div>

        <div className="col-span-3">
          {/* Reviews panel (scrollable like the image) */}
          <div className="h-[300px] overflow-y-auto pr-2 ">
            <div className="space-y-4 h-full">
              {!reviews || reviews.length === 0 ? (
                <p className="text-base ps-4 text-slate-500 flex justify-center items-center h-full">
                  No one has reviewed the product yet!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-slate-50/50 p-4 border border-dashed border-slate-300"
                  >
                    {/* top row: avatar + name/date ... stars on right */}
                    <div className="flex items-start justify-start gap-4 ">
                      {/* avatar */}
                      <div className="w-14 h-14 bg-white grid place-items-center text-xl font-semibold text-slate-700 overflow-hidden shrink-0">
                        {review.user?.profilePhoto ? (
                          <Image
                            src={review.user.profilePhoto}
                            alt={review.user?.name || "User"}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>
                            {(review.user?.name || "?")
                              .slice(0, 1)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* content column */}
                      <div className="flex flex-col justify-between items-start w-full min-w-0">
                        <div className="flex flex-row justify-between items-center w-full min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex flex-row gap-4 justify-start items-center text-lg min-w-0">
                              <p className="font-semibold text-slate-900 truncate">
                                {review.user?.name || "Anonymous"}
                              </p>
                              <p className="text-slate-500 whitespace-nowrap">
                                {formatReviewDate(review.createdAt)}
                              </p>
                            </div>
                          </div>

                          {/* stars (orange) */}
                          <div className="flex shrink-0">
                            <StarDisplay rating={review?.rating} />
                          </div>
                        </div>

                        {/* body */}
                        {review.comment && (
                          <p className="text-slate-700 text-base mt-3 leading-relaxed whitespace-normal break-words">
                            “{review.comment}”
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
