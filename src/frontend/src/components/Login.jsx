import React, { useState, useEffect } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import logo from "./G2LL.svg"
import { useNavigate } from "react-router-dom"
import LoginService from "../api/auth/LoginService"
import VerifyRoleService from "../api/auth/VerifyRoleService"
import Footer from "./Footer"
import Navbar from "./Navbar"
import loginImg from "../assets/login.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
            setErrorMessage("Invalid role!")
          }
        }
      } else {
        setErrorMessage("Wrong email or password!")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage("An error occurred during login!")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-200 dark:bg-darkBg">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white dark:bg-neutral-800 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left column (form) */}
            <div className="w-full lg:w-8/12 p-8">
              <div className="text-center mb-8 sm:mt-10 logo-space-signup">
                <img
                  className="mx-auto w-36 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
                  src={logo}
                  alt="G2 Learning Language"
                  onClick={() => navigate("/")}
                />
                <h3 className="mt-2 text-xl font-extrabold text-cyan-950 dark:text-white">
                  We are G2 Learning Language!
                </h3>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <p className="font-bold text-cyan-950 dark:text-neutral-200">
                  Please login to your account
                </p>

                {/* Email input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-neutral-500 dark:text-neutral-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password input */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-neutral-500 dark:text-neutral-400"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded bg-transparent text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                {/* Submit button */}
                <button
                  className="w-full py-2 text-white rounded-lg font-medium"
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
                  }}
                >
                  Log in
                </button>

                {/* Links */}
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                  <p
                    className="text-cyan-950 dark:text-neutral-200 cursor-pointer"
                    onClick={() => navigate("/request-reset-password")}
                  >
                    Forgot password?
                  </p>
                  <p
                    className="text-cyan-950 dark:text-neutral-200 cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Don't have an account?
                  </p>
                </div>
              </form>
            </div>

            {/* Right column (image and text) */}
            <div
              className="hidden lg:flex lg:w-4/12 flex-col"
              style={{
                background:
                  "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
              }}
            >
              <div className="p-8 text-white flex-grow">
                <h4 className="mb-4 text-xl font-semibold">
                  We are more than a learning language website
                </h4>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris
                </p>
              </div>
              <div className="mt-auto">
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
      <Footer />
    </div>
  )
}

export default Login
