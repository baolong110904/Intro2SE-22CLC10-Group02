import React from "react"
import {
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
  DeleteButton,
  EditButton,
  FunctionField,
  ArrayField,
} from "react-admin"
import { Typography, Paper, Grid, Avatar, Chip } from "@mui/material"
import {
  Person,
  Email,
  Cake,
  Transgender,
  Security,
  VerifiedUser,
  Home,
  Info,
  Phone,
  Work,
  LocationOn,
} from "@mui/icons-material"
import HowToRegIcon from "@mui/icons-material/HowToReg"

const UserAvatar = () => {
  const record = useRecordContext()
  return (
    <Avatar
      src={record?.avatar}
      alt={record?.username}
      sx={{
        width: 100,
        height: 100,
        bgcolor: "primary.main",
      }}
    >
      {!record?.avatar && <Person sx={{ fontSize: 60 }} />}
    </Avatar>
  )
}

const RolesField = () => {
  const record = useRecordContext()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {record?.role?.map((role) => (
            <Grid item key={role.name}>
              <Chip
                label={role.name}
                color="primary"
                variant="outlined"
                icon={<VerifiedUser />}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

const AddressIcon = ({ type }) => {
  switch (type) {
    case "Home":
      return <Home sx={{ mr: 1 }} />
    case "Work":
      return <Work sx={{ mr: 1 }} />
    default:
      return <LocationOn sx={{ mr: 1 }} />
  }
}

const AddressField = () => {
  const record = useRecordContext()
  return (
    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
      <AddressIcon type={record?.address?.address_type} />
      {record?.address?.address}, {record?.address?.ward},{" "}
      {record?.address?.district}, {record?.address?.city},{" "}
      {record?.address?.country}
    </Typography>
  )
}

const PhoneField = () => {
  const record = useRecordContext()
  return (
    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
      <Phone sx={{ mr: 1 }} />
      {record?.address?.phone_number}
    </Typography>
  )
}

const UserShow = () => {
  const record = useRecordContext()

  return (
    <Show>
      <SimpleShowLayout>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <UserAvatar />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                <TextField source="username" />
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                ID: <TextField source="id" />
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Email sx={{ mr: 1 }} /> <TextField source="email" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Person sx={{ mr: 1 }} />
                <TextField source="first_name" />
                <Typography component="span">&nbsp;</Typography>
                <TextField source="last_name" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Cake sx={{ mr: 1 }} /> <TextField source="date_of_birth" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Transgender sx={{ mr: 1 }} /> <TextField source="gender" />
              </Typography>
            </Grid>
            {/* Add phone number field */}
            <Grid item xs={12}>
              <PhoneField />
            </Grid>
            <Grid item xs={12}>
              <AddressField />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Info sx={{ mr: 1 }} /> <TextField source="description" />
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Permissions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Chip
                icon={<HowToRegIcon />}
                label={<TextField source="isEnabled" />}
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Chip
                icon={<Security />}
                label={<TextField source="is_mfa_enabled" />}
                color="primary"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Roles
          </Typography>
          <RolesField />
        </Paper>

        {/* Delete, Edit Button */}
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <DeleteButton />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EditButton />
            </Grid>
          </Grid>
        </Paper>
      </SimpleShowLayout>
    </Show>
  )
}

export default UserShow
