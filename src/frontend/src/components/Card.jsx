import React from "react"

const Card = ({ title, value, icon, trend, className = "" }) => {
  const getTrendColor = () => {
    if (trend === "up") return "text-green-500"
    if (trend === "down") return "text-red-500"
    return "text-gray-500"
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {icon && <span className="text-gray-600">{icon}</span>}
      </div>
      <div className="flex items-end">
        <p className="text-4xl font-bold text-blue-600 mr-2">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"}
          </span>
        )}
      </div>
    </div>
  )
}

export default Card