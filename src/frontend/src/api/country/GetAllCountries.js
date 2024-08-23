import axiosInstance from "../axios/customAxios"

const GetAllCountries = async () => {
  try {
    const res = await axiosInstance.get("countries/cache")
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

export default GetAllCountries
