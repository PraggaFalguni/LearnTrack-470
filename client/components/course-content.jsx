"use client"

import { useState, useEffect } from "react"
import { getAllCourseSectionsWithVideos } from "@/lib/data"
import VideoPlayer from "./video-player"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CourseContent({ course }) {
  const [sections, setSections] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    // In a real app, this would be an API call
    const courseSections = getAllCourseSectionsWithVideos(course.id)
    setSections(courseSections)

    // Set the first video as active by default
    if (courseSections.length > 0 && courseSections[0].videos.length > 0) {
      setActiveVideo(courseSections[0].videos[0])
    }

    // Expand the first section by default
    const initialExpandedState = {}
    courseSections.forEach((section, index) => {
      initialExpandedState[section.id] = index === 0
    })
    setExpandedSections(initialExpandedState)
  }, [course.id])

  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId],
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      {activeVideo && (
        <div className="space-y-4">
          <VideoPlayer video={activeVideo} />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-2">{activeVideo.title}</h2>
            <p className="text-gray-600">{activeVideo.description}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Course Content</h2>
        </div>

        <div className="divide-y">
          {sections.map((section) => (
            <div key={section.id} className="p-4">
              <button
                className="flex justify-between items-center w-full text-left font-semibold"
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.title}</span>
                {expandedSections[section.id] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedSections[section.id] && (
                <div className="mt-2 space-y-2">
                  {section.videos.map((video) => (
                    <button
                      key={video.id}
                      className={`flex items-center p-2 rounded-md w-full text-left ${
                        activeVideo && activeVideo.id === video.id
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveVideo(video)}
                    >
                      <div className="ml-4">
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-gray-500">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
