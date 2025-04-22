"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function CourseRating({ rating = 0, ratingCount = 0 }) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = (value) => {
    setUserRating(value);
    setHasRated(true);

    // In a real app, this would submit the rating to the database
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 ${
                star <= (rating || 0)
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-lg font-medium">
          {(rating || 0).toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-gray-500">
          ({ratingCount || 0} ratings)
        </span>
      </div>

      {!hasRated ? (
        <div>
          <h3 className="text-sm font-medium mb-2">Rate this course:</h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRating(star)}
                className="p-1"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || userRating)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">Thank you for your rating!</p>
      )}
    </div>
  );
}
