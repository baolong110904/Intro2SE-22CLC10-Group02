import React from "react";
import Navbar from "../components/Navbar.jsx";
import bgVideo from "../assets/background_video.mp4";
// import VideoBanner from "../components/BannerVideo.jsx";

const Introduction = () => {
  return (
    <div className="relative w-full h-screen" id="introduction">
        <Navbar/>
        {/* <VideoBanner /> */}
    </div>
  );
};

export default Introduction;