"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-purple-600">
                LearnTrack
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8 relative">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
              >
                Dashboard
              </Link>

              {/* Tasks dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center px-1 pt-6 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  Tasks 
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/tasks"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        All
                      </Link>
                      <Link
                        href="/tasks/status/pending"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Pending
                      </Link>
                      <Link
                        href="/tasks/due-soon"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Due Soon
                      </Link>
                      <Link
                        href="/tasks/status/completed"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Completed
                      </Link>
                    </div>
                  </div>
                )}

              </div>

              {/* Courses (still commented out) */}
              <Link
                href="/courses"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
              >
                Courses
              </Link>
            </nav>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

