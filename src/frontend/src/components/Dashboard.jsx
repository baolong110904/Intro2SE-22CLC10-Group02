
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import ContextWrapper from "./calendar/ContextWrapper.js";
import ava1 from "../assets/ava1.png";
import ava2 from "../assets/ava2.png";
import recording from "../assets/recording.png";
import screensharing from "../assets/screensharing.png";
import virtualbg from "../assets/virtualbg.png";
import shareexperience from "../assets/shareexperience.png";
import Calendar from "./calendar/Calendar.js"

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
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("timetable");
  const navigate = useNavigate();
  // const [currenMonth, setCurrentMonth] = useState(getMonth());
  // const { monthIndex, showEventModal } = useContext(GlobalContext);

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
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  YOUR CLASSES
                </h2>
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category.title}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={post.author.imageUrl}
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
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
            <div className="text-center mb-8">
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

            {/* Features, Feedback, Highlights Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Meeting Features */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Meeting Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <img
                      src={screensharing}
                      alt="Feature 1"
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">Screen Sharing</h3>
                      <p className="text-green-600">Enabled</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <img
                      src={recording}
                      alt="Feature 2"
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">Recording</h3>
                      <p className="text-green-600">Enabled</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <img
                      src={virtualbg}
                      alt="Feature 3"
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">Virtual Backgrounds</h3>
                      <p className="text-green-600">Enabled</p>
                    </div>
                  </li>
                </ul>
              </div>

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
                          src={ava2}// Replace with actual avatar path
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
                    className="w-full rounded-lg mb-4"
                  />
                  <p className="font-semibold">
                    Great collaboration today! #TeamWork
                  </p>
                  <p className="text-gray-600">- @grace</p>
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