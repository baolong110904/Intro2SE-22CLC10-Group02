import axiosInstance from "../axios/customAxios"

const GetAllPosts = async () => {
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  console.log(token)
  try {
    const res = await axiosInstance.get("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-User-Email": email,
      },
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

export default GetAllPosts