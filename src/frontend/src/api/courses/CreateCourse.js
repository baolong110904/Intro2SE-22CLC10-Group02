import axiosInstance from "../axios/customAxios"

const createCourse = async (data) => {
  try {
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    const res = await axiosInstance.post("/courses", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-User-Email": email,
      },
    })
    console.log(res)
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

export default createCourse
