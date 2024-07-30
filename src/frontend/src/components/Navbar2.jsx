import React from "react"
import { MdWbSunny, MdNightsStay, MdHome } from "react-icons/md"
import logo from "../components/G2Learning.svg"
import { Menu } from "@headlessui/react"
import { Link } from "react-router-dom"

const Navbar = ({ userName, isDarkMode, toggleTheme }) => {
  return (
    <header
      className={`p-4 flex justify-between items-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-800 text-white"}`}
    >
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-3" />
        <h1 className="text-xl">G2 Learning Language</h1>
        <Link to="/teacher" className="ml-4">
          <MdHome size={24} />
        </Link>
      </div>
      <nav className="flex items-center">
        <Link to="/" className="mr-4">
          <i className="fas fa-home"></i>
        </Link>
        <button
          onClick={toggleTheme}
          className={`mr-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {isDarkMode ? <MdWbSunny size={24} /> : <MdNightsStay size={24} />}
        </button>
        <span className="mr-4">246 Cống Quỳnh</span>
        <span className="mr-4">TEACHER</span>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center">
            <span>{userName}</span>
            <i className="fas fa-caret-down ml-2"></i>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg dark:bg-gray-800 dark:text-white">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${active ? "bg-gray-100 dark:bg-gray-700" : ""} block px-4 py-2`}
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/change-password"
                  className={`${active ? "bg-gray-100 dark:bg-gray-700" : ""} block px-4 py-2`}
                >
                  <i className="fas fa-key mr-2"></i> Change Password
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={`${active ? "bg-gray-100 dark:bg-gray-700" : ""} block px-4 py-2`}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </nav>
    </header>
  )
}

export default Navbar
