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
import courseData from '../data/courseData.json';
import Forum from "./Forum.jsx"
import { Link } from 'react-router-dom';
import Mycourse from "../components/Mycourse.jsx";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable")
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const showMoreRef = useRef(null)
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const [filters, setFilters] = useState({
    rating: null,
    duration: [],
    topic: "all",
    subcategory: "all",
    language: "all"
  });

  useEffect(() => {
    setCourses(courseData);
    setFilteredCourses(courseData);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let result = courseData;

    if (filters.rating) {
      result = result.filter(course => course.rating >= filters.rating);
    }

    if (filters.duration.length > 0) {
      result = result.filter(course => filters.duration.includes(course.duration));
    }

    if (filters.topic !== "all") {
      result = result.filter(course => course.category === filters.topic);
    }

    if (filters.subcategory !== "all") {
      result = result.filter(course => course.subcategory === filters.subcategory);
    }

    if (filters.language !== "all") {
      result = result.filter(course => course.language === filters.language);
    }

    setCourses(result);
  };

  const handleFilterChange = (filterType, value, prevFilters) => {
    let updatedFilters;
    if (filterType === 'duration') {
      const updatedDuration = prevFilters.duration.includes(value)
        ? prevFilters.duration.filter(item => item !== value)
        : [...prevFilters.duration, value];
      updatedFilters = { ...prevFilters, duration: updatedDuration };
    } else if (filterType === 'rating') {
      updatedFilters = {
        ...prevFilters,
        [filterType]: prevFilters[filterType] === value ? null : value
      };
    } else {
      updatedFilters = {
        ...prevFilters,
        [filterType]: value === "all" ? "all" : value
      };
    }
    return updatedFilters;
  };

  const handleShowMoreClick = () => {
    setShowMore(!showMore)
    if (!showMore) {
      // Scroll to the newly revealed content
      setTimeout(() => {
        showMoreRef.current.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
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
            <Mycourse 
              initialCourses={courseData} 
              handleFilterChange={handleFilterChange}
              showMore={showMore}
              handleShowMoreClick={handleShowMoreClick}
            />
            </React.StrictMode>
          </div>
        );
      case "materials":
        return (
          <div className="course-section p-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>
            <div>
              <React.StrictMode>
                <CourseGrid />
              </React.StrictMode>
            </div>
          </div >
        );
      case "onlineMeeting":
        return (
          <div className="p-8 bg-white rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">Welcome to the Meeting</h1>
              <p className="text-gray-600 mb-4">
                Join the meeting to collaborate with others
              </p>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={() => navigate("/onlineMeeting")} // Navigate to /onlineMeeting
              >
                Join Now
              </button>
            </div>

            {/* Decorative Divider */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xl">
                <span className="bg-white px-4 text-gray-500">Meeting Details</span>
              </div>
            </div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Meeting Features */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Meeting Features</h2>
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={screensharing}
                      alt="Screen Sharing"
                      className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="font-semibold mt-2">Screen Sharing</h3>
                    <p className="text-green-600">Enabled</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={recording}
                      alt="Recording"
                      className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="font-semibold mt-2">Recording</h3>
                    <p className="text-green-600">Enabled</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={virtualbg}
                      alt="Virtual Backgrounds"
                      className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="font-semibold mt-2">Virtual Backgrounds</h3>
                    <p className="text-green-600">Enabled</p>
                  </div>
                </div>
              </div>

              {/* Meeting Feedback and Highlights */}
              <div className="flex flex-col space-y-8">
                {/* Meeting Feedback */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Meeting Feedback</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <p className="font-semibold">
                        Great meeting, very informative
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500">★★★★★</span>
                        <div className="ml-4 flex items-center">
                          <img
                            src={ava1} // Replace with actual avatar path
                            alt="John Doe Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="ml-2 text-gray-600">John Doe</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <p className="font-semibold">
                        Enjoyed the interactive session
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500">★★★★★</span>
                        <div className="ml-4 flex items-center">
                          <img
                            src={ava2} // Replace with actual avatar path
                            alt="Jane Smith Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="ml-2 text-gray-600">Jane Smith</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meeting Highlights */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Meeting Highlights</h2>
                  <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <img
                      src={shareexperience}
                      alt="Highlight"
                      className="w-full rounded-lg mb-4 transform transition-transform duration-300 hover:scale-110"
                    />
                    <p className="font-semibold">
                      Great collaboration today! #TeamWork
                    </p>
                    <p className="text-gray-600">- @grace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "forum":
        return (
          <div className="course-section p-8 bg-gray-50">
            <div>
              <React.StrictMode>
                <Forum/>
              </React.StrictMode>
            </div>
          </div >)
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
          className={`px-4 py-2 ${activeSection === "timetable"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("timetable")}
        >
          Timetable
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "teachingSessions"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("teachingSessions")}
        >
          My Teaching Sessions
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "materials"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("materials")}
        >
          Materials
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "onlineMeeting"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("onlineMeeting")}
        >
          Online Meeting
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "forum"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } rounded-md`}
          onClick={() => setActiveSection("forum")}
        >
          Forum
        </button>
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        {renderActiveSection()}
      </div>
    </div>
  )
}

export default Dashboard
