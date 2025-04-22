export default function CourseDetails({ course }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">{course.description}</p>

      <div>
        <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Comprehensive understanding of {course.category}</li>
          <li>Practical skills that can be applied immediately</li>
          <li>Industry best practices and techniques</li>
          <li>How to solve real-world problems</li>
        </ul>
      </div>
    </div>
  );
}
