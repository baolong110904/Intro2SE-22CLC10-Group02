import React, { useState, useEffect } from "react"
import participantsData from "../data/participantsData.json"
import GetParticipants from "../api/courses/GetParticipants"
import removeStudent from "../api/courses/RemoveStudent"

const Participants = ({ courseId }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [participants, setParticipants] = useState([])
  const [newParticipant, setNewParticipant] = useState({
    id: "",
    name: "",
    avatar: "",
    role: "Student",
    group: "No groups",
    lastAccess: "Just now",
  })
  const role = localStorage.getItem("role")

  useEffect(() => {
    fetchParticipants()
  }, [courseId]) // Khi courseId thay đổi, fetch lại participants

  const fetchParticipants = async () => {
    try {
      console.log(courseId)
      const response = await GetParticipants(courseId)
      const users = response.data.data
      setParticipants(
        users.map((user) => ({
          id: user.id || "",
          name: `${user.last_name} ${user.first_name}` || "",
          avatar: user.avatar || "",
          role: user.role.map((role) => role.name).join(", ") || "STUDENT",
          group: "No groups",
          lastAccess: "Just now",
        })),
      )
      console.log(response)
    } catch (error) {
      console.error("Error fetching participants:", error)
    }
  }

  // Các hàm xử lý tìm kiếm, thêm và xoá participant
  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle input change for new participant
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewParticipant({ ...newParticipant, [name]: value })
  }

  // Add a new participant
  const handleAddParticipant = () => {
    if (newParticipant.id && newParticipant.name) {
      setParticipants([...participants, newParticipant])
      setNewParticipant({
        id: "",
        name: "",
        avatar: "",
        role: "STUDENT",
        group: "No groups",
        lastAccess: "Just now",
      })
    } else {
      alert("Please enter both ID and Name.")
    }
  }

  // Delete a participant
  const handleDeleteParticipant = async (id) => {
    try {
      const res = await removeStudent(courseId, id)
      console.log(res)
      if (res.status !== 200) {
        throw new Error("Failed to delete participant.")
      }

      const updatedParticipants = participants.filter(
        (participant) => participant.id !== id,
      )
      setParticipants(updatedParticipants)
    } catch (error) {
      console.error(error)
    }
  }

  // Filter participants based on the search term
  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Enrolled Users</h1>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            {/* <h2 className="text-xl font-semibold mb-2">Add New User</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="ID"
                name="id"
                value={newParticipant.id}
                onChange={handleInputChange}
                className="p-2 border rounded-lg w-1/4"
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newParticipant.name}
                onChange={handleInputChange}
                className="p-2 border rounded-lg w-1/2"
              />
              <button
                onClick={handleAddParticipant}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                Add User
              </button>
            </div> */}
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">First name / Last name</th>
                <th className="py-2">Roles</th>
                <th className="py-2">Groups</th>
                <th className="py-2">Last access to course</th>
                {role === "TEACHER" && <th className="py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td className="py-2 px-4 flex items-center">
                    {" "}
                    {/* Sử dụng flex để canh avatar với tên */}
                    <img
                      src={participant.avatar || "default-avatar-url.jpg"} // Thay thế bằng URL ảnh mặc định nếu cần
                      alt={`${participant.name}'s avatar`}
                      className="w-10 h-10 rounded-full mr-4" // Avatar hình tròn và margin-right để tạo khoảng cách với tên
                    />
                    <span>{participant.name}</span>
                  </td>
                  <td className="py-2 px-4">{participant.role}</td>
                  <td className="py-2 px-4">{participant.group}</td>
                  <td className="py-2 px-4">{participant.lastAccess}</td>
                  <td className="py-2 px-4">
                    {role === "TEACHER" && (
                      <button
                        onClick={() => handleDeleteParticipant(participant.id)}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Participants
