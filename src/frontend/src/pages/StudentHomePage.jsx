import React, { useState, useEffect } from "react"
import Navbar2 from "../components/Navbar2.jsx"
import Sidebar from "../components/Sidebar.jsx"
import Analytics from "../components/Analytics.jsx"
import Message from "../components/Message.jsx"
import Tools from "../components/Tool.jsx"
import DictionarySearch from "../components/Dictionary.jsx"
import DashboardStudent from "../components/StudentDashboard.jsx"
import CourseGrid from "../components/CourseBox.jsx"
import { useNavigate } from "react-router-dom"
import VerifyRoleService from "../api/auth/VerifyRoleService"

const StudentHomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) {
        navigate("/login");
        return;
      }

      try {
        const roleRes = await VerifyRoleService(email, token);
        const { success, data } = roleRes;
        
        if (success) {
          localStorage.setItem("role", data);

          if (data === "STUDENT") {
            navigate("/student");
          } else if (data === "TEACHER") {
            navigate("/teacher");
          } else if (data === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

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
      case "my-course":
        return <CourseGrid />
      case "analytics":
        return <Analytics />
      case "message":
        return <Message />
      case "tools":
        return <Tools />
      case "setting":
        return <DictionarySearch />
      default:
        return <DashboardStudent />
    }
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Navbar2
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
