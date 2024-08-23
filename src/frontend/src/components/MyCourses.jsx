import React from "react"
import CourseGrid from "./CourseBox"

const MyCourses = () => {
  return (
    <div className="text-lg text-red-700" id="my-courses">
      My courses.
      <CourseGrid />
    </div>
  )
}

export default MyCourses
