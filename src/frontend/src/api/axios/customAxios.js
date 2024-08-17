import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// axiosInstance.interceptors.request.use((config) => {
//   config.headers["Authorization"] = localStorage.getItem("token")
//
//   return config
// })

export default axiosInstance
