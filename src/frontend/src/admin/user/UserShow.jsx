import Button from "@mui/material/Button"
import {
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  NumberField,
  usePermissions,
  EditButton,
  DeleteButton,
} from "react-admin"

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
)
