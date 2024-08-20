import React, { useState, useEffect } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import logo from "./G2LL.svg"
import { useNavigate } from "react-router-dom"
import LoginService from "../api/auth/LoginService"
import VerifyRoleService from "../api/auth/VerifyRoleService"
import Footer from "./Footer"
import Navbar from "./Navbar"
import loginImg from "../assets/login.png"

// const Login = ({ isOpen, onClose }) => {
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (accessToken && email) {
      navigate("/")
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await LoginService(email, password)
      console.log("Login response:", res)
      if (res.success) {
        const { access_token, user } = res.data
        localStorage.setItem("token", access_token)
        localStorage.setItem("email", user.email)

        const roleRes = await VerifyRoleService(user.email)

        const { success, status, data } = roleRes

        if (success) {
          console.log("Role:", success, status, data)
          localStorage.setItem("role", data)
          if (data === "STUDENT") {
            navigate("/student")
          } else if (data === "TEACHER") {
            navigate("/teacher")
          } else if (data === "ADMIN") {
            navigate("/admin")
          } else {
            setErrorMessage("Invalid role.")
          }
        }
      } else {
        setErrorMessage("Invalid email or password.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage("An error occurred during login.")
    }
  }

  // const openSignupModal = () => {
  //   setIsSignupOpen(true)
  // }

  // if (!isOpen) return null

  return (
    <div
      className="relative overflow-y-auto inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50"
      id="login"
    >
      <Navbar />
      <div className="relative w-full h-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-cyan-950 dark:text-white"
          aria-label="Close"
        >
          <IoClose />
        </button> */}
        <section className="gradient-form h-full bg-neutral-200 dark:bg-darkBg flex justify-center">
          <div className="container h-full p-10 text-cyan-950 dark:text-white">
            <div className="flex h-full flex-wrap items-center justify-center">
              <div className="h-full flex justify-center items-center">
                <div className="block rounded-lg bg-white dark:bg-neutral-800 shadow-xl w-full p-4 max-w-screen-xl mx-auto mt-27 h-screen">
                  <div className="g-0 lg:flex lg:flex-wrap h-full">
                    {/* Left column container */}
                    <div className="px-4 md:px-0 lg:w-8/12 h-full flex flex-col justify-center">
                      <div className="md:mx-6 md:p-12">
                        {/* Logo */}
                        <div className="text-center">
                          <img
                            className="mx-auto w-36 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
                            src={logo}
                            alt="G2 Learning Language"
                            onClick={() => navigate("/")}
                          />
                          <h3 className="mb-11 mt-2 pb-1 text-xl font-extrabold text-cyan-950 dark:text-white">
                            We are G2 Learning Language!
                          </h3>
                        </div>

                        <form onSubmit={handleLogin}>
                          <p className="mb-4 font-bold text-cyan-950 dark:text-neutral-200">
                            Please login to your account
                          </p>

                          {/* Social Login Buttons */}
                          {/* <div className="flex justify-center mb-6 space-x-4">
                            <button className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded shadow-md hover:bg-gray-100 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:hover:bg-neutral-600">
                              <FcGoogle className="mr-2 text-xl" />
                              <span className="text-sm font-medium text-black dark:text-white">Login with Google</span>
                            </button>
                            <button className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none">
                              <FaFacebook className="mr-2 text-xl" />
                              <span className="text-sm font-medium">Login with Facebook</span>
                            </button>
                          </div> */}

                          {/* Email input */}
                          <div className="relative mb-6">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="block mb-2 text-neutral-500 dark:text-neutral-400"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                              id="exampleFormControlInput1"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          {/* Password input */}
                          <div className="relative mb-1">
                            <label
                              htmlFor="exampleFormControlInput11"
                              className="block mb-2 text-neutral-500 dark:text-neutral-400"
                            >
                              Password
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                              id="exampleFormControlInput11"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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

                          {/* Error message */}
                          {errorMessage && (
                            <div className="mb-4 text-red-500">{errorMessage}</div>
                          )}

                          {/* Submit button */}
                          <div className="mb-4 pb-1 pt-1 text-center">
                            <button
                              className="animate-slidein700 opacity-0 py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                              type="submit"
                              style={{
                                background:
                                  "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
                              }}
                            >
                              Log in
                            </button>

                            {/* Forgot password link */}
                            {/* <a
                              className="text-cyan-950 dark:text-neutral-200"
                              href="#!"
                            >
                              Forgot password?
                            </a> */}
                          </div>

                          {/* Register button */}
                          {/* <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 me-2 text-cyan-950 dark:text-neutral-200">
                              Don't have an account?
                            </p>
                            <button
                              type="button"
                              className="bg-blue-700 inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:bg-rose-950 dark:border-rose-900 dark:text-white dark:hover:bg-rose-900 dark:focus:bg-rose-900 dark:active:bg-rose-900"
                              // onClick={openSignupModal}
                              onClick={() => navigate("/signup")}
                            >
                              Register
                            </button>
                              <Signup isOpen={isSignupOpen} />
                          </div> */}
                          <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-2 lg:space-y-2">
                            <p className="text-cyan-950 dark:text-neutral-200 account-link"
                              onClick={() => navigate("/request-reset-password")}
                            >
                              Forgot password?
                            </p>
                            <p
                              className="text-cyan-950 dark:text-neutral-200 account-link"
                              onClick={() => navigate("/signup")}
                            >
                              Don't have an account?
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Right column container with background, description, and image */}
                    <div
                      className="lg:w-4/12 h-full flex-col hidden lg:block"
                      style={{
                        background:
                          "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
                      }}
                    >
                      <div className="px-4 py-4 text-white md:mx-6 md:p-8 flex-shrink-0">
                        <h4 className="mb-2 text-l font-semibold">
                          We are more than a learning language website
                        </h4>
                        <p className="text-sm mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris
                        </p>
                      </div>
                      <div className="flex-grow flex justify-end items-end">
                        <img
                          src={loginImg}
                          alt="Login"
                          className="w-full h-auto object-cover"
                        />
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

export default Login
