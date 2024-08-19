import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin"

export const Layout = ({ children }) => (
  <RALayout>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
)
