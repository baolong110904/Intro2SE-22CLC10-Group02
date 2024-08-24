import axiosInstance from "../axios/customAxios"

const addStudentToCourses = async (courseIds, orderId) => {
  try {
    console.log(courseIds)
    const res = await axiosInstance.post("/courses/add-student", {
      courseIds: courseIds,
      email: localStorage.getItem("email"),
      orderId: orderId,
    })
    console.log(res)
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

export default addStudentToCourses
