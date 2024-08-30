import {
  Admin,
  Datagrid,
  Resource,
  ListGuesser,
  ShowGuesser,
  EditGuesser,
  nanoLightTheme,
  nanoDarkTheme,
  radiantLightTheme,
  radiantDarkTheme,
  houseLightTheme,
  houseDarkTheme,
  Create,
} from "react-admin"
import dataProvider from "./dataProvider"
import authProvider from "./authProvider"
import Login from "../components/Login"
import { UserList } from "./user/UserList"
import jsonServerProvider from "ra-data-json-server"
import { Layout } from "./Layout"
import { UserEdit } from "./user/UserEdit"
import UserShow from "./user/UserShow"
import PeopleIcon from "@mui/icons-material/People"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import SecurityIcon from "@mui/icons-material/Security"

const API_BASE_URL = "http://20.243.0.237:8080/api/v1"
  // process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1"

export const AdminPage = () => (
  <Admin
    basename="/admin"
    // dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}
    layout={Layout}
    dataProvider={dataProvider(API_BASE_URL)}
    authProvider={authProvider}
    loginPage={Login}
    theme={radiantLightTheme}
    darkTheme={radiantDarkTheme}
    defaultTheme="light"
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      icon={PeopleIcon}
    />

    <Resource
      name="roles"
      list={ListGuesser}
      // show={ShowGuesser}
      // edit={EditGuesser}
      icon={VerifiedUserIcon}
    />

    <Resource
      name="permissions"
      list={ListGuesser}
      // edit={EditGuesser}
      // show={ShowGuesser}
      icon={SecurityIcon}
    />
  </Admin>
)
