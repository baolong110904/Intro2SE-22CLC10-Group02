import { TitlePortal } from "react-admin"
import axiosInstance from "../axios/customAxios"

const CreatePost = async (title, slug, content, description, courseId) => {
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  console.log(token)
  let data = {
    title: title,
    slug: slug,
    content: content,
    description: description,
    courseId: courseId,
  }

  try {
    const res = await axiosInstance.post("/posts", data, {
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

export default CreatePost
