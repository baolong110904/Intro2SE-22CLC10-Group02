
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import ContextWrapper from "./calendar/ContextWrapper.js";
import ava1 from "../assets/ava1.png";
import ava2 from "../assets/ava2.png";
import recording from "../assets/recording.png";
import screensharing from "../assets/screensharing.png";
import virtualbg from "../assets/virtualbg.png";
import shareexperience from "../assets/shareexperience.png";
import phonetics from "../assets/phonetics.png";
import vocabulary from "../assets/vocabulary.png";
import writing from "../assets/writing.png";
import Calendar from "./calendar/Calendar.js"
import { IoFilterOutline } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable");
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef(null);

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
          <Calendar/>
          </ContextWrapper>
          </React.StrictMode>
      );
      case "teachingSessions":
          return (
            <div className="course-section p-8 bg-gray-50">
              {/* Title Section */}
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Language Courses</h2>

              {/* Teaching Sessions and Filters/Sorting Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters and Sorting Section (1/4 of the width on large screens) */}
                <div className="lg:col-span-1 flex flex-col space-y-6">
                  {/* Filter Section */}
                  <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium flex items-center">
                        <IoFilterOutline className="mr-2 text-blue-600" /> Filter
                      </span>
                      <span className="text-gray-800 font-medium flex items-center">
                        <FaSortAmountDown className="fas fa-filter mr-2 text-blue-600"/> Sort by
                      </span>
                    </div>
                    <div className="mt-4 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="rating" value="4.0" />
                          <span className="text-yellow-500">★★★★☆</span>
                          <span className="text-gray-600">4.0 & up</span>
                          <span className="text-gray-400 ml-auto">(4,472)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="rating" value="3.0" />
                          <span className="text-yellow-500">★★★☆☆</span>
                          <span className="text-gray-600">3.0 & up</span>
                          <span className="text-gray-400 ml-auto">(3,347)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="rating" value="2.0" />
                          <span className="text-yellow-500">★★☆☆☆</span>
                          <span className="text-gray-600">2.0 & up</span>
                          <span className="text-gray-400 ml-auto">(2,214)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="rating" value="1.0" />
                          <span className="text-yellow-500">★☆☆☆☆</span>
                          <span className="text-gray-600">1.0 & up</span>
                          <span className="text-gray-400 ml-auto">(115)</span>
                        </label>
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" name="duration" value="3-4-days" />
                          <span className="text-gray-600">3-4 days</span>
                          <span className="text-gray-400 ml-auto">(1,234)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" name="duration" value="6-7-days" />
                          <span className="text-gray-600">6-7 days</span>
                          <span className="text-gray-400 ml-auto">(2,345)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" name="duration" value="1-2-weeks" />
                          <span className="text-gray-600">1-2 weeks</span>
                          <span className="text-gray-400 ml-auto">(3,456)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" name="duration" value="3-4-weeks" />
                          <span className="text-gray-600">3-4 weeks</span>
                          <span className="text-gray-400 ml-auto">(4,567)</span>
                        </label>
                        {showMore && (
                          <div ref={showMoreRef}>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" name="duration" value="3-4-weeks" />
                              <span className="text-gray-600">5-6 weeks</span>
                              <span className="text-gray-400 ml-auto">(4,567)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" name="duration" value="3-4-weeks" />
                              <span className="text-gray-600">7-8 weeks</span>
                              <span className="text-gray-400 ml-auto">(234)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" name="duration" value="3-4-weeks" />
                              <span className="text-gray-600">9-10 weeks</span>
                              <span className="text-gray-400 ml-auto">(1,213)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" name="duration" value="3-4-weeks" />
                              <span className="text-gray-600">11-12 weeks</span>
                              <span className="text-gray-400 ml-auto">(4,421)</span>
                            </label>
                          </div>
                        )}
                        <span
                          className="text-blue-600 cursor-pointer mt-2 block"
                          onClick={handleShowMoreClick}
                        >
                          {showMore ? "Show less ▲" : "Show more ▼"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Topic, Subcategory, Language Filters */}
                  <div className="border border-gray-300 rounded-lg p-4 shadow-sm space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Topic</h3>
                      <select className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 mt-2">
                        <option value="all">All Topics</option>
                        <option value="phonetics">Phonetics</option>
                        <option value="vocabulary">Vocabulary</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Subcategory</h3>
                      <select className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 mt-2">
                        <option value="all">All Subcategories</option>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Language</h3>
                      <select className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 mt-2">
                        <option value="all">All Languages</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Teaching Sessions Grid (3/4 of the width on large screens) */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 md:grid-cols-3 gap-6"> 
                  {/* Teaching Session Cards */}
                  <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={phonetics}
                          alt="Phonetics"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                          <span className="text-gray-700 text-sm">Phonetics</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Phonetics</h3>
                        <p className="text-gray-600 mb-4">Teacher: Doraemon</p>
                        <p className="text-gray-600 mb-4">Teacher: Nobita</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                          See more
                        </button>
                      </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={vocabulary}
                          alt="Vocabulary"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                          <span className="text-gray-700 text-sm">Vocabulary</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Vocabulary</h3>
                        <p className="text-gray-600 mb-4">Teacher: Shizuka</p>
                        <p className="text-gray-600 mb-4">Teacher: Degisughi</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                          See more
                        </button>
                      </div>
                    </div>
                  
                    <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={writing}
                          alt="Phonetics"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                          <span className="text-gray-700 text-sm">Writing</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Writing</h3>
                        <p className="text-gray-600 mb-4">Teacher: C.Ronaldo</p>
                        <p className="text-gray-600 mb-4">Teacher: L.Messi</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                          See more
                        </button>
                      </div>
                    </div>

                  <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                    <div className="relative">
                      <img
                        src={writing}
                        alt="Phonetics"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                        <span className="text-gray-700 text-sm">Phonetics</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Phonetics</h3>
                      <p className="text-gray-600 mb-4">Teacher: Doraemon</p>
                      <p className="text-gray-600 mb-4">Teacher: Nobita</p>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                        See more
                      </button>
                    </div>
                  </div>
                    
                  <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                    <div className="relative">
                      <img
                        src={vocabulary}
                        alt="Phonetics"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                        <span className="text-gray-700 text-sm">Phonetics</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Phonetics</h3>
                      <p className="text-gray-600 mb-4">Teacher: Doraemon</p>
                      <p className="text-gray-600 mb-4">Teacher: Nobita</p>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                        See more
                      </button>
                    </div>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105">
                    <div className="relative">
                      <img
                        src={phonetics}
                        alt="Phonetics"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                        <span className="text-gray-700 text-sm">Phonetics</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Phonetics</h3>
                      <p className="text-gray-600 mb-4">Teacher: Doraemon</p>
                      <p className="text-gray-600 mb-4">Teacher: Nobita</p>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                        See more
                      </button>
                    </div>
                  </div>
                  {/* Repeat similar div structure for each course card with corresponding information */}
                </div>
              </div>
            </div>
          );

      case "materials":
          return <div>Materials</div>;
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
                        <p className="font-semibold">Great meeting, very informative</p>
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
                        <p className="font-semibold">Enjoyed the interactive session</p>
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
          );


      case "forum":
        return <div>Forum</div>;
      default:
        return null;
    }
  };

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
            activeSection === "teachingSessions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("teachingSessions")}
        >
          My Teaching Sessions
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "materials"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("materials")}
        >
          Materials
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "onlineMeeting"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("onlineMeeting")}
        >
          Online Meeting
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "forum"
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
  );
};

export default Dashboard;