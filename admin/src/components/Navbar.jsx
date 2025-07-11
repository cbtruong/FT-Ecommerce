import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 justify-between px-[4%]'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
