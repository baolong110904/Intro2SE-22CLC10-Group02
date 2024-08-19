import React from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useInput } from "react-admin"

const SexInput = (props) => {
  const { field } = useInput(props)

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Gender</InputLabel>
      <Select {...field} label="Gender">
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SexInput
