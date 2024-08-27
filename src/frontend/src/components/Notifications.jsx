import React, { useState } from "react"
import { MdNotificationsNone } from "react-icons/md"
import notifications from "../data/notifications.json" // Adjust this path as needed

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="mr-4">
        <MdNotificationsNone size={24} />
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-md shadow-lg dark:bg-gray-800 dark:text-white max-h-96 overflow-y-auto z-50">
          <div className="p-4">
            <h4 className="text-lg font-semibold">Notifications</h4>
            <ul>
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="py-2 border-b border-gray-300 dark:border-gray-700"
                >
                  <p>
                    <strong>Course name: {notification.courseName}</strong>
                  </p>
                  <p>
                    Announced by: <strong>{notification.author}</strong>
                  </p>
                  <p>{notification.announcement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationButton
