import axiosInstance from "../axios/customAxios"

const LoginService = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    })
    return res.data
  } catch (err) {
    let error = ""
    if (err.response) {
      error += err.response.data
        ? err.response.data.message
        : err.response.statusText
    } else {
      error += err.message
    }
    return { success: false, message: error }
  }
}

export default LoginService
