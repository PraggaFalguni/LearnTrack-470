"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/lib/data";
import CourseList from "@/components/course-list";
import CourseSearch from "@/components/course-search";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const allCourses = getAllCourses();
    setCourses(allCourses);
    setFilteredCourses(allCourses);
  }, []);

  useEffect(() => {
    // Filter courses based on search query, price range, and categories
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      return matchesSearch && matchesPrice && matchesCategories;
    });

    setFilteredCourses(filtered);
  }, [courses, searchQuery, priceRange, selectedCategories]);

  // Group filtered courses by category
  const categories = [
    ...new Set(filteredCourses.map((course) => course.category)),
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Explore Courses</h1>

      {/* Search and Filter */}
      <CourseSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Course Lists by Category */}
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <CourseList
              courses={filteredCourses.filter(
                (course) => course.category === category
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
