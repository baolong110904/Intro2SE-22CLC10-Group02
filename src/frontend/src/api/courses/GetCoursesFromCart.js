import axiosInstance from "../axios/customAxios"

const getCart = async () => {
    try {
        const res = await axiosInstance.get("/cart/all", {
          params: { email: localStorage.getItem("email")}})
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

export default getCart