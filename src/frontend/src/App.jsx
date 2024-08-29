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
import PaymentCallback from "./components/VNPayCallBack.jsx"
import Courses from "./components/Courses.jsx"
import Forum from "./components/Forum.jsx"
import DetailedCourseView from "./components/DetailedCourseView.jsx"
import Meeting from "./pages/Meeting.jsx"
import MyLearning from "./pages/MyLearning.jsx"
import Blogs from "./pages/Blogs.jsx"
import Analytics from "./components/Analytics.jsx"
import Introduction from "./pages/Introduction.jsx"

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/request-reset-password" element={<RequestResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/payment-success" element={<PaymentCallback />} />
        <Route path="/payment-failed" element={<PaymentCallback />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/course/:courseId" element={<DetailedCourseView />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/my-courses/learning" element={<MyLearning />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<Introduction />} />
      </Routes>
    </>
  )
}

export default App
