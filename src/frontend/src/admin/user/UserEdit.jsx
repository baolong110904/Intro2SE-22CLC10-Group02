import React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  PasswordInput,
  useRecordContext,
  TextField,
  ReferenceField,
} from "react-admin"
import SexInput from "./SexInput"
import { Typography, Box } from "@mui/material"

const UserTitle = () =>{
  const record = useRecordContext()
  return <span>User {record ? `"${record.first_name} ${record.last_name}"` : ""}</span>
}

export const UserEdit = () => (
  <Edit title={"Edit User"} undoable={false}>
    <SimpleForm sanitizeEmptyValues>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <TextInput source="id" disabled />
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="email" disabled />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="username" isRequired />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="first_name" isRequired />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="last_name" isRequired />
        </Box>
      </Box>
      
      <DateInput source="date_of_birth" />
      <SexInput source="gender" />
      <Box mb={2} />
      <Typography variant="h6" gutterBottom>
        Password
      </Typography>
      <PasswordInput source="password" isRequired />

      <Typography variant="h6" gutterBottom>
        Permissions
      </Typography>
      <BooleanInput source="is_mfa_enabled" label="MFA Enabled" />
      <BooleanInput source="isEnabled" label="Enabled" />
    </SimpleForm>
  </Edit>
)
