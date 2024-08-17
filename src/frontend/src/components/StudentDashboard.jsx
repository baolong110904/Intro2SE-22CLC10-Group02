import React, { useState, useEffect } from "react"
import { startOfWeek } from "date-fns"
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule"
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars"
import "@syncfusion/ej2-base/styles/material.css"
import "@syncfusion/ej2-react-schedule/styles/material.css"
import { scheduleData } from "../data/calendar"

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
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )
  const [scheduleObj, setScheduleObj] = useState(null)
  const [activeSection, setActiveSection] = useState("timetable") // State to manage active section

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  const change = (args) => {
    setCurrentWeek(args.value)
    if (scheduleObj) {
      scheduleObj.selectedDate = args.value
      scheduleObj.dataBind()
    }
  }

  const onDragStart = (args) => {
    console.log("Drag start:", args)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "timetable":
        return (
          <>
            <ScheduleComponent
              key={currentWeek} // Add key to ensure proper updates
              height="450px"
              ref={(schedule) => setScheduleObj(schedule)}
              selectedDate={currentWeek}
              eventSettings={{ dataSource: scheduleData }}
              dragStart={onDragStart}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject
                services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
              />
            </ScheduleComponent>
            <div className="mt-5">
              <DatePickerComponent
                value={currentWeek}
                showClearButton={false}
                placeholder="Current Date"
                floatLabelType="Always"
                change={change}
              />
            </div>
          </>
        )
      case "studyingSessions":
        return (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  YOUR CLASSES
                </h2>
                {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                  Learn how to grow your business with our expert advice.
                </p> */}
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
        )
      case "lessonSupport":
        return <div>My Lesson Support sessions</div>
      case "teachingSupport":
        return <div>My Teaching Support sessions</div>
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
        <div className="flex space-x-2">
          {/* Add any additional top controls or information here if needed */}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap space-x-4">
        <button
          className={`px-4 py-2 ${activeSection === "timetable" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("timetable")}
        >
          Timetable
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "studyingSessions" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("studyingSessions")}
        >
          My Studying Sessions
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "lessonSupport" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("lessonSupport")}
        >
          My Lesson Support sessions
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "teachingSupport" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
          onClick={() => setActiveSection("teachingSupport")}
        >
          My Teaching Support sessions
        </button>
        <button
          className={`px-4 py-2 ${activeSection === "ea" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} rounded-md`}
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
