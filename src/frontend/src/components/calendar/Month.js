import React from "react"
import Day from "./Day"

export default function Month({ month = [] }) {
  // Ensure month is defined and is an array
  if (!Array.isArray(month) || month.length === 0) {
    return <div>No data available for this month</div>
  }
  console.log(month)
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 z-10">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
