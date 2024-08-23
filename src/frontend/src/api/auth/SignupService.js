import axiosInstance from "../axios/customAxios"

const SignupService = async (
  email,
  password,
  username,
  gender,
  first_name,
  last_name,
  date_of_birth,
  role,
) => {
  try {
    const res = await axiosInstance.post("/auth/register", {
      email,
      password,
      username,
      gender,
      first_name,
      last_name,
      date_of_birth,
      role,
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

export default SignupService
