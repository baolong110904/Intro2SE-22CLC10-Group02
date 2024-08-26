import axiosInstance from "../axios/customAxios"

const UploadAvatar = async (email, file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const token = localStorage.getItem("token")

    const response = await axiosInstance.post(`/users/uploads/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-AUTH-USER-EMAIL": email,
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error uploading avatar:", error)
    throw error
  }
}

export default UploadAvatar
