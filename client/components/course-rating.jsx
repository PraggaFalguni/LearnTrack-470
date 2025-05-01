"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { coursesAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function CourseRating({ course, onRatingSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await coursesAPI.rateCourse(course._id, {
        rating,
        review,
      });

      if (response.data.status === "success") {
        alert("Rating submitted successfully!");
        setRating(0);
        setReview("");
        if (onRatingSubmit) {
          onRatingSubmit();
        }
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Rate this Course</h2>
      <form onSubmit={handleRatingSubmit} className="space-y-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-500 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-lg font-medium">
            {rating ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
          </span>
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review (optional)
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            placeholder="Share your experience with this course..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !rating}
          className="btn-primary w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </button>
      </form>
    </div>
  );
}
