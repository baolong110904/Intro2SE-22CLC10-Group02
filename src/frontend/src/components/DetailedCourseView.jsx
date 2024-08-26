import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseData from "../data/courseData.json";
import Participants from "../components/Participants";


const DetailedCourseView = () => {
  const { courseId } = useParams();
  const course = CourseData.find((course) => course.id.toString() === courseId);
  const [activeTab, setActiveTab] = useState("course");
  const [openSection, setOpenSection] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);

  if (!course) {
    return <p>Course not found.</p>;
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleSubSection = (subSection) => {
    setOpenSubSection(openSubSection === subSection ? null : subSection);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="p-4 border-b">
          <nav className="text-sm text-gray-600">
            <a href="/teacher" className="hover:text-green-600">Course (2023-2024)</a> &gt;
            <span className="font-semibold text-green-600">{course.title} - {course.id}</span>
          </nav>
        </div>

        {/* Course Title and Tabs */}
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
          <div className="flex mt-4 space-x-4 border-b">
            {["course", "participants", "grades", "materials"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 font-semibold border-b-2 ${activeTab === tab ? "border-green-600 text-green-600" : "border-transparent text-gray-500"} hover:text-green-600`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Course Content Section */}
        {activeTab === "course" && (
          <div className="p-4 md:p-6 lg:p-8">
            {/* General Section */}
            <div>
              <button
                className="flex items-center justify-between w-full py-3 text-left font-semibold text-lg text-orange-600"
                onClick={() => toggleSection("general")}
              >
                General
                <span>{openSection === "general" ? "▲" : "▼"}</span>
              </button>
              {openSection === "general" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {/* Review Exercises */}
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("review")}
                    >
                      Review Exercises
                      <span>{openSubSection === "review" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "review" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Details for review exercises go here.</p>
                      </div>
                    )}
                  </div>

                  {/* Lecturing Activities */}
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("lecturing")}
                    >
                      Lecturing Activities
                      <span>{openSubSection === "lecturing" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "lecturing" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Details for lecturing activities go here.</p>
                      </div>
                    )}
                  </div>

                  {/* Homework */}
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("homework")}
                    >
                      Homework (Group work: 2 members) - Contact: Mr.Cristiano
                      <span>{openSubSection === "homework" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "homework" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Homework details and contact information.</p>
                      </div>
                    )}
                  </div>

                  {/* Lab Work
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("labwork")}
                    >
                      Lab Work (Individual work) - Contact: Mr. Nguyễn Trần Duy Minh - Mr. Nguyễn Thanh Tình
                      <span>{openSubSection === "labwork" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "labwork" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Lab work details and contact information.</p>
                      </div>
                    )}
                  </div> */}

                  {/* Grade Details */}
                  {/* <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("grades")}
                    >
                      Grade Details (will be updated throughout the term)
                      <span>{openSubSection === "grades" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "grades" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Grade details and updates will be shown here.</p>
                      </div>
                    )}
                  </div> */}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Render Participants Component if "participants" tab is active */}
        {activeTab === "participants" && (
          <div className="p-4 md:p-6 lg:p-8">
            <Participants />
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== "course" && (
          <div className="p-4 md:p-6 lg:p-8">
            <p>Content for the "{activeTab}" tab will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCourseView;
