import axiosInstance from "../axios/customAxios"

const VerifyRoleService = async (email) => {
  try {
    const token = localStorage.getItem("token")
    console.log("VerifyRoleService -> email", email)
    console.log("VerifyRoleService -> token", token)
    const res = await axiosInstance.post(
      "/roles/verify",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Auth-User-Email": email,
        },
      },
    )
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

export default VerifyRoleService
