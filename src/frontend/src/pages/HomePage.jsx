import React, { useState } from "react"

import Navbar from "../components/Navbar.jsx"
import Home from "../pages/Home.jsx"
import Services from "../pages/Services.jsx"
import About from "../pages/About.jsx"
import Pricing from "../pages/Pricing.jsx"
import Recruitment from "../components/Recruitment.jsx"
import Footer from "../components/Footer.jsx"
import Login from "../components/Login.jsx"
import SignUp from "../components/Signup.jsx"

const HomePage = () => {
  // const [showLogin, setShowLogin] = useState(false)
  // const [showSignUp, setShowSignUp] = useState(false)
  return (
    <div>
      {/* <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignUpClick={() => setShowSignUp(true)}
      /> */}
      <Navbar />
      <Home />
      <Services />
      <About />
      <Recruitment />
      <Pricing />
      <Footer />
      {/* Conditionally render Login or Signup page based on state */}
      {/* {showLogin && <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />}
      {showSignUp && (
        <SignUp isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
      )} */}
    </div>
  )
}

export default HomePage
