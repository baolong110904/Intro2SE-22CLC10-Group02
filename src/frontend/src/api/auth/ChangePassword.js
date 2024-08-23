import axiosInstance from "../axios/customAxios"

const ChangePassword = async (
  email,
  old_password,
  new_password,
  confirm_password,
) => {
  try {
    const res = await axiosInstance.put(
      "/auth/change-password",
      {
        old_password,
        new_password,
        confirm_password,
      },
      {
        headers: {
          "X-Auth-User-Email": email,
        },
      },
    )
    console.log("ChangePassword -> res", res)
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

export default ChangePassword
