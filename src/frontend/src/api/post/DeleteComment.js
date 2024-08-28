import axiosInstance from "../axios/customAxios"

const deleteComment = async (commentId) => {
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    try {
        const res = await axiosInstance.delete(`/posts/comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Auth-User-Email": email,
                },
            }
        )
        return res
    } catch (err) {
        let error = ""
        if (err.response) {
            error += err.response.data ?
                err.response.data.message :
                err.response.statusText
        } else {
            error += err.message
        }
        return {
            success: false,
            message: error,
        }
    }
}

export default deleteComment