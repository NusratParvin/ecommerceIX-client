import { Star } from "lucide-react";
import Image from "next/image";

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
  console.log(reviews, "review");
  // const { data, isLoading, isError, error } = console.log(data, error);
  // const dummyReviews = [
  //   {
  //     id: 1,
  //     rating: 5,
  //     comment: "Excellent product! Really satisfied with the quality.",
  //     user: { name: "John Doe" },
  //     createdAt: "2024-03-09T10:00:00Z",
  //   },
  //   {
  //     id: 2,
  //     rating: 4,
  //     comment: "Good value for money, would recommend.",
  //     user: { name: "Jane Smith" },
  //     createdAt: "2024-03-08T15:30:00Z",
  //   },
  //   {
  //     id: 3,
  //     rating: 5,
  //     comment: "Perfect fit and great design!",
  //     user: { name: "Mike Johnson" },
  //     createdAt: "2024-03-07T09:15:00Z",
  //   },
  // ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderStars = (rating: any) => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
          />
        ))}
      </>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-sm">
        <h2 className="text-2xl font-bold mb-8 text-warm-brown">
          Customer Reviews
        </h2>
        <p> No one has reviewed the product yet !</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-warm-brown">
        Customer Reviews
      </h2>
      {reviews?.map((review) => (
        <div key={review?.id} className="bg-warm-brown/10 p-6 rounded-sm my-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-lg">
                {review?.user?.name}
              </div> */}

              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center font-medium text-lg">
                {review?.user?.profilePhoto ? (
                  <Image
                    src={review?.user?.profilePhoto}
                    alt={review?.user?.name}
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                ) : (
                  <span>{review?.user?.name}</span>
                )}
              </div>

              <div>
                <p className="text-base font-semibold">{review?.user?.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {renderStars(review?.rating)}
            </div>
          </div>
          <p className="text-gray-600 text-base">{review?.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
