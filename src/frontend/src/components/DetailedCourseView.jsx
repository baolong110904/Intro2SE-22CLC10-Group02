import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseData from "../data/courseData.json";
import Participants from "../components/Participants";
import Navbar2 from "../components/Navbar2.jsx";

const DetailedCourseView = () => {
  const { courseId } = useParams();
  const course = CourseData.find((course) => course.id.toString() === courseId);
  const [activeTab, setActiveTab] = useState("course");
  const [openSection, setOpenSection] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customSections, setCustomSections] = useState([]);
  const [showCreateSectionModal, setShowCreateSectionModal] = useState(false);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!course) {
    return <p>Course not found.</p>;
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
    setOpenSubSection(null);
  };

  const toggleSubSection = (subSection) => {
    setOpenSubSection(openSubSection === subSection ? null : subSection);
  };

  const handleCreateSection = (e) => {
    e.preventDefault();
    const sectionName = e.target.sectionName.value;
    const requirements = e.target.requirements.value;
    const subsection = e.target.subsection.value;
    const material = e.target.material.files[0];

    const newSection = {
      id: customSections.length + 1,
      name: sectionName,
      requirements,
      subsection,
      material,
    };

    setCustomSections([...customSections, newSection]);
    setShowCreateSectionModal(false);
  };

  const handleEditSection = (e) => {
    e.preventDefault();
    const updatedSection = {
      ...sectionToEdit,
      name: e.target.sectionName.value,
      requirements: e.target.requirements.value,
      subsection: e.target.subsection.value,
      material: e.target.material.files[0] || sectionToEdit.material,
    };

    const updatedSections = customSections.map((section) =>
      section.id === sectionToEdit.id ? updatedSection : section
    );

    setCustomSections(updatedSections);
    setShowEditSectionModal(false);
    setSectionToEdit(null);
  };

  const handleDeleteSection = (sectionId) => {
    const filteredSections = customSections.filter(
      (section) => section.id !== sectionId
    );
    setCustomSections(filteredSections);
  };

  const openEditModal = (section) => {
    setSectionToEdit(section);
    setShowEditSectionModal(true);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Navbar2 userName="Bao Long" isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full">
        <div className="p-4 border-b">
          <nav className="text-sm text-gray-600">
            <a href="/teacher" className="hover:text-blue-600">
              Course (2023-2024)
            </a>{" "}
            &gt;{" "}
            <span className="font-semibold text-blue-600">
              {course.title} - {course.id}
            </span>
          </nav>
        </div>

        <div className="p-4 md:p-6 lg:p-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            onClick={() => setShowCreateSectionModal(true)}
          >
            Create Section
          </button>
        </div>

        <div className="flex mt-4 space-x-4 border-b">
          {["course", "participants", "grades", "materials"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-semibold border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              } hover:text-blue-600`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "course" && (
          <div className="p-4 md:p-6 lg:p-8">
            {/* Existing Sections */}
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
                </div>
              )}
            </div>

            <div>
              <button
                className="flex items-center justify-between w-full py-3 text-left font-semibold text-lg text-orange-600"
                onClick={() => toggleSection("announcement")}
              >
                Announcement
                <span>{openSection === "announcement" ? "▲" : "▼"}</span>
              </button>
              {openSection === "announcement" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {/* Review Exercises */}
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-700"
                      onClick={() => toggleSubSection("announce")}
                    >
                      Announce
                      <span>{openSubSection === "announce" ? "▲" : "▼"}</span>
                    </button>
                    {openSubSection === "announce" && (
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Details for Announcement exercises go here.</p>
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
                </div>
              )}
            </div>


            {/* Custom Sections */}
            {customSections.map((section, index) => (
              <div key={index} className="relative">
                <button
                  className="flex items-center justify-between w-full py-3 text-left font-semibold text-lg text-orange-600"
                  onClick={() => toggleSection(section.name)}
                >
                  {section.name}
                  <span>{openSection === section.name ? "▲" : "▼"}</span>
                </button>
                {openSection === section.name && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p><strong>Requirements:</strong> {section.requirements}</p>
                      <p><strong>Subsection:</strong> {section.subsection}</p>
                      <p><strong>Material:</strong> {section.material.name}</p>
                    </div>
                  </div>
                )}
                {/* Edit and Delete Buttons */}
                <div className="absolute top-0 right-0 flex space-x-2">
                  <button
                    className="bg-yellow-400 text-white py-1 px-2 rounded-md hover:bg-yellow-500"
                    onClick={() => openEditModal(section)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render Participants Component if "participants" tab is active */}
        {activeTab === "participants" && (
          <div className="p-4 md:p-6 lg:p-8">
            <Participants />
          </div>
        )}

        {/* Create Section Modal */}
        {showCreateSectionModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
              <h2 className="text-2xl font-semibold mb-4">Create Section</h2>
              <form onSubmit={handleCreateSection}>
                <div className="mb-4">
                  <label className="block text-gray-700">Section Name:</label>
                  <input type="text" name="sectionName" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Requirements:</label>
                  <input type="text" name="requirements" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Subsection:</label>
                  <input type="text" name="subsection" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Upload Material:</label>
                  <input type="file" name="material" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateSectionModal(false)}
                    className="mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Section Modal */}
        {showEditSectionModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
              <h2 className="text-2xl font-semibold mb-4">Edit Section</h2>
              <form onSubmit={handleEditSection}>
                <div className="mb-4">
                  <label className="block text-gray-700">Section Name:</label>
                  <input
                    type="text"
                    name="sectionName"
                    defaultValue={sectionToEdit.name}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Requirements:</label>
                  <input
                    type="text"
                    name="requirements"
                    defaultValue={sectionToEdit.requirements}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Subsection:</label>
                  <input
                    type="text"
                    name="subsection"
                    defaultValue={sectionToEdit.subsection}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Upload Material:</label>
                  <input type="file" name="material" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditSectionModal(false)}
                    className="mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCourseView;
