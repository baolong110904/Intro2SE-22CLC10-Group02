import axiosInstance from "../axios/customAxios"

const UpdateAddress = async (
  email,
  phone_number,
  country,
  city,
  province,
  district,
  ward,
  address,
  address_type,
  is_default,
) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axiosInstance.put(
      "/users/address",
      {
        phone_number,
        country,
        city,
        province,
        district,
        ward,
        address,
        address_type,
        is_default,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Auth-User-Email": email,
        },
      },
    )
    console.log("UpdateAddress -> res", res)
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

export default UpdateAddress
