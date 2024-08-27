import { React, useEffect, useState } from "react"
import { MdWbSunny, MdNightsStay, MdHome } from "react-icons/md"
import logo from "../components/G2Learning.svg"
import { Menu } from "@headlessui/react"
import { Link } from "react-router-dom"
import NotificationButton from "../components/Notifications"
import GetProfile from "../api/auth/GetProfile"
import { useNavigate } from "react-router-dom"

const Navbar = ({ userName, isDarkMode, toggleTheme }) => {
  const [profileData, setProfileData] = useState(null);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetProfile(userEmail);
      if (result.success) {
        setProfileData(result.data);
      } else {
        console.error("Failed to fetch profile data:", result.message);
      }
    };

    fetchProfile();
  }, [userEmail]);

  return (
    <header
      className={`p-4 flex justify-between items-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-800 text-white"
      }`}
    >
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12 mr-2 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer" onClick={() => navigate("/")} />  
        <h1 className="text-xl cursor-pointer">G2 Learning Language</h1>
        <Link to="/" className="ml-4">
          <MdHome size={24} />
        </Link>
      </div>
      <nav className="flex items-center">
        <Link to="/" className="mr-4">
          <i className="fas fa-home"></i>
        </Link>
        {/* <button className="mr-4">
          <MdNotificationsNone size={24} />
        </button> */}
        {/* Use NotificationButton here */}
        <NotificationButton />
        {/* <span className="mr-4">246 Cống Quỳnh</span>
        <span className="mr-4">TEACHER</span> */}
        {profileData && (
          <>
            <span className="mr-4">{profileData.address.address || "No Address"}</span>
            <span className="mr-4">
              {profileData.role[0]?.name || "No Role"}
            </span>
          </>
        )}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center">
            {/* <span>{userName}</span> */}
            {profileData && (
              <span>{profileData.first_name + " " + profileData.last_name}</span>
            )}
            <i className="fas fa-caret-down ml-2"></i>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg dark:bg-gray-800 dark:text-white">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } block px-4 py-2`}
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </Link>
              )}
            </Menu.Item>
            {/* <Menu.Item>
              {({ active }) => (
                <Link
                  to="/request-reset-password"
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } block px-4 py-2`}
                >
                  <i className="fas fa-key mr-2"></i> Change Password
                </Link>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } block px-4 py-2`}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* Move the dark mode switch button next to the user name */}
        <button
          onClick={toggleTheme}
          className={`ml-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {isDarkMode ? <MdWbSunny size={24} /> : <MdNightsStay size={24} />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
