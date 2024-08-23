import axiosInstance from "../axios/customAxios"

const GetUserCourses = async (email, role) => {
  const token = localStorage.getItem("token")

  try {
    const res = await axiosInstance.get("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-User-Email": email,
      },
      params: {
        role: role,
      },
    })
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
    return {
      success: false,
      message: error,
    }
  }
}

export default GetUserCourses
