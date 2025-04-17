"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function CourseSearch({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["Web Development", "JavaScript", "Design", "Backend"];

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is now handled by the parent component
  };

  return (
    <div className="card">
      <form onSubmit={handleSearch}>
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="ml-2 p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>

          <button type="submit" className="ml-2 btn-primary">
            Search
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <span>${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number.parseInt(e.target.value),
                      priceRange[1],
                    ])
                  }
                  className="flex-grow"
                />
                <span>${priceRange[1]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number.parseInt(e.target.value),
                    ])
                  }
                  className="flex-grow"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(category)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
