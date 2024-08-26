import axiosInstance from "../axios/customAxios"

const UpdateProfile = async (
  email,
  username,
  first_name,
  last_name,
  date_of_birth,
  gender,
  description,
) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axiosInstance.put(
      "/users/profile",
      {
        username,
        first_name,
        last_name,
        date_of_birth,
        gender,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Auth-User-Email": email,
        },
      },
    )
    console.log("UpdateProfile -> res", res)
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

export default UpdateProfile
