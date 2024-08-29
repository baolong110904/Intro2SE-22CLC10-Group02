import * as React from "react"
import {
  Datagrid,
  DateField,
  List,
  SearchInput,
  TextField,
  EmailField,
  SimpleList,
  BooleanField,
  TopToolbar,
  SelectColumnsButton,
  ExportButton,
  FilterButton,
  DatagridConfigurable,
  CreateButton,
  WrapperField,
  EditButton,
  FunctionField,
  BooleanInput,
} from "react-admin"
import { useMediaQuery, Theme } from "@mui/material"
import { Typography, Box, Button } from "@mui/material"
import UserLinkField from "./UserLinkField"
import { UserFilterSidebar } from "./UserFilterSidebar"
import HowToRegIcon from "@mui/icons-material/HowToReg"

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    {/* <CreateButton /> */}
    <ExportButton />
  </TopToolbar>
)

const userFilters = [
  <SearchInput source="q" alwaysOn />,
  <BooleanInput source="isEnabled" label="Enabled" />,
]

const Empty = () => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No users found
    </Typography>
    <Typography variant="body1">
      You can create a new user by clicking the "Create" button
    </Typography>
    <CreateButton />
  </Box>
)

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <List
      aside={<UserFilterSidebar />}
      // filters={userFilters}
      sort={{ field: "createdAt", order: "DESC" }}
      actions={<ListActions />}
      perPage={25}
      empty={<Empty />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.email}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => new Date(record.createdAt).toLocaleDateString()}
        />
      ) : (
        <DatagridConfigurable>
          <TextField source="id" />
          <UserLinkField label="Name" />
          <EmailField source="email" />
          <TextField source="username" />
          <DateField source="date_of_birth" />
          <TextField source="gender" />
          <BooleanField source="isEnabled" label="Enabled" />
          <DateField source="createdAt" />
          <FunctionField
            label="Roles"
            render={(record) => record.roles.map((role) => role.name).join(", ")}
          />
          <WrapperField label="Actions">
            <EditButton />
          </WrapperField>
        </DatagridConfigurable>
      )}
    </List>
  )
}
