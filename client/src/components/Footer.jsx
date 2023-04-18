import { Box } from '@mui/material'
import React from 'react'
import logo from '../assets/zaperon_logo.png'

const Footer = () => {
  return (
    <Box className='w-full mt-48 lg:mt-7 pb-10'>
      <div className='w-[100%] md:w-[85%] mx-auto flex justify-between items-center px-4 text-[#728391] text-xs md:text-base'>
        <div className='flex items-center gap-1 md:gap-3'>
            <a href='https://www.zaperon.com/' className=''>Powered By</a>
            <img className='w-[40px] h-[13px] md:w-[100px] md:h-[23px]' src={logo} alt="company logo" />
        </div>
        <div className='flex items-center gap-1 md:gap-4 text-[#003FB9]'>
            <a href='#'>Need Help?</a>
            <a href='#'>Privacy Policy <span className='text-[#A2A2A2]'>&</span> Terms</a>
        </div>
      </div>
    </Box>
  )
}

export default Footer
