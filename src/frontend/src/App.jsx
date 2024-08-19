import React, { useEffect } from "react"
import "./App.css"
import { Routes, Route, useLocation } from "react-router-dom"

import HomePage from "./pages/HomePage.jsx"
import TeacherHomePage from "./pages/TeacherHomePage.jsx"
import Profile from "./pages/Profile.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import StudentHomePage from "./pages/StudentHomePage.jsx"
import CheckEmail from "./components/CheckEmail.jsx"
import RequestResetPassword from "./components/RequestResetPassword.jsx"
import ResetPassword from "./components/ResetPassword.jsx"
import { AdminPage } from "./admin/AdminPage.jsx"
function App() {
  // State to manage whether to show Login or Signup page
  const location = useLocation()
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto"
    window.scroll({ top: 0 })
    document.querySelector("html").style.scrollBehavior = ""
  }, [location.pathname]) // triggered on route change
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher" element={<TeacherHomePage />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/student" element={<StudentHomePage/>}/>
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/request-reset-password" element={<RequestResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
