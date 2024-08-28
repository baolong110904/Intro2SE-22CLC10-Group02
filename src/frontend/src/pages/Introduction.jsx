import React from "react";
import Navbar from "../components/Navbar.jsx";
import bgVideo from "../assets/background_video.mp4";
import VideoBanner from "../components/BannerVideo.jsx";

const Introduction = () => {
  return (
    <div className="relative w-full h-screen" id="introduction">
        <Navbar/>
        <div className="mt-16"> {/* Adjust margin to match the height of the Navbar */}
            <VideoBanner />
        </div>
    </div>
  );
};

export default Introduction;