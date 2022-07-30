import React from 'react'

const Footer = () => {
  return (
    <footer id='footer' className='py-2 text-center'>
      <p className='mb-0 fs-5'>©{new Date().getFullYear()} taskmanagement.com, All rights reserved.</p>
    </footer>
  )
}

export default Footer