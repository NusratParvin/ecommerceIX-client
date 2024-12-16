import { Star } from "lucide-react";
import React from "react";

interface StarDisplayProps {
  rating: number;
}

const StarDisplay: React.FC<StarDisplayProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-3.5 h-3.5 text-yellow-500"
          fill="currentColor"
        />
      ))}
      {halfStar > 0 && (
        <Star
          key="half"
          className="w-3.5 h-3.5 text-yellow-500"
          fill="currentColor"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-3.5 h-3.5 text-gray-300"
          fill="currentColor"
        />
      ))}
    </>
  );
};

export default StarDisplay;
