import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx"
import BannerVideo from "../components/BannerVideo.jsx";
import about1 from "../assets/about1.png"; // Import your image here
import about2 from "../assets/about2.jpg"; // Import your image here

const Introduction = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  
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
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              At G2 Learning, we are committed to helping individuals achieve their goals through innovative and personalized
              learning experiences. Our platform provides a range of resources and tools to support learners at every stage of
              their journey. Whether you're looking to enhance your skills or explore new subjects, we're here to guide you every
              step of the way.
            </p>
          </div>
        </div>
        {/* Image 1 */}
        <div className="lg:w-1/2 p-4">
          <img
            src={about1}
            alt="Description of the about1"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
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
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Text Content on the Right */}
        <div className="lg:w-1/2 p-4">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Globality</h2>
            <p className="text-lg leading-relaxed">
              At G2, we offer a flexible and accessible way to acquire new skills and broaden cultural understanding from anywhere in
              the world. Through interactive platforms, learners can engage with diverse materials, practice speaking with online
              teachers, and progress at their own pace.
            </p>
          </div>
        </div>
      </div>

      {/* Box with JOIN NOW button */}
      <div className="flex justify-center items-center p-8 mt-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="mb-4">
            Join our community today and start your journey towards mastering a new language.
          </p>
          <button
            onClick={handleSignup}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            JOIN NOW
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Introduction;