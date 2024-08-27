import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoFilterOutline } from 'react-icons/io5';
import { FaSortAmountDown } from 'react-icons/fa';

const Mycourse = ({ initialCourses, handleFilterChange, showMore, handleShowMoreClick }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [filters, setFilters] = useState({
    rating: null,
    topic: "all",
    subcategory: "all",
    language: "all"
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    if (!initialCourses) return;

    let result = initialCourses;

    if (filters.rating) {
      result = result.filter(course => course.rating >= filters.rating);
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

  const handleLocalFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      rating: null,
      topic: "all",
      subcategory: "all",
      language: "all"
    });
    setCourses(initialCourses);
  };
  
  return (
    <div className="course-section p-0 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Courses
      </h2>

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
                {[4.0, 3.0, 2.0, 1.0].map(rating => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rating" 
                      value={rating} 
                      onChange={(e) => handleLocalFilterChange("rating", parseFloat(e.target.value))} 
                    />
                    <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                    <span className="text-gray-600">{rating}.0 & up</span>
                    <span className="text-gray-400 ml-auto">(4,472)</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 shadow-sm space-y-4">
            {['topic', 'subcategory', 'language'].map(filterType => (
              <div key={filterType}>
                <h3 className="text-lg font-semibold text-gray-800">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 mt-2"
                  onChange={(e) => handleLocalFilterChange(filterType, e.target.value)}
                >
                  <option value="all">All {filterType}s</option>
                  {filterType === 'topic' && <option value="Language">Language</option>}
                  {filterType === 'subcategory' && ['Pronunciation', 'Words', 'Composition'].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                  {filterType === 'language' && ['english', 'spanish'].map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses && courses.length > 0 ? (
            courses.map(course => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg p-4 overflow-hidden space-y-4 transition-transform transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                    <span className="text-gray-700 text-sm">{course.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  {course.teachers.map((teacher, index) => (
                    <p key={index} className="text-gray-600 mb-4">
                      Teacher: {teacher}
                    </p>
                  ))}
                  <Link to={`/course/${course.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-xs font-medium">
                      Go to course
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-xl text-gray-600">No courses available with the selected filters.</p>
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
  );
};

export default Mycourse;