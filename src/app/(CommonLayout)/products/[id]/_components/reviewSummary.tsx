import StarDisplay from "@/components/shared/starRating";
import { Star } from "lucide-react";
import { useMemo } from "react";

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

const ReviewSummary = ({ reviews }: ReviewProps) => {
  // Filter out deleted reviews
  const validReviews = reviews.filter((r: Review) => !r.isDeleted);

  // Total number of valid reviews
  const totalReviews = validReviews.length;

  // Average rating (out of 5)
  const averageReview =
    totalReviews > 0
      ? validReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  //review count per star
  const percentages = useMemo(() => {
    // index 0 = 1★, index 1 = 2★, ..., index 4 = 5★
    const counts = [0, 0, 0, 0, 0];

    validReviews.forEach((r) => {
      counts[r.rating - 1] += 1; // rating 1→5 → index 0→4
    });

    const total = validReviews.length;
    const percents = counts.map((c) =>
      total > 0 ? Math.round((c / total) * 100) : 0
    );

    return percents;
  }, [validReviews]);

  return (
    <div className="max-w-xl p-8 bg-slate-50/50 h-full">
      {/* Stars + average text */}

      <div className="w-full ">
        <div className="flex items-start gap-4 ">
          {/* Average number */}
          <span className="text-5xl font-bold text-slate-700  leading-none font-sans">
            {averageReview.toFixed(2)}
          </span>

          {/* Stars + caption */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <StarDisplay rating={averageReview} size="w-6 h-6" />
            </div>
            <p className="text-base text-gray-500 mt-1">
              Based on {totalReviews}{" "}
              {totalReviews === 1 ? "Rating" : "Ratings"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-3 border-gray-200" />
      </div>

      {/* </div> */}

      {/* Total ratings */}

      {/* Distribution bars (5 -> 1) */}
      <div className="flex flex-col mt-4 gap-0 font-sans ">
        {[5, 4, 3, 2, 1].map((star) => {
          const index = star - 1;
          return (
            <div key={star} className="flex items-center gap-4">
              <span className="flex flex-row items-center gap-0 text-xl">
                {star}
                <Star className="fill-yellow-500 text-yellow-500 w-4.5 h-4" />
              </span>
              <div className="flex-1 bg-gray-200 h-3 rounded-3xl w-[80%]">
                <div
                  className="bg-yellow-500 h-3 text-xl rounded-3xl  w-[80%]"
                  style={{ width: `${percentages[index]}%` }}
                />
              </div>
              <span className="text-lg w-[10%] ">{percentages[index]}%</span>
            </div>
          );
        })}
      </div>

      <div>{/* <Button>Write Review</Button> */}</div>
    </div>
  );
};

export default ReviewSummary;
