"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { coursesAPI } from "@/utils/api";
import CourseList from "@/components/course-list";
import CourseSearch from "@/components/course-search";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  useEffect(() => {
    // Filter courses based on search query, price range, and categories
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      //either no categories selected or the course category is in the selected categories
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      return matchesSearch && matchesPrice && matchesCategories;
    });

    setFilteredCourses(filtered); //update filtered courses
  }, [courses, searchQuery, priceRange, selectedCategories]);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getCourses();
      if (response.data.status === "success") {
        setCourses(response.data.data.courses);
        setFilteredCourses(response.data.data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleTaskUpdate = async () => {
    await fetchCourses(); // Refresh courses
  };

  if (!user) {
    return null; // Will redirect to login
  }

  // Group filtered courses by category
  const categories = [
    ...new Set(filteredCourses.map((course) => course.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Available Courses
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse and enroll in our available courses.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <CourseSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Course Lists by Category and display course*/}

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="relative">
                <div className="overflow-x-auto">
                  <div className="flex space-x-6 pb-4 px-1">
                    {filteredCourses
                      .filter((course) => course.category === category)
                      .map((course) => (
                        <div
                          key={course._id}
                          className="relative flex-none w-[300px] pb-10"
                        >
                          <CourseList
                            courses={[course]}
                            onTaskUpdate={handleTaskUpdate}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
