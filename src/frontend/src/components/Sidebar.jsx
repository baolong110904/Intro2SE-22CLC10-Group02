import React, { useState, useEffect } from "react"
import { MdDashboard, MdOutlineMessage } from "react-icons/md"
import { SiSimpleanalytics } from "react-icons/si"
import { LiaToolsSolid } from "react-icons/lia"
import { IoSettingsSharp } from "react-icons/io5"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

const variants = {
  expanded: { width: "20%" },
  nonExpanded: { width: "5%" },
}

const navItems = [
  { name: "Dashboard", icon: MdDashboard, path: "dashboard" },
  { name: "Analytics", icon: SiSimpleanalytics, path: "analytics" },
  { name: "Message", icon: MdOutlineMessage, path: "message" },
  { name: "Grammar Checking", icon: LiaToolsSolid, path: "tools" },
  { name: "Setting", icon: IoSettingsSharp, path: "setting" },
]

const Sidebar = ({ isDarkMode, onNavItemClicked }) => {
  const [activeNavIndex, setActiveNavIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsExpanded(width > 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleNavItemClick = (index, path) => {
    setActiveNavIndex(index)
    onNavItemClicked(path)
  }

  return (
    <motion.section
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className={`h-screen flex flex-col justify-between items-center gap-10 relative transition-all duration-300 ease-in-out ${
        isExpanded ? "py-8 px-6" : "py-6"
      } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        {isExpanded ? (
          <div id="logo-box">
            <h1
              className={`font-bold text-4xl ${isDarkMode ? "text-red-600" : "text-blue-600"}`}
            >
              G2{" "}
              <span
                className={`italic ${isDarkMode ? "text-yellow-500" : "text-green-500"}`}
              >
                LL
              </span>
            </h1>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1
              className={`font-bold text-3xl ${isDarkMode ? "text-red-500" : "text-blue-500"}`}
            >
              G
            </h1>
            <span
              className={`font-bold text-3xl ${isDarkMode ? "text-yellow-500" : "text-green-500"}`}
            >
              2
            </span>
          </div>
        )}

        <div
          id="navlinks-box"
          className="flex flex-col justify-center items-center gap-5 w-full mt-5"
        >
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className="w-full"
              onClick={() => handleNavItemClick(index, item.path)}
            >
              <motion.div
                id="link-box"
                className={`flex items-center gap-4 w-full cursor-pointer rounded-full transition-all duration-300 ${
                  activeNavIndex === index
                    ? `${isDarkMode ? "bg-yellow-500 text-black" : "bg-blue-500 text-white"}`
                    : `${isDarkMode ? "text-white" : "text-black"}`
                } ${isExpanded ? "px-6 py-2" : "py-2 justify-center"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`flex items-center ${isDarkMode ? "bg-yellow-300 text-black" : "bg-blue-300 text-black"} p-2 rounded-full`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div className={`flex-1 ${isExpanded ? "flex" : "hidden"}`}>
                  <span className="text-lg flex items-center">{item.name}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        <motion.div
          id="expanded-icon"
          className={`bg-yellow-500 text-black p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 transition-all duration-300 transform ${
            isExpanded ? "rotate-90" : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowRight />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Sidebar
