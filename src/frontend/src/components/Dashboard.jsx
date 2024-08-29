import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContextWrapper from "./calendar/ContextWrapper.js"
import ava1 from "../assets/ava1.png"
import ava2 from "../assets/ava2.png"
import recording from "../assets/recording.png"
import screensharing from "../assets/screensharing.png"
import virtualbg from "../assets/virtualbg.png"
import shareexperience from "../assets/shareexperience.png"
import Calendar from "./calendar/Calendar.js"
import { IoFilterOutline } from "react-icons/io5"
import { FaSortAmountDown } from "react-icons/fa"
import CourseGrid from "./CourseBox.jsx"
import courseData from "../data/courseData.json"
import Forum from "./Forum.jsx"
import { Link } from "react-router-dom"
import Mycourse from "../components/Mycourse.jsx"
import OnlineMeetingHome from "./OnlineMeetingHome.jsx" // Import the OnlineMeetingHome component
import GetUserCourses from "../api/courses/GetUserCourse.js"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable")
  const [courses, setCourses] = useState([])

  const fetchData = async () => {
    const email = localStorage.getItem("email")
    const role = localStorage.getItem("role")

    try {
      const result = await GetUserCourses(email, role)
      console.log(result)
      setCourses(result.data)
    } catch (error) {
      console.error("Error fetching courses:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCourseDeleted = async () => {
    await fetchData() // Refresh the course list
  }

  const handleCourseAdded = async () => {
    await fetchData() // Refresh the course list
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "timetable":
        return (
          <React.StrictMode>
            <ContextWrapper>
              <Calendar />
            </ContextWrapper>
          </React.StrictMode>
        )
      case "teachingSessions":
        return (
          <div className="p-8 bg-gray-50">
            <React.StrictMode>
              {courses && courses.data && courses.data.length > 0 ? (
                <Mycourse
                  initialCourses={courses.data}
                  onCourseAdded={handleCourseAdded}
                  onCourseDeleted={handleCourseDeleted}
                />
              ) : (
                <p className="text-gray-600">No courses available at the moment.</p>
              )}
            </React.StrictMode>
          </div>
        )
      case "materials":
        return (
          <div className="course-section p-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>
            <div>
              <React.StrictMode>
                <CourseGrid />
              </React.StrictMode>
            </div>
          </div>
        )
      case "onlineMeeting":
        return (
          <div>
            <React.StrictMode>
              <OnlineMeetingHome />
            </React.StrictMode>
          </div>
        )
      case "forum":
        return (
          <div className="course-section p-8 bg-gray-50">
            <div>
              <React.StrictMode>
                <Forum />
              </React.StrictMode>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full"
      id="dashboard"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <div className="flex space-x-2"></div>
      </div>
      <div className="mb-6 flex flex-wrap space-x-4">
        <button
          className={`px-4 py-2 ${activeSection === "timetable" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("timetable")}
        >
          Timetable
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "teachingSessions" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("teachingSessions")}
        >
          My Teaching Sessions
        </button>
        {/* <button
          className={`px-4 py-2 ${activeSection === "onlineMeeting" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("onlineMeeting")}
        >
          Online Meeting
        </button> */}
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        {renderActiveSection()}
      </div>
    </div>
  )
}

export default Dashboard
