import { Star } from "lucide-react"

export default function CourseCard({ course }) {
  return (
    <div className="card h-full hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-purple-100 rounded-t-lg flex items-center justify-center">
        <span className="text-purple-600 font-bold text-lg">{course.category}</span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
            <span className="ml-1 text-xs text-gray-500">({course.ratingCount})</span>
          </div>
          <span className="font-bold text-purple-600">${course.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
