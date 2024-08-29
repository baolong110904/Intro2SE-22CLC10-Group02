import axiosInstance from "../axios/customAxios"

const UploadThumbnail = async (file, courseId) => {
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("file", file)
  console.log(formData.get("file"))
  console.log(file instanceof File)
  console.log(file.type)
  formData.forEach((value, key) => {
    console.log(key, value)
  })

  try {
    const res = await axiosInstance.post(
      `/courses/${courseId}/uploads/thumbnail`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Auth-User-Email": email,
          "Content-Type": "multipart/form-data",
        },
      },
    )
    console.log(formData.get("file"))
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
    return {
      success: false,
      message: error,
    }
  }
}

export default UploadThumbnail
