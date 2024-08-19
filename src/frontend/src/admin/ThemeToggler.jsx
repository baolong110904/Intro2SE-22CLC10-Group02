import { useTheme } from "react-admin"
import { Button } from "@mui/material"

const ThemeToggler = () => {
  const [theme, setTheme] = useTheme()

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    </Button>
  )
}

export default ThemeToggler
