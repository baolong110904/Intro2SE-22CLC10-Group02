import axiosInstance from "../axios/customAxios"

const GetUserCourses = async (email, role) => {
  try {
    const res = await axiosInstance.get("/courses", {
        params: {
          email: email,
          role: role
        }
    });
    return res
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

export default GetUserCourses
