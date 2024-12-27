import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='bg-black/60 p-5 rounded-sm'>
      <h1 className='text-center mb-4 text-2xl text-white'>Induwara Vishwakantha</h1>
      <div className="flex gap-10 items-center justify-center">
        <BsGithub className='text-3xl cursor-pointer text-gray-300  hover:text-blue-600' />
        <BsLinkedin className='text-3xl cursor-pointer text-gray-300  hover:text-blue-600' />
        <FaFacebook className='text-3xl cursor-pointer text-gray-300 hover:text-blue-400' />
      </div>
      <div className="flex gap-6 items-center justify-center mt-5">
        <a href="#home"><p className='text-white     hover:text-blue-600 '>Home</p></a>
        <a href="#tech"><p className='text-white     hover:text-blue-600 '>Tech</p></a>
        <a href="#project"><p className='text-white  hover:text-blue-600 '>Project</p></a>
        <a href="#contact"><p className='text-white  hover:text-blue-600 '>Contact</p></a>

      </div>

    </footer>
  )
}

export default Footer