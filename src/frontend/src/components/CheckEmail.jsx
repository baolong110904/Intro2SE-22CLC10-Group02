import React from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h1>
        <p className="text-gray-600 mb-6">
          We've sent you a verification link. Please check your email to verify your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;