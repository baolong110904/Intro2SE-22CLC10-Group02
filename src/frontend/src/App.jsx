import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from './pages/About';
import Pricing from './pages/Pricing';
import Recruitment from './components/Recruitment';
import Footer from './components/Footer';
import Login from './pages/Login';
function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <Services/>
      <About/>
      <Pricing/>
      <Recruitment/>
      <Footer/>
    </>
  )
}

export default App
