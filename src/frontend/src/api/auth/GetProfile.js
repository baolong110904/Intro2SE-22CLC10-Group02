import axiosInstance from "../axios/customAxios"

const GetProfile = async (email) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axiosInstance.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-User-Email": email,
      },
    })
    console.log("GetProfile -> res", res)
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

export default GetProfile
