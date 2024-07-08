import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);