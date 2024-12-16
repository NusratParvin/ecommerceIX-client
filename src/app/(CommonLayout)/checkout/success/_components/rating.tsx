import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

const RatingInput = ({ value, onChange }: RatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className="transition-transform hover:scale-110"
          onMouseEnter={() => setHoverRating(rating)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onChange(rating)}
        >
          <Star
            className={cn(
              "w-8 h-8 transition-colors duration-200",
              (hoverRating || value) >= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
