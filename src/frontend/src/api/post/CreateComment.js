import { TitlePortal } from "react-admin"
import axiosInstance from "../axios/customAxios"

const CreateComment = async (postId, content) => {
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  console.log(token)
  let data = {}
  data.content = content

  try {
    const res = await axiosInstance.post(`/posts/${postId}/comments`, data, {
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

export default CreateComment
