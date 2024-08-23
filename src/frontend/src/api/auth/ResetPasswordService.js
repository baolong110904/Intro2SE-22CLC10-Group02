import axiosInstance from "../axios/customAxios"

export const ResetPasswordService = {
  requestResetPassword: (email) => {
    return axiosInstance.post(`/auth/reset-password/request`, { email })
  },
  resetPassword: (email, new_password, token) => {
    return axiosInstance.post(`/auth/reset-password/request/reset?token=${token}`, {
      email,
      new_password,
    })
  },
}
