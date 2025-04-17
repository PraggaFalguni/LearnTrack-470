import { getAllCourseSectionsWithVideos } from "@/lib/data"
import { Clock, Award } from "lucide-react"

export default function CourseSidebar({ course }) {
  // In a real app, this would be an API call
  const sections = getAllCourseSectionsWithVideos(course.id)

  // Calculate total videos and duration
  let totalVideos = 0
  let totalDuration = 0

  sections.forEach((section) => {
    totalVideos += section.videos.length

    section.videos.forEach((video) => {
      const [minutes, seconds] = video.duration.split(":").map(Number)
      totalDuration += minutes * 60 + seconds
    })
  })

  // Format total duration
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)
  const formattedDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Course Information</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{formattedDuration}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Award className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Sections</p>
            <p className="font-medium">{sections.length} sections</p>
          </div>
        </div>

        <div className="flex items-center">
          <Award className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Videos</p>
            <p className="font-medium">{totalVideos} videos</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">25% Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}
