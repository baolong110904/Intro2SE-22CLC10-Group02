import axiosInstance from "../axios/customAxios"

const removeStudent = async (courseId, studentId) => {
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  try {
    const res = await axiosInstance.put(
      `/courses/${courseId}/${studentId}`,
      {}, // empty object as body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Auth-User-Email": email,
        },
      },
    )
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

export default removeStudent
