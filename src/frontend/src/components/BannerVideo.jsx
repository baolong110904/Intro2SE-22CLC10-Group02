import React from "react";
import bgVideo from "../assets/background_video.mp4"

const VideoBanner = () => {
    return (
        <div className="relative">
        {/* Background Video Banner */}
        <div className="relative h-[400px] w-full overflow-hidden">
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