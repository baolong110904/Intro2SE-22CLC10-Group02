import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { IoMdSearch } from "react-icons/io"
import logo from ".//G2Learning.svg" // Adjust path if necessary
import ThemeToggle from "../components/ThemeToggle"
import { useNavigate } from "react-router-dom"
import VerifyRoleService from "../api/auth/VerifyRoleService"
import SchoolIcon from "@mui/icons-material/School"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const [isHoveredMyLearning, setIsHoveredMyLearning] = useState(false)
  const [isHoveredProfile, setIsHoveredProfile] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleIsLogin = () => {
    // get user login status from local storage
    const user = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    if (user && token) {
      // console.log("User is logged in")
      setIsLogin(true)
    }
  }

  const handleProfileSignUpButton = () => {
    if (isLogin) {
      navigate("/profile")
    } else {
      navigate("/signup")
    }
  }

  const handleLoginLogoutButton = () => {
    if (isLogin) {
      localStorage.clear()
      setIsLogin(false)
      navigate("/")
    } else {
      navigate("/login")
    }
  }

  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  const handleDashboardButton = async (e) => {
    e.preventDefault()
    try {
      if (!email || !token) {
        navigate("/login")
        return
      }

      const roleRes = await VerifyRoleService(email, token)
      const { success, status, data } = roleRes
      if (success) {
        console.log("Role:", success, status, data)
        localStorage.setItem("role", data)
        if (data === "STUDENT") {
          navigate("/student")
        } else if (data === "TEACHER") {
          navigate("/teacher")
        } else if (data === "ADMIN") {
          navigate("/admin")
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      navigate("/")
      console.error("Login error:", error)
    }
  }

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/dashboard", link: "Dashboard" },
    { path: "/courses", link: "Courses" },
    { path: "/about", link: "About" },
    { path: "/blogs", link: "Blogs" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    handleIsLogin()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    handleIsLogin()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 bg-white dark:bg-gray-800 shadow-lg ${isScrolled ? "shadow-md" : ""}`}
    >
      <nav className="px-1 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-12 sm:h-12 mr-2 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          />
          <NavLink
            to="/"
            className="text-lg sm:text-xl font-bold text-blue-950 dark:text-white logo-text"
          >
            G2 <span className="text-black dark:text-white">Language Learning</span>
          </NavLink>
        </div>

        <ul className="hidden lg:flex gap-6 xl:gap-12 text-lg">
          {/* {navItems.map(({ link, path }) => (
            <li key={link}>
              <NavLink
                to={path}
                className="nav-link cursor-pointer text-black dark:text-white"
                activeClassName="active"
              >
                {link}
              </NavLink>
            </li>
          ))} */}
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/"
              className="nav-link cursor-pointer text-black dark:text-white"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleDashboardButton}
              to="/dashboard"
              className="nav-link cursor-pointer text-black dark:text-white"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/courses"
              className="nav-link cursor-pointer text-black dark:text-white"
              activeClassName="active"
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/about"
              className="nav-link cursor-pointer text-black dark:text-white"
              activeClassName="active"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/blogs"
              className="nav-link cursor-pointer text-black dark:text-white"
              activeClassName="active"
            >
              Blogs
            </NavLink>
          </li>
        </ul>

        <div className="hidden lg:flex gap-4 items-center">
          <NavLink
            to="/my-courses/learning"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 relative"
            onMouseEnter={() => setIsHoveredMyLearning(true)}
            onMouseLeave={() => setIsHoveredMyLearning(false)}
          >
            <SchoolIcon className="w-5 h-5" />
            {isHoveredMyLearning && (
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                My Learning
              </span>
            )}
          </NavLink>
          {/* <NavLink
            to="/profile"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 relative"
            onMouseEnter={() => setIsHoveredProfile(true)}
            onMouseLeave={() => setIsHoveredProfile(false)}
          >
            <CgProfile className="w-5 h-5" />
            {isHoveredProfile && (
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
                My Profile
              </span>
            )}
          </NavLink> */}
          {/* <NavLink
            to="/cart"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaShoppingCart className="w-5 h-5" />
          </NavLink> */}
          <button
            onClick={handleLoginLogoutButton}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-all duration-200 ease-in"
          >
            {isLogin ? "Log out" : "Log in"}
          </button>

          <button
            onClick={handleProfileSignUpButton}
            className="bg-transparent text-blue-600 px-4 py-2 text-sm font-medium rounded border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in"
          >
            {isLogin ? "Profile" : "Sign up"}
          </button>
          <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="px-4 py-6 bg-white space-y-4">
          {/* {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                onClick={toggleMenu}
                to={path}
                className="block text-black hover:text-blue-600"
                activeClassName="text-blue-600"
              >
                {link}
              </NavLink>
            </li>
          ))} */}
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/"
              className="block text-black hover:text-blue-600"
              activeClassName="text-blue-600"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleDashboardButton}
              className="block text-black hover:text-blue-600"
              activeClassName="text-blue-600"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/courses"
              className="block text-black hover:text-blue-600"
              activeClassName="text-blue-600"
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/about"
              className="block text-black hover:text-blue-600"
              activeClassName="text-blue-600"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              to="/blogs"
              className="block text-black hover:text-blue-600"
              activeClassName="text-blue-600"
            >
              Blogs
            </NavLink>
          </li>
          <li className="flex gap-2">
            <NavLink
              to="/my-courses/learning"
              className="text-blue-950 relative"
              onMouseEnter={() => setIsHoveredMyLearning(true)}
              onMouseLeave={() => setIsHoveredMyLearning(false)}
            >
              <SchoolIcon className="w-5 h-5" />
              {isHoveredMyLearning && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-blue-950 text-white text-xs rounded whitespace-nowrap z-10">
                  My Learning
                </span>
              )}
            </NavLink>
            {/* <NavLink 
              to="/profile" 
              className="text-blue-950 relative"
              onMouseEnter={() => setIsHoveredProfile(true)}
              onMouseLeave={() => setIsHoveredProfile(false)}
            >
              <CgProfile className="w-5 h-5" />
              {isHoveredProfile && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-blue-950 text-white text-xs rounded whitespace-nowrap z-10">
                  My Profile
                </span>
              )}
            </NavLink> */}
            {/* <NavLink to="/cart" className="text-blue-950">
              <FaShoppingCart />
            </NavLink> */}
          </li>
          <li>
            <button
              onClick={handleLoginLogoutButton}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              {isLogin ? "Log out" : "Log in"}
            </button>
          </li>
          <li>
            <button
              onClick={handleProfileSignUpButton}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              {isLogin ? "Profile" : "Sign up"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
