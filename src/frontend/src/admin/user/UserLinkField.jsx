import * as React from "react"
import { Link, useRecordContext } from "react-admin"
import { Box, Avatar, Typography } from "@mui/material"

const UserLinkField = ({ size = "25" }) => {
  const record = useRecordContext()
  if (!record) {
    console.log("No record found")
    return null
  }

  console.log("Record: ", record)

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={record.avatar?.imageUrl}
        alt={record.username}
        style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
      />
      <Box ml={2}>
        <Typography variant="body2">
          <Link to={`/admin/users/${record.id}`}>
            {record.first_name} {record.last_name}
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default UserLinkField
