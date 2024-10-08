import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ResetPasswordService } from "../api/auth/ResetPasswordService"
import logo from "./G2LL.svg"
import Footer from "./Footer"
import Navbar from "./Navbar"

const LoadingIcon = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isPasswordValid = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (accessToken && email) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tokenFromUrl = searchParams.get("token")
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setErrorMessage("No token provided. Please use the link from your email!")
    }
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setErrorMessage("")
    if (!token) {
      setErrorMessage("No token available. Cannot reset password!")
      return
    }
    if (!isPasswordValid(newPassword)) {
      setErrorMessage(
        "Password must contain at least 8 characters, including uppercase, lowercase, and numbers.",
      )
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!")
      return
    }
    try {
      const response = await ResetPasswordService.resetPassword(
        email,
        newPassword,
        token,
      )
      setMessage(response.data || "Password reset successful!")
      setIsLoading(true)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      const errorResponse = error.response?.data || {}
      setErrorMessage(
        errorResponse.message || "An error occurred. Please try again later!",
      )
      setIsLoading(false)
    }
  }

  return (
    <div
      className="relative overflow-y-auto inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50"
      id="reset-password"
    >
      <Navbar />
      <div className="relative w-full h-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
        <section className="gradient-form h-full bg-neutral-200 dark:bg-darkBg flex justify-center">
          <div className="container h-full p-10 text-cyan-950 dark:text-white">
            <div className="flex h-full flex-wrap items-center justify-center">
              <div className="h-full flex justify-center items-center">
                <div className="block rounded-lg bg-white dark:bg-neutral-800 shadow-xl w-full p-4 max-w-screen-md mx-auto mt-27">
                  <div className="text-center">
                    <img
                      className="mx-auto w-36 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
                      src={logo}
                      alt="G2 Learning Language"
                      onClick={() => navigate("/")}
                    />
                    <h3 className="mb-11 mt-2 pb-1 text-xl font-extrabold text-cyan-950 dark:text-white">
                      Reset Password
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <p className="mb-4 font-bold text-cyan-950 dark:text-neutral-200">
                      Enter your email and new password
                    </p>

                    {/* Email input */}
                    <div className="relative mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-neutral-500 dark:text-neutral-400"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {/* New Password input */}
                    <div className="relative mb-6">
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-neutral-500 dark:text-neutral-400"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                        id="newPassword"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Confirm Password input */}
                    <div className="relative mb-6">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-neutral-500 dark:text-neutral-400"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                      <div className="mb-4 text-red-500">{errorMessage}</div>
                    )}

                    {/* Success message */}
                    {message && <div className="mb-4 text-green-500">{message}</div>}

                    {/* Submit button */}
                    <div className="mb-4 pb-1 pt-1 text-center">
                      <button
                        className="py-2 hover:bg-blue-600 hover:text-white justify-center whitespace-nowrap dark:bg-blue-600 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_100%] before:transition before:duration-[0.4s] before:ease-out before:content-[''] hover:before:animate-[shimmer_1.5s_ease-out_infinite] font-medium leading-normal text-blue-600 w-full rounded-lg flex items-center"
                        type="submit"
                        style={{
                          background:
                            "linear-gradient(to right, #54D9D1, #2B75E1, #5EA8E7, #1C41CD)",
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <LoadingIcon />
                            <span className="ml-2">Redirecting...</span>
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </form>
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

export default ResetPassword
