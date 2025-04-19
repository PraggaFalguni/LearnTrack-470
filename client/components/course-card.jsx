"use client";

import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          {course.level}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">
              {(course.averageRating || 0).toFixed(1)}
            </span>
            <span className="ml-1 text-xs text-gray-500">
              ({course.ratings?.length || 0})
            </span>
          </div>
          <span className="font-bold text-purple-600">
            ${(course.price || 0).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students?.length || 0} students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
