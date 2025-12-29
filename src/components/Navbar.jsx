import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between  bg-purple-400 text-white py-2">
        <div className="logo">
            <span className="font-bold text-5xl mx-8 ">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9" >
            <li  className='cursor-pointer hover:font-bold transition-all text-xl'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all text-xl'>Your Tasks</li>
            
        </ul>
    </nav>
  )
}

export default Navbar
