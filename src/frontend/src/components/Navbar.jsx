import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoMdSearch } from 'react-icons/io';
import logo from './/G2Learning.svg'; // Adjust path if necessary
import { Link as ScrollLink } from 'react-scroll';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ThemeToggle from '../components/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSignupOpen, setIsModalSignupOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/home', link: 'Home' },
    { path: '/services', link: 'Services' },
    { path: '/about', link: 'About' },
    { path: '/recruitment', link: 'Blogs' },
    { path: '/pricing', link: 'Pricing' },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const openSignupModal = () => {
    setIsModalSignupOpen(true);
  }

  const closeSignupModal = () => {
    setIsModalSignupOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <nav className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <NavLink to="/" className="text-xl font-bold text-blue-950 logo-text">
            G2 <span className={`${isScrolled ? 'text-black' : 'text-white'}`}>Language Learning</span>
          </NavLink>
        </div>
        <ul className="md:flex gap-12 text-lg hidden">
          {navItems.map(({ link, path }) => (
            <li key={link}>
              <ScrollLink
                to={link.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-100}
                className={`nav-link cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}
                activeClass="active"
              >
                {link}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className={`lg:flex gap-4 items-center hidden ${isScrolled ? 'text-black' : 'text-white'}`}>
          <a href="/" className={`hover:text-blue-950 ${isScrolled ? 'text-blue-950' : 'text-white'}`}><IoMdSearch /></a>
          <a href="/" className={`hover:text-blue-950 ${isScrolled ? 'text-blue-950' : 'text-white'}`}><CgProfile /></a>
          <a href="/" className={`hover:text-blue-950 ${isScrolled ? 'text-blue-950' : 'text-white'}`}><FaShoppingCart /></a>
          <button onClick={openModal} className={`bg-transparent text-blue-600 px-6 py-2 font-medium rounded hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in ${isScrolled ? 'text-black bg-blue-600 border border-blue-600 transition-all duration-200 ease-in' : 'text-white'}`}>Log in</button>
          <button onClick={openSignupModal} className={`bg-transparent text-blue-600 px-6 py-2 font-medium rounded hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in ${isScrolled ? 'text-black bg-blue-600 border border-blue-600 transition-all duration-200 ease-in' : 'text-white'}`}>Sign up</button>
          <ThemeToggle />
        </div>
        {/* Model component */}
        <Login isOpen={isModalOpen} onClose={closeModal}/>
        <Signup isOpen={isModalSignupOpen} onClose={closeSignupModal}/>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div>
        <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? 'fixed top-0 left-0 w-full transition-all ease-out duration-150' : 'hidden'}`}>
          {navItems.map(({ path, link }) => (
            <li className="text-black" key={path}>
              <NavLink onClick={toggleMenu} to={path} activeClassName="underline">{link}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
