import axiosInstance from "../axios/customAxios"

const GetParticipants = async (course) => {
  const token = localStorage.getItem("token")
  const email = localStorage.getItem("email")
  try {
    const res = await axiosInstance.get("/courses/" + course.id + "/participants", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-User-Email": email,
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

export default GetParticipants
