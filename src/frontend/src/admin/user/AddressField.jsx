import * as React from "react"

const AddressField = ({ record }) => {
  return record ? (
    <div>
      {record.phone}, {record.country}, {record.city}, {record.province},{" "}
      {record.district}, {record.ward}, {record.address}
    </div>
  ) : null
}

export default AddressField
