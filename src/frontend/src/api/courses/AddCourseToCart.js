import axiosInstance from "../axios/customAxios"

const addToCart = async (course) => {
    try {
        course.email = localStorage.getItem("email")
        const res = await axiosInstance.post("/cart", course)
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
};

export default addToCart