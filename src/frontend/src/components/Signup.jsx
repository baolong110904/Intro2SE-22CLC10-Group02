import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./G2LL.svg"
import { IoClose } from "react-icons/io5"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import Footer from "./Footer"
import Navbar from "./Navbar"

const signUpImg = "https://imgur.com/aTIxqDa.png"

// const SignUp = ({ isOpen, onClose }) => {
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  // if (!isOpen) return null;

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setPasswordMatch(true)
    navigate("/blogs")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setPasswordMatch(true)
    navigate("/teacher")
  }

  // const openModal = () => {
  //   setIsModalOpen(true)
  // }

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

                          {/* <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded shadow-md hover:bg-gray-100 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:hover:bg-neutral-600">
                              <FcGoogle className="mr-2 text-xl" />
                              <span className="text-sm font-medium text-black dark:text-white">
                                Sign up with Google
                              </span>
                            </button>
                            <button className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none">
                              <FaFacebook className="mr-2 text-xl" />
                              <span className="text-sm font-medium">
                                Sign up with Facebook
                              </span>
                            </button>
                          </div> */}

                          <div className="relative mb-6">
                            <label
                              htmlFor="signUpEmail"
                              className="block mb-2 text-neutral-500 dark:text-neutral-400"
                            >
                              Email
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                              id="signUpEmail"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="relative mb-6">
                            <label
                              htmlFor="signUpPassword"
                              className="block mb-2 text-neutral-500 dark:text-neutral-400"
                            >
                              Password
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                              id="signUpPassword"
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

                          <div className="relative mb-6">
                            <label
                              htmlFor="confirmPassword"
                              className="block mb-2 text-neutral-500 dark:text-neutral-400"
                            >
                              Confirm Password
                            </label>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400 focus:outline-none"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
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

                          {/* <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              className="animate-slidein700 opacity-0 py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] border border-slate-500 font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div> */}
                          <div className="mb-1 pb-1 pt-1 text-center">
                            <button
                              className="animate-slidein700 opacity-0 py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] border border-slate-500 font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                              type="submit"
                            >
                              Next
                            </button>
                          </div>
                        </form>

                        {/* <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2 text-black dark:text-neutral-200">
                            Already have an account?
                          </p>
                          <button
                            type="button"
                            className="bg-blue-700 inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:bg-rose-950 dark:border-rose-900 dark:text-white dark:hover:bg-rose-900 dark:focus:bg-rose-900 dark:active:bg-rose-900"
                            // onClick={openModal}
                            onClick={() => navigate("/login")}
                          >
                            Log In
                          </button>
                          <Login isOpen={isModalOpen} />
                        </div> */}
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
