import React from "react"
import { useNavigate } from "react-router-dom"
import screensharing from "../assets/screensharing.png"
import recording from "../assets/recording.png"
import virtualbg from "../assets/virtualbg.png"
import shareexperience from "../assets/shareexperience.png"
import ava1 from "../assets/ava1.png"
import ava2 from "../assets/ava2.png"
import { Divider, IconButton, Tooltip } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import PeopleIcon from "@mui/icons-material/People"

const OnlineMeetingHome = ({ meetingId }) => {
  const navigate = useNavigate()

  const copyMeetingId = () => {
    navigator.clipboard
      .writeText(meetingId)
      .then(() => alert("Meeting ID copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err))
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Meeting</h1>
        <p className="text-gray-600 mb-4">
          Join the meeting to collaborate with others
        </p>
        {/* Meeting ID Display */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 py-3 px-6 rounded-lg shadow-sm border border-blue-200 flex items-center">
            <PeopleIcon className="text-blue-500 mr-2" />
            <span className="font-semibold text-blue-700 mr-2">Meeting ID:</span>
            <span className="font-mono text-blue-800">{meetingId}</span>
          </div>
          <Tooltip title="Copy Meeting ID">
            <IconButton
              onClick={copyMeetingId}
              className="bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
              size="large"
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </div>

        {/* Join Now button */}
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md"
          onClick={() => navigate("/meeting")}
        >
          Join Now
        </button>
      </div>

      {/* Decorative Divider */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xl">
          <span className="bg-white px-4 text-gray-500">Meeting Details</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Meeting Features */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Meeting Features</h2>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <img
                src={screensharing}
                alt="Screen Sharing"
                className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
              />
              <h3 className="font-semibold mt-2">Screen Sharing</h3>
              <p className="text-green-600">Enabled</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={recording}
                alt="Recording"
                className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
              />
              <h3 className="font-semibold mt-2">Recording</h3>
              <p className="text-green-600">Enabled</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={virtualbg}
                alt="Virtual Backgrounds"
                className="w-[192px] h-[347px] rounded-lg transform transition-transform duration-300 hover:scale-110"
              />
              <h3 className="font-semibold mt-2">Virtual Backgrounds</h3>
              <p className="text-green-600">Enabled</p>
            </div>
          </div>
        </div>

        {/* Meeting Feedback and Highlights */}
        <div className="flex flex-col space-y-8">
          {/* Meeting Feedback */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Meeting Feedback</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">Great meeting, very informative</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="ml-4 flex items-center">
                    <img
                      src={ava1} // Replace with actual avatar path
                      alt="John Doe Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-gray-600">John Doe</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">Enjoyed the interactive session</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <div className="ml-4 flex items-center">
                    <img
                      src={ava2} // Replace with actual avatar path
                      alt="Jane Smith Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-gray-600">Jane Smith</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Highlights */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Meeting Highlights</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <img
                src={shareexperience}
                alt="Highlight"
                className="w-full rounded-lg mb-4 transform transition-transform duration-300 hover:scale-110"
              />
              <p className="font-semibold">Great collaboration today! #TeamWork</p>
              <p className="text-gray-600">- @grace</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineMeetingHome
