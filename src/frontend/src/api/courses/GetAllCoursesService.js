import axiosInstance from "../axios/customAxios"

const GetAllCoursesService = async (filter) => {
  try {
    const res = await axiosInstance.post("/courses/all", filter)
    return res
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

export default GetAllCoursesService
