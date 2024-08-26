import React, { useState } from "react";
import participantsData from "../data/participantsData.json";

const Participants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState(participantsData);
  const [newParticipant, setNewParticipant] = useState({
    id: "",
    name: "",
    role: "Student",
    group: "No groups",
    lastAccess: "Just now",
  });

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle input change for new participant
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewParticipant({ ...newParticipant, [name]: value });
  };

  // Add a new participant
  const handleAddParticipant = () => {
    if (newParticipant.id && newParticipant.name) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant({
        id: "",
        name: "",
        role: "Student",
        group: "No groups",
        lastAccess: "Just now",
      });
    } else {
      alert("Please enter both ID and Name.");
    }
  };

  // Delete a participant
  const handleDeleteParticipant = (id) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== id
    );
    setParticipants(updatedParticipants);
  };

  // Filter participants based on the search term
  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className="text-xl font-semibold mb-2">Add New User</h2>
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
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">First name / Last name</th>
                <th className="py-2">Roles</th>
                <th className="py-2">Groups</th>
                <th className="py-2">Last access to course</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td className="py-2 px-4">{participant.name}</td>
                  <td className="py-2 px-4">{participant.role}</td>
                  <td className="py-2 px-4">{participant.group}</td>
                  <td className="py-2 px-4">{participant.lastAccess}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteParticipant(participant.id)}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-2 px-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Participants;
