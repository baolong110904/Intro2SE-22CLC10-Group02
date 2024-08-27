import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import ThemeProvider from "./utils/ThemeContext.jsx"
import { registerLicense } from "@syncfusion/ej2-base"
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cWWJCdkx+WmFZfVpgcV9FaFZVQ2YuP1ZhSXxXdkJjUH5fcXxUQWBUWEM=",
)

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
  {
    /* </React.StrictMode>, */
  },
)
