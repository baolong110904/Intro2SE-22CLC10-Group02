import React from "react";
import { useNavigate } from "react-router-dom"
import bgVideo from "../assets/background_video.mp4"

const VideoBanner = () => {
    const navigate = useNavigate()
    const handleSignup = () => {
          navigate("/signup")
    }    
      return (
        <div className="relative">
        {/* Background Video Banner */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={bgVideo}type="video/mp4" />
            Your browser does not support the video tag.
          </video>
  
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
            <h1 className="text-5xl font-bold mb-2">Welcome to G2 Learning</h1>
            <br/>
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
                className="bg-blue-600 text-white px-4 py-3 rounded text-sm mt-16 hover:bg-blue-700 transition-colors duration-300">
                    JOIN NOW
                </button>
            </p>
          </div>
      
        </div>
        
        {/* Additional Content Below (Optional) */}
        <div className="p-8">
          {/* You can add more content here if needed */}
        </div>
      </div>
    );
  };

export default VideoBanner;