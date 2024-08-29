import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import BannerVideo from "../components/BannerVideo.jsx"
import about1 from "../assets/about1.png"
import about2 from "../assets/about2.jpg"
import Huy from "../assets/huy.jpg"
import Nam from "../assets/nam.jpg"
import Long from "../assets/long.jpg"
import Quan from "../assets/quan.jpg"
import Triet from "../assets/triet.jpg"
import Doge from "../assets/doge.jpg"
const teamMembers = [
  { name: "Do Minh Huy", role: "Backend + Frontend Developer", bio: "", image: Huy },
  {
    name: "Nguyen Bao Long",
    role: "Team Leader + Designer + Frontend Developer",
    bio: "",
    image: Long,
  },
  {
    name: "Nguyen Thanh Nam",
    role: "Backend + Frontend Developer",
    bio: "",
    image: Nam,
  },
  {
    name: "Bui Minh Quan",
    role: "Designer + Frontend Developer",
    bio: "",
    image: Quan,
  },
  { name: "Dinh Duy Triet", role: "Frontend Developer", bio: "", image: Triet },
  { name: "Shiba", role: "Mental Supporter", bio: "", image: Doge },
]

const Introduction = () => {
  const navigate = useNavigate()

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="relative w-full h-screen" id="introduction">
      <Navbar />
      <div className="mt-16">
        <BannerVideo />
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8">
        {/* Text Content 1 */}
        <div className="lg:w-1/2 p-4">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              At G2 Learning, we are committed to helping individuals achieve their
              goals through innovative and personalized learning experiences. Our
              platform provides a range of resources and tools to support learners at
              every stage of their journey. Whether you're looking to enhance your
              skills or explore new subjects, we're here to guide you every step of
              the way.
            </p>
          </div>
        </div>
        {/* Image 1 */}
        <div className="lg:w-1/2 p-4">
          <img
            src={about1}
            alt="Description of the about1"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8">
        {/* Image on the Left */}
        <div className="lg:w-1/2 p-4">
          <img
            src={about2}
            alt="Description of the about2"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Text Content on the Right */}
        <div className="lg:w-1/2 p-4">
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Globality</h2>
            <p className="text-lg leading-relaxed">
              At G2, we offer a flexible and accessible way to acquire new skills and
              broaden cultural understanding from anywhere in the world. Through
              interactive platforms, learners can engage with diverse materials,
              practice speaking with online teachers, and progress at their own pace.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Developers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <h4 className="text-lg font-medium text-gray-600 mb-2">
                {member.role}
              </h4>
              <p className="text-gray-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Box with JOIN NOW button */}
      <div className="flex justify-center items-center shadow-md p-8 mt-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="mb-4">
            Join our community today and start your journey towards mastering a new
            language.
          </p>
          <button
            onClick={handleSignup}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 border border-blue-600"
          >
            JOIN NOW
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Introduction
