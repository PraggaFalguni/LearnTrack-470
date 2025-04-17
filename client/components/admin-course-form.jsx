"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Trash, MoveUp, MoveDown, Youtube } from "lucide-react"

export default function AdminCourseForm({ course, sections = [], isEditing = false }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    preview: "",
  })

  const [courseSections, setCourseSections] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        price: course.price ? course.price.toString() : "",
        preview: course.preview || "",
      })
    }

    if (sections.length > 0) {
      setCourseSections(sections)
    }
  }, [course, sections])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addSection = () => {
    const newSection = {
      id: `temp-${Date.now()}`,
      title: "",
      order: courseSections.length + 1,
      videos: [],
    }
    setCourseSections([...courseSections, newSection])
  }

  const removeSection = (sectionIndex) => {
    setCourseSections(courseSections.filter((_, index) => index !== sectionIndex))
  }

  const updateSectionTitle = (sectionIndex, title) => {
    const updatedSections = [...courseSections]
    updatedSections[sectionIndex].title = title
    setCourseSections(updatedSections)
  }

  const moveSectionUp = (sectionIndex) => {
    if (sectionIndex === 0) return
    const updatedSections = [...courseSections]
    const temp = updatedSections[sectionIndex]
    updatedSections[sectionIndex] = updatedSections[sectionIndex - 1]
    updatedSections[sectionIndex - 1] = temp
    setCourseSections(updatedSections)
  }

  const moveSectionDown = (sectionIndex) => {
    if (sectionIndex === courseSections.length - 1) return
    const updatedSections = [...courseSections]
    const temp = updatedSections[sectionIndex]
    updatedSections[sectionIndex] = updatedSections[sectionIndex + 1]
    updatedSections[sectionIndex + 1] = temp
    setCourseSections(updatedSections)
  }

  const addVideo = (sectionIndex) => {
    const updatedSections = [...courseSections]
    const newVideo = {
      id: `temp-${Date.now()}`,
      title: "",
      description: "",
      youtubeUrl: "",
      duration: "00:00",
    }
    updatedSections[sectionIndex].videos.push(newVideo)
    setCourseSections(updatedSections)
  }

  const removeVideo = (sectionIndex, videoIndex) => {
    const updatedSections = [...courseSections]
    updatedSections[sectionIndex].videos.splice(videoIndex, 1)
    setCourseSections(updatedSections)
  }

  const updateVideoField = (sectionIndex, videoIndex, field, value) => {
    const updatedSections = [...courseSections]
    updatedSections[sectionIndex].videos[videoIndex][field] = value
    setCourseSections(updatedSections)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate sections and videos
    const hasEmptySections = courseSections.some((section) => !section.title.trim())
    const hasEmptyVideos = courseSections.some((section) =>
      section.videos.some((video) => !video.title.trim() || !video.youtubeUrl.trim()),
    )

    if (hasEmptySections || hasEmptyVideos) {
      alert("Please fill in all section and video fields")
      setIsSubmitting(false)
      return
    }

    // In a real app, this would save the course to the database
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin")
    }, 1500)
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Course Details</h2>

          <div>
            <label htmlFor="title" className="form-label">
              Course Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Design">Design</option>
                <option value="Backend">Backend</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="form-label">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="preview" className="form-label">
              Course Preview
            </label>
            <textarea
              id="preview"
              name="preview"
              className="form-input"
              rows="3"
              value={formData.preview}
              onChange={handleInputChange}
              required
              placeholder="Provide a brief preview of what students will learn in this course"
            />
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Course Content</h2>
            <button type="button" className="btn-secondary flex items-center" onClick={addSection}>
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Section
            </button>
          </div>

          {courseSections.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No sections added yet.</p>
              <button type="button" className="btn-primary" onClick={addSection}>
                Add Your First Section
              </button>
            </div>
          )}

          {courseSections.map((section, sectionIndex) => (
            <div key={section.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <label className="form-label">Section Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-purple-600"
                    onClick={() => moveSectionUp(sectionIndex)}
                    disabled={sectionIndex === 0}
                  >
                    <MoveUp className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-purple-600"
                    onClick={() => moveSectionDown(sectionIndex)}
                    disabled={sectionIndex === courseSections.length - 1}
                  >
                    <MoveDown className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => removeSection(sectionIndex)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Videos</h3>
                  <button type="button" className="text-sm flex items-center" onClick={() => addVideo(sectionIndex)}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Video
                  </button>
                </div>

                {section.videos.length === 0 && (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">No videos added yet.</p>
                    <button type="button" className="text-purple-600 text-sm" onClick={() => addVideo(sectionIndex)}>
                      Add Your First Video
                    </button>
                  </div>
                )}

                {section.videos.map((video, videoIndex) => (
                  <div key={video.id} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Video {videoIndex + 1}</h4>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeVideo(sectionIndex, videoIndex)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>

                    <div>
                      <label className="form-label text-sm">Video Title</label>
                      <input
                        type="text"
                        className="form-input"
                        value={video.title}
                        onChange={(e) => updateVideoField(sectionIndex, videoIndex, "title", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label text-sm">Video Description</label>
                      <textarea
                        className="form-input"
                        rows="2"
                        value={video.description}
                        onChange={(e) => updateVideoField(sectionIndex, videoIndex, "description", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label text-sm">YouTube Embed URL</label>
                      <div className="flex">
                        <div className="flex-grow">
                          <input
                            type="text"
                            className="form-input"
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                            value={video.youtubeUrl}
                            onChange={(e) => updateVideoField(sectionIndex, videoIndex, "youtubeUrl", e.target.value)}
                            required
                          />
                        </div>
                        <div className="ml-2">
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center h-full"
                          >
                            <Youtube className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="form-label text-sm">Duration (MM:SS)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="10:30"
                        value={video.duration}
                        onChange={(e) => updateVideoField(sectionIndex, videoIndex, "duration", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  )
}
