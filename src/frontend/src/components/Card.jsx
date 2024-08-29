import React from "react"

const Card = ({ title, value, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-4xl font-bold text-blue-600">{value}</p>
    </div>
  )
}

export default Card