import React, { useEffect } from 'react';
import './App.css';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import Blogs from './pages/Blogs.jsx';

function App() {
  // State to manage whether to show Login or Signup page
 
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Routes>
      <Route exact path="/" element={<HomePage />}/>
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
      
    </>
  );
}

export default App;
