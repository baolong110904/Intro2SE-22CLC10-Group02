import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Button, Typography, Modal, Grid } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import { useNavigate } from "react-router-dom"
import GetUserCourses from "../api/courses/GetUserCourse"
import addStudentToCourses from "../api/courses/AddStudentToCourse"
import getCart from "../api/courses/GetCoursesFromCart"

const PaymentCallBack = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openFailModal, setOpenFailModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    handleSuccessfulPayment() // Tự động gọi hàm khi component được load
  }, [])

  const handleSuccessfulPayment = async (orderId) => {
    try {
      const searchParams = new URLSearchParams(location.search)
      const orderId = searchParams.get("orderId")

      const courses = await getCart()
      console.log(courses.data.data)
      const courseIds = courses.data.data.map((course) => course.id)
      console.log(courseIds)
      const response = await addStudentToCourses(courseIds, orderId)
      console.log(response)

      if (response.data.status === 200) {
        setOpenSuccessModal(true) // Hiển thị modal thông báo thành công
      } else {
        setOpenFailModal(true) // Hiển thị modal thông báo thất bại
      }
    } catch (error) {
      console.error("Error confirming payment:", error)
      setOpenFailModal(true) // Hiển thị modal thông báo thất bại
    }
  }

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false)
    navigate("/student") // Điều hướng đến trang khóa học sau khi đóng modal
  }

  const handleCloseFailModal = () => {
    setOpenFailModal(false)
    navigate("/courses")
  }

  return (
    <>
      {/* Modal Payment Success */}
      <Modal open={openSuccessModal} onClose={handleCloseSuccessModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your payment was successful. You can now view your courses.
          </Typography>
          <Button
            variant="contained"
            startIcon={<SchoolIcon />}
            onClick={handleCloseSuccessModal}
            sx={{
              mt: 2,
              backgroundColor: "#4CAF50",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            View Courses
          </Button>
        </Box>
      </Modal>

      {/* Modal Payment Fail */}
      <Modal open={openFailModal} onClose={handleCloseFailModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Failed
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Unfortunately, your payment could not be processed. Please try again.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseFailModal}
            sx={{
              mt: 2,
              backgroundColor: "#f44336",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Try Again
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PaymentCallBack
