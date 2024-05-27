import React from 'react'
import logo from '/G2Learning.svg';
import fbImg from "../assets/facebook.svg"
import ghImg from "../assets/github.svg"
import emImg from "../assets/email.svg"

const Footer = () => {
  return (
    <div className="bg-[#010851] md:px-18 p-4 max-w-screen-2xl mx-auto text-white">
        <div className="my-12 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2 space-y-8">
                <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-blue-950">
                    <img src={logo} alt="" className="w-10 inline-block  items-center"/> <span className="text-white">G2 Learning Language
                    </span>
                </a>
                <p className="md:w-1/2">A simple paragraph is comprised of three major components. The first sentence, which is often a declarative sentence.</p>
                <div>
                    <input type="email" name="email" id="email" placeholder='Your email'
                    className='bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none'/>
                    <input type="submit" value="Subscribe" className='px-4 py-2 bg-purple-500 rounded-md -ml-2 cursor-pointer hover:bg-white hover:text-blue-950 duration-300 transition-all' />
                </div>
            </div>

            <div className='md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start'>
                <div className='space-y-4 mt-5'>
                    <h4 className='text-xl'>Platform</h4>
                    <ul className="space-y-3">
                        <a href="/" className='block hover:text-gray-300'>Overview</a>
                        <a href="/" className='block hover:text-gray-300'>Features</a>
                        <a href="/" className='block hover:text-gray-300'>About</a>
                        <a href="/" className='block hover:text-gray-300'>Pricing</a>
                    </ul>
                </div>
                <div className='space-y-4 mt-5'>
                    <h4 className='text-xl'>Help</h4>
                    <ul className="space-y-3">
                        <a href="/" className='block hover:text-gray-300'>How does it works?</a>
                        <a href="/" className='block hover:text-gray-300'>Where to ask questions?</a>
                        <a href="/" className='block hover:text-gray-300'>How to to join in G2 Learning Meeting</a>
                        <a href="/" className='block hover:text-gray-300'>How can I join in the course?</a>
                    </ul>
                </div>
                <div className='space-y-4 mt-5'>
                    <h4 className='text-xl'>Contacts</h4>
                    <ul className="space-y-3">
                        <a href="/" className='block hover:text-gray-300'>(+84) 703454711</a>
                        <a href="/" className='block hover:text-gray-300'>123 xyz xyz </a>
                        <a href="/" className='block hover:text-gray-300'>uty ewrwe</a>
                        <a href="/" className='block hover:text-gray-300'>g2learninglanguage@gmail.com</a>
                    </ul>
                </div>   
                 
            </div>
        </div>
        
        <hr />
        <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8">
            <p>Copyright © 2024 G2 Learning Language Ltd. All rights reserved</p>
            <div className='flex items-center space-x-5'>
                <img src={fbImg} alt="" className='w-8 cursor-pointer hover:-translate-x-4 transition-all duration-300 filter invert' />
                <img src={ghImg} alt="" className='w-8 cursor-pointer hover:-translate-x-4 transition-all duration-300 filter invert' />
                <img src={emImg} alt="" className='w-8 cursor-pointer hover:-translate-x-4 transition-all duration-300 filter invert' />
            </div>
        </div>
    </div>
  )
}

export default Footer