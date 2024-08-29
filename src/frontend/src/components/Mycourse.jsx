import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { IoFilterOutline, IoTrashOutline } from "react-icons/io5"
import { FaSortAmountDown } from "react-icons/fa"
import { IoAddCircleOutline } from "react-icons/io5"
import CourseRegistrationForm from "./CourseRegistrationForm"
import GetUserCourses from "../api/courses/GetUserCourse"
import DeleteCourse from "../api/courses/DeleteCourse"

const Mycourse = ({ initialCourses, onCourseAdded, onCourseDeleted }) => {
  const [courses, setCourses] = useState(initialCourses)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    rating: null,
    topic: "all",
    subCategory: "all",
    language: "all",
  })

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      const res = await DeleteCourse(courseId)
      console.log(res)
      if (res.status === 200) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId),
        )
        onCourseDeleted()
      }
    } catch (error) {
      console.error("Error deleting course:", error)
    }
  }

  console.log(courses)

  useEffect(() => {
    if (initialCourses) {
      applyFilters()
    }
  }, [filters, initialCourses])

  const handleCourseAdded = async (newCourse) => {
    // Close the modal
    setShowModal(false)
    // Call the callback function to update courses in the parent component
    if (onCourseAdded) {
      await onCourseAdded()
    }
  }

  const applyFilters = () => {
    if (!initialCourses) return

    let result = initialCourses

    if (filters.rating) {
      result = result.filter((course) => course.rating >= filters.rating)
    }

    // Only apply topic filter if it's not "all"
    if (filters.topic !== "all") {
      result = result.filter((course) => true)
    }

    // Only apply subCategory filter if it's not "all"
    if (filters.subCategory !== "all") {
      result = result.filter((course) => course.subCategory === filters.subCategory)
    }

    // Only apply language filter if it's not "all"
    if (filters.language !== "all") {
      result = result.filter((course) => course.language === filters.language)
    }

    setCourses(result)
  }

  const handleLocalFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      rating: null,
      topic: "all",
      subCategory: "all",
      language: "all",
    })
    setCourses(initialCourses)
  }

  return (
    <div className="course-section p-0 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <IoAddCircleOutline className="mr-2" />
          Create Course
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={toggleModal}
              className="float-right text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <CourseRegistrationForm onCourseAdded={handleCourseAdded} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-medium flex items-center">
                <IoFilterOutline className="mr-2 text-blue-600" /> Filter
              </span>
              <span className="text-gray-800 font-medium flex items-center">
                <FaSortAmountDown className="fas fa-filter mr-2 text-blue-600" />
                Sort by
              </span>
            </div>
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
              <div className="space-y-2">
                {[4.0, 3.0, 2.0, 1.0].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      onChange={(e) =>
                        handleLocalFilterChange("rating", parseFloat(e.target.value))
                      }
                    />
                    <span className="text-yellow-500">
                      {"★".repeat(rating)}
                      {"☆".repeat(5 - rating)}
                    </span>
                    <span className="text-gray-600">{rating}.0 & up</span>
                    <span className="text-gray-400 ml-auto">(4,472)</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 shadow-sm space-y-4">
            {["topic", "subCategory", "language"].map((filterType) => (
              <div key={filterType}>
                <h3 className="text-lg font-semibold text-gray-800">
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </h3>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 mt-2"
                  onChange={(e) =>
                    handleLocalFilterChange(filterType, e.target.value)
                  }
                >
                  <option value="all">All {filterType}s</option>
                  {filterType === "topic" && (
                    <option value="Language">Language</option>
                  )}
                  {filterType === "subCategory" &&
                    ["Pronunciation", "Words", "Composition"].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  {filterType === "language" &&
                    ["English", "Japanese"].map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="flex">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full max-w-sm transition-transform transform hover:scale-105">
                    <div className="relative h-48">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                        <span className="text-gray-700 text-sm">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        Teacher: {course.teacher}
                      </p>
                      <Link to={`/course/${course.id}`} className="mt-auto">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                          Go to course
                        </button>
                      </Link>
                      <button
                        className="mt-2 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">
                No courses available with the selected filters.
              </p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mycourse
