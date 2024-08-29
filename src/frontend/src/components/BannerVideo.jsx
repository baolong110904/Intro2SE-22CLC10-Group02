import React from "react"
import { useNavigate } from "react-router-dom"
import bgVideo from "../assets/background_video.mp4"

const BannerVideo = () => {
  const navigate = useNavigate()
  const handleSignup = () => {
    navigate("/signup")
  }
  return (
    <div className="relative">
      {/* Background Video Banner */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
          <h1 className="text-5xl font-bold mb-2">About us</h1>
          <br />
          <p className="text-lg font-bold leading-relaxed">
            We are dedicated to providing the best service possible.
            <br />
            We envision a world where anyone, anywhere has the power to
            <br />
            transform their lives through learning languages.
          </p>
          <p>
            <button
              onClick={handleSignup}
              className="border border-white text-white px-6 py-3 rounded font-semibold text-lg mt-16 bg-transparent hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
            >
              JOIN NOW
            </button>
          </p>
        </div>
      </div>
      {/* Additional Content Below (Optional) */}
      <div className="p-8">{/* You can add more content here if needed */}</div>
    </div>
  )
}

export default BannerVideo
