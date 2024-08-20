import axiosInstance from "../axios/customAxios"

const payMent = async (amount) => {
    try {
        const res = await axiosInstance.get("/payments/vn-pay", {
            params: { amount : amount,
                      bankCode : "NCB"
            }})
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

export default payMent