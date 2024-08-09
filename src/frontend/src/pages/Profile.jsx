import React from "react"
import Navbar2 from "../components/Navbar2.jsx"
import axiosInstance from "../api/axios/customAxios"

const Profile = () => {
  const handleProfileButton = () => {
    const email = localStorage.getItem("email")

    if (email) {
      axiosInstance
        .get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-Auth-User-Email": email,
          },
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log("Error", err)
        })
    } else {
      console.log("User not logged in")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar2 />
      <div>
        <h1>Profile</h1>
        <button onClick={handleProfileButton}>Get Profile</button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="flex items-center px-6 py-4">
            <img
              className="w-16 h-16 rounded-full object-cover mx-2"
              alt=""
              src="https://picsum.photos/200"
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Nguyễn Bảo Long</p>
              <p className="text-gray-600 text-sm">Username: baolong110904</p>
            </div>
          </div>
          <hr />
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">Information</h2>
            <ul className="list-disc space-y-2">
              <li>
                <p className="text-gray-700">Department: Tutor (TUTOR)</p>
              </li>
              <li>
                <p className="text-gray-700">Email: baolong110904@gmail.com</p>
              </li>
              <li>
                <p className="text-gray-700">Mobile: 0703454711</p>
              </li>
              <li>
                <p className="text-gray-700">Center: 246 Cống Quỳnh</p>
              </li>
              <li>
                <p className="text-gray-700">
                  Role: Tutor (Created By: Ngoc Huyen Nguyen, 28/06/2023)
                </p>
              </li>
              <li>
                <p className="text-gray-700">
                  Updated By: Ngoc Huyen Nguyen, 28/05/2023
                </p>
              </li>
            </ul>
          </div>
          <hr />
          {/* Additional sections like VAT Information, Referral, History can be added here */}
        </div>
      </div>
    </div>
  )
}

export default Profile
