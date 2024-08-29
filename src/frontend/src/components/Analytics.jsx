import React, { useState } from "react"
import Card from "./Card"
import LineChart from "./LineChart"
import CountUp from "react-countup"

const Week = ({ weekNumber, title, tasks, completed }) => {
  const [isOpen, setIsOpen] = useState(weekNumber === 1)

  return (
    <div className="mb-4">
      <div
        className={`p-4 rounded-lg shadow cursor-pointer transition-colors duration-300 ${
          completed ? "bg-green-500 text-white" : "light:bg-white dark:bg-neutral-800 light:text-black dark:text-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{`Week ${weekNumber}`}</h3>
          <div>{isOpen ? "▼" : "▶"}</div>
        </div>
        <h4>{title}</h4>
      </div>
      {isOpen && (
        <div className="light:bg-white dark:bg-neutral-800 p-4 rounded-lg shadow mt-2 transition-colors duration-300">
          {tasks.map((task, index) => (
            <div key={index} className="flex justify-between items-center mb-2 text-sm">
              <div className="w-1/4">
                <div className="light:text-gray-700 dark:text-gray-300">{task.type}</div>
                <div className="light:text-gray-500 dark:text-gray-400">{task.time}</div>
              </div>
              <div className="w-1/4 light:text-gray-500 dark:text-gray-400">{task.status}</div>
              <div className="w-1/4 light:text-gray-500 dark:text-gray-400">{task.grade}</div>
              <div className="w-1/4 light:text-gray-500 dark:text-gray-400">{task.dueDate}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const CourseProgress = ({ weeks }) => {
  return (
    <div className="light:bg-white dark:bg-neutral-800 p-4 rounded-lg shadow transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 light:text-gray-800 dark:text-gray-200">Course Progress</h2>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm light:text-gray-600 dark:text-gray-400">Start</span>
          <div className="flex flex-grow bg-gray-200 h-2 rounded-full mx-4">
            {weeks.map((week, index) => (
              <div
                key={index}
                className={`flex-grow h-full rounded-full ${
                  week.completed ? "bg-green-500" : "bg-yellow-500"
                } mr-1`}
              ></div>
            ))}
          </div>
          <span className="text-sm light:text-gray-600 dark:text-gray-400">Week {weeks.length}</span>
        </div>
      </div>

      {weeks.map((week) => (
        <Week key={week.weekNumber} {...week} />
      ))}
    </div>
  )
}

const Analytics = () => {
  const userData = [
    { date: "Mar 15", users: 3800 },
    { date: "Mar 16", users: 3400 },
    { date: "Mar 17", users: 2500 },
    { date: "Mar 18", users: 2600 },
    { date: "Mar 19", users: 3500 },
    { date: "Mar 20", users: 3300 },
    { date: "Mar 21", users: 4700 },
  ]

  const weeks = [
    {
      weekNumber: 1,
      title: "Basic Experiment Design Concepts",
      tasks: [
        { type: "Videos", time: "Done", status: "Done", grade: "100%", dueDate: "Jul 31" },
        { type: "Quiz", time: "8 min", status: "Completed", grade: "100%", dueDate: "Jul 31" },
      ],
      completed: true,
    },
    {
      weekNumber: 2,
      title: "User Preferences: Tests of Proportions",
      tasks: [
        { type: "Videos", time: "40 min left", status: "In Progress", grade: "-", dueDate: "Aug 7" },
        { type: "Quiz", time: "18 min", status: "Not Started", grade: "-", dueDate: "Aug 7" },
        { type: "Quiz", time: "30 min", status: "Not Started", grade: "-", dueDate: "Aug 7" },
      ],
      completed: false,
    },
    {
      weekNumber: 3,
      title: "Phonetics: How to pronounce it correctly",
      tasks: [
        { type: "Videos", time: "57 min left", status: "Not Started", grade: "-", dueDate: "Aug 28" },
        { type: "Quiz", time: "20 min", status: "Not Started", grade: "-", dueDate: "Aug 28" },
        { type: "Quiz", time: "45 min", status: "Not Started", grade: "-", dueDate: "Aug 28" },
      ],
      completed: false,
    },
  ]

  return (
    <div className="p-4 light:bg-gray-100 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 light:text-gray-800 dark:text-gray-200">Student Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          title="Exercises Completed"
          value={<CountUp end={100} duration={2.5} />}
          icon="🏆"
        />
        <Card
          title="Average Score"
          value={<CountUp end={8.8} duration={2.5} decimals={1} suffix="/10" />}
          icon="📊"
        />
        <Card
          title="Ranking Change"
          value={<CountUp end={24} duration={2.5} prefix="+ " />}
          icon="📈"
        />
      </div>
      <div className="light:bg-white dark:bg-neutral-800 p-4 rounded-lg shadow mb-6 transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4 light:text-gray-800 dark:text-gray-200">Student Overview</h2>
        <LineChart data={userData} />
      </div>
      <CourseProgress weeks={weeks} />
    </div>
  )
}

export default Analytics