import React, { useState, useEffect, useContext } from "react"
import ContextWrapper from "./calendar/ContextWrapper.js"
import GlobalContext from "./calendar/GlobalContext.js"
import Calendar from "./calendar/Calendar.js"
import { getMonth } from "./calendar/util.js"
import CourseGrid from "./CourseBox.jsx"
import Forum from "./Forum.jsx"

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
]

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable")
  const [currenMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)

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
      case "studyingSessions":
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
      case "lessonSupport":
        return <div>My Lesson Support sessions</div>
      // case "forum":
      //   return (
      //     <div className="course-section p-8 bg-gray-50">
      //       <div>
      //         <React.StrictMode>
      //           <Forum/>
      //         </React.StrictMode>
      //       </div>
      //     </div >)
      case "ea":
        return <div>EA</div>
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
          className={`px-4 py-2 ${
            activeSection === "timetable"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("timetable")}
        >
          Timetable
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "studyingSessions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("studyingSessions")}
        >
          My Studying Sessions
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "lessonSupport"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("lessonSupport")}
        >
          My Lesson Support sessions
        </button>
        {/* <button
          className={`px-4 py-2 ${activeSection === "forum"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("forum")}
        >
          Forum
        </button> */}
        <button
          className={`px-4 py-2 ${
            activeSection === "ea"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("ea")}
        >
          EA
        </button>
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        {renderActiveSection()}
      </div>
    </div>
  )
}

export default Dashboard
