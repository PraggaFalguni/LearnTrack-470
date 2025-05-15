import Link from "next/link";
import { CheckCircle, BookOpen, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Manage Tasks & Learn New Skills with{" "}
          <span className="text-purple-600">LearnTrack</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your all-in-one platform for organizing tasks and discovering courses
          to enhance your skills.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="btn-primary text-center">
            Get Started
          </Link>
          <Link href="/login" className="btn-secondary text-center">
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose LearnTrack?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Efficient Task Management
              </h3>
              <p className="text-gray-600">
                Create, prioritize, and track your tasks with ease. Stay
                organized and never miss a deadline.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <BookOpen size={48} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Courses</h3>
              <p className="text-gray-600">
                Access a wide range of courses taught by industry experts to
                enhance your skills.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Award size={48} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Knowledge</h3>
              <p className="text-gray-600">
                Create and publish your own courses to share your expertise with
                the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for free and set up your profile.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Add Your Tasks</h3>
              <p className="text-gray-600">
                Create and organize your tasks with priorities and due dates.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Courses</h3>
              <p className="text-gray-600">
                Browse and enroll in courses that interest you.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your task completion and course progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their tasks and
            learning new skills with LearnTrack.
          </p>
          <Link
            href="/register"
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
