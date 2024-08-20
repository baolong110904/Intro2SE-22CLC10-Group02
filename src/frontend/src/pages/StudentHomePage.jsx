import React, { useState, useEffect } from "react"
import Navbar2 from "../components/Navbar2.jsx"
import Sidebar from "../components/Sidebar.jsx"
import Analytics from "../components/Analytics.jsx"
import Message from "../components/Message.jsx"
import Tools from "../components/Tool.jsx"
import Setting from "../components/Setting.jsx"
import DashboardStudent from "../components/StudentDashboard.jsx"

const StudentHomePage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [activePage, setActivePage] = useState("dashboard")
    useEffect(() => {
      const body = document.body
      if (isDarkMode) {
        body.classList.add("dark")
      } else {
        body.classList.remove("dark")
      }
    }, [isDarkMode])
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode)
    }
    const renderActivePage = () => {
      switch (activePage) {
        case "dashboard":
          return <DashboardStudent />
        case "analytics":
          return <Analytics />
        case "message":
          return <Message />
        case "tools":
          return <Tools />
        case "setting":
          return <Setting />
        default:
          return <DashboardStudent />
      }
    }
    
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      >
        <Navbar2
          userName="Bao Long"
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        <div className="flex">
          <Sidebar isDarkMode={isDarkMode} onNavItemClicked={setActivePage} />
          <div className="flex-1 p-6">{renderActivePage()}</div>
        </div>
      </div>
    )
  }

  export default StudentHomePage