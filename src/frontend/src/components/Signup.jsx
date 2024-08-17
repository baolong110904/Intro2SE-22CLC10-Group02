import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./G2LL.svg"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Footer from "./Footer"
import Navbar from "./Navbar"
import SignupService from "../api/auth/SignupService"

const signUpImg = "https://imgur.com/aTIxqDa.png"

// const SignUp = ({ isOpen, onClose }) => {
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await SignupService(email, password, username, gender, firstName, lastName, dateOfBirth, role)
      navigate("/check-email")
    } catch (error) {
      console.error(error)
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (accessToken && email) {
      navigate("/")
    }
  }, [navigate])

  const isEmailValid = (email) => {
    // Add your email validation logic here
    return /^\S+@\S+\.\S+$/.test(email)
  }

  const isPasswordValid = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
  }

  const isUsernameValid = (username) => {
    return /^[a-zA-Z0-9_.]{2,50}$/.test(username)
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email")
      console.log("Invalid email")
      return
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Password must contain at least 8 characters, one uppercase, one lowercase, one number")
      console.log("Invalid password")
      return
    }
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setPasswordMatch(true)
    setCurrentStep(2)
    setErrorMessage("")
    console.log("Moving to step 2");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email")
      return
    }
    if (!isPasswordValid(password)) {
      setErrorMessage("Password must contain at least 8 characters, one uppercase, one lowercase, one number")
      return
    }
    if (!isUsernameValid(username)) {
      setErrorMessage("Username must be alphanumeric and have at least 2 characters and maximum 50 characters allow underscore, dot")
      return
    }
    if (!firstName) {
      setErrorMessage("First name is required")
      return
    }
    if (!lastName) {
      setErrorMessage("Last name is required")
      return
    }
    if (!dateOfBirth) {
      setErrorMessage("Date of birth is required")
      return
    }
    if (!gender) {
      setErrorMessage("Gender is required")
      return
    }
    if (!role) {
      setErrorMessage("Role is required")
      return
    }
    setErrorMessage("")
    //backend
    console.log({ email, password, username, firstName, lastName, dateOfBirth, gender, role })
    setPasswordMatch(true)
    navigate("/")
  }

  const Step1 = () => {
    return (
      <form onSubmit={handleNextStep} className="space-y-6">
        {/* Email input */}
        <div className="relative mb-6">
          <label
            htmlFor="signUpEmail"
            className="block mb-2 text-neutral-500 dark:text-neutral-400"
          >
            Email
          </label>
          <input
            type="email"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="signUpEmail"
            placeholder="Email"
            defaultValue={email}
            onBlur={(e) => setEmail(e.target.value)}
          />
        </div>
  
        {/* Password input */}
        <div className="relative mb-6">
          <label htmlFor="signUpPassword" className="block mb-2 text-neutral-500 dark:text-neutral-400">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="signUpPassword"
            placeholder="Password"
            defaultValue={password}
            onBlur={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            style={{ top: "75%", transform: "translateY(-60%)" }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
  
        {/* Confirm Password input */}
        <div className="relative mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-neutral-500 dark:text-neutral-400">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="confirmPassword"
            placeholder="Confirm Password"
            defaultValue={confirmPassword}
            onBlur={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400 focus:outline-none"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ top: "75%", transform: "translateY(-60%)" }}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          {!passwordMatch && (
            <p className="text-red-500 text-xs mt-1 absolute">
              Passwords do not match
            </p>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
      </form>
    );
  };
  const Step2 = () => {
    return (
      <div className="space-y-6">
        {/* Username input */}
        <div className="relative mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-neutral-500 dark:text-neutral-400"
          >
            Username
          </label>
          <input
            type="text"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="username"
            placeholder="Username"
            defaultValue={username}
            onBlur={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* First name input */}
        <div className="relative mb-6">
          <label
            htmlFor="firstName"
            className="block mb-2 text-neutral-500 dark:text-neutral-400"
          >
            First Name
          </label>
          <input
            type="text"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="firstName"
            placeholder="First Name"
            defaultValue={firstName}
            onBlur={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last name input */}
        <div className="relative mb-6">
          <label
            htmlFor="lastName"  
            className="block mb-2 text-neutral-500 dark:text-neutral-400"
          >
            Last Name
          </label>
          <input
            type="text"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="lastName"
            placeholder="Last Name"
            defaultValue={lastName}
            onBlur={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Date of birth input */}
        <div className="relative mb-6">
          <label
            htmlFor="dateOfBirth"
            className="block mb-2 text-neutral-500 dark:text-neutral-400"
          >
            Date of Birth
          </label>
          <input
            type="date"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            id="dateOfBirth"
            placeholder="Date of Birth"
            defaultValue={dateOfBirth}
            onBlur={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
  
        {/* Gender selection */}
        <div className="relative mb-6">
          <label htmlFor="gender" className="block mb-2 text-neutral-500 dark:text-neutral-400">
            Gender
          </label>
          <select
            id="gender"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      

        {/* Role selection */}
        <div className="relative mb-6">
          <label htmlFor="role" className="block mb-2 text-neutral-500 dark:text-neutral-400">
            Role
          </label>
          <select
            id="role"
            className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    );
  };

  return (
    <div
      className="relative overflow-y-auto inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50"
      id="signup"
    >
      <Navbar />
      <div className="relative w-full h-full mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-cyan-950 dark:text-white z-10"
          aria-label="Close"
        >
          <IoClose />
        </button> */}
        <section className="gradient-form h-full bg-neutral-200 dark:bg-darkBg flex justify-center">
          <div className="container mx-auto p-4 md:p-10 h-full text-cyan-950 dark:text-white">
            <div className="flex flex-wrap items-center justify-center">
              <div className="w-full max-w-screen-xl mx-auto">
                <div className="block rounded-lg bg-white dark:bg-neutral-800 shadow-xl">
                  <div className="lg:flex lg:flex-wrap">
                    <div
                      className="lg:w-5/12 hidden lg:block"
                      style={{
                        background:
                          "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
                      }}
                    >
                      <div className="px-4 py-6 text-white md:p-12 flex flex-col h-full">
                        <div>
                          <h4 className="mb-6 text-xl font-semibold">
                            Join us today and start learning!
                          </h4>
                          <p className="mb-6">
                            Discover the best way to learn a new language with our
                            innovative platform. Join now and take the first step
                            towards mastering a new language.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img
                            src={signUpImg}
                            alt="Sign Up"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-7/12 px-4 md:px-0">
                      <div className="md:p-12 md:mx-6">
                        <div className="text-center mb-10">
                          <img
                            className="mx-auto w-36 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
                            src={logo}
                            alt="G2 Learning Language"
                            onClick={() => navigate("/")}
                          />
                          <h3 className="mt-4 text-xl font-extrabold text-cyan-950 dark:text-white">
                            Get started with G2 Learning Language!
                          </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <p className="font-bold text-cyan-950 dark:text-neutral-200">
                            Create your account
                          </p>
                        </form>
                        
                        {currentStep === 1 ? (
                          <>
                            <Step1 />
                            <div className="mb-1 pb-1 pt-5 text-center">
                              <button
                                className="animate-slidein700 opacity-0 py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] border border-slate-500 font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                                onClick={handleNextStep}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Step2 />
                            <div className="mb-1 pb-1 pt-5 text-center">
                              <button
                                className="animate-slidein700 opacity-0 py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] border border-slate-500 font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                                onClick={handleSignUp}
                              >
                                Sign Up
                              </button>
                            </div>
                          </>
                        )}
                        
                        <div className="flex items-center justify-between pb-6">
                          <p
                            className="mb-0 mr-2 text-black dark:text-neutral-200 account-link"
                            onClick={() => navigate("/login")}
                          >
                            Already have an account?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default SignUp
