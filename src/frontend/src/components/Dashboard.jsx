import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextWrapper from "./calendar/ContextWrapper.js";
import ava1 from "../assets/ava1.png";
import ava2 from "../assets/ava2.png";
import recording from "../assets/recording.png";
import screensharing from "../assets/screensharing.png";
import virtualbg from "../assets/virtualbg.png";
import shareexperience from "../assets/shareexperience.png";
import Calendar from "./calendar/Calendar.js";
import { IoFilterOutline } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import CourseGrid from "./CourseBox.jsx";
import courseData from '../data/courseData.json';
import Forum from "./Forum.jsx";
import { Link } from 'react-router-dom';
import Mycourse from "../components/Mycourse.jsx";
import OnlineMeetingHome from "./OnlineMeetingHome.jsx"; // Import the OnlineMeetingHome component

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable");
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef(null);
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
    setShowMore(!showMore);
    if (!showMore) {
      // Scroll to the newly revealed content
      setTimeout(() => {
        showMoreRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "timetable":
        return (
          <React.StrictMode>
            <ContextWrapper>
              <Calendar />
            </ContextWrapper>
          </React.StrictMode>
        );
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
          </div>
        );
      case "onlineMeeting":
        return (
          <div>
            <React.StrictMode>
              <OnlineMeetingHome />
            </React.StrictMode>
          </div>
        );
      case "forum":
        return (
          <div className="course-section p-8 bg-gray-50">
            <div>
              <React.StrictMode>
                <Forum />
              </React.StrictMode>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full" id="dashboard">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Dashboard</h2>
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
        <button
          className={`px-4 py-2 ${activeSection === "materials" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("materials")}
        >
          Materials
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "onlineMeeting" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("onlineMeeting")}
        >
          Online Meeting
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "forum" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("forum")}
        >
          Forum
        </button>
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Dashboard;