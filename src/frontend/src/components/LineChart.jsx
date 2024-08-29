import React from "react"

const LineChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.users))
  const minValue = Math.min(...data.map((item) => item.users))

  // Smaller width and height for the chart
  const chartWidth = 700
  const chartHeight = 10

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * chartWidth
      const y = ((maxValue - item.users) / (maxValue - minValue)) * chartHeight
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="w-full h-32 relative">
      {" "}
      {/* Adjust height of the container */}
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
        {/* Draw the line connecting points */}
        <polyline fill="none" stroke="blue" strokeWidth="2" points={points} />
        {/* Draw points on the line */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * chartWidth
          const y = ((maxValue - item.users) / (maxValue - minValue)) * chartHeight
          return <circle key={index} cx={x} cy={y} r="3" fill="blue" />
        })}
      </svg>
      {/* Dates below the chart */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs">
        {data.map((item, index) => (
          <span key={index}>{item.date}</span>
        ))}
      </div>
    </div>
  )
}

export default LineChart
