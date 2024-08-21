import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import addStudentToCourses from '../api/courses/AddStudentToCourse';
import getCart from '../api/courses/GetCoursesFromCart';

function PaymentCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');

    if (status === '00') {
      // Thanh toán thành công
      handleSuccessfulPayment(orderId);
    } else {
      // Thanh toán thất bại
      navigate('/payment-failed');
    }
  }, [location, navigate]);

  const handleSuccessfulPayment = async (orderId) => {
    try {
      const courses = await getCart()
      console.log(courses.data.data)
      const courseIds = courses.data.data.map(course => course.id);
      console.log(courseIds)
      const response = await addStudentToCourses(courseIds, orderId)
      console.log(response)
      console.log(orderId)
      if (response.data.status === 200) {
        // Nếu xác nhận thành công, chuyển hướng đến trang thành công
        navigate('/student');
        alert("Payment successfully!")
      } else {
        // Xử lý lỗi nếu cần
        navigate('/enrollment-failed');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      navigate('/enrollment-failed');
    }
  };
}

export default PaymentCallback;