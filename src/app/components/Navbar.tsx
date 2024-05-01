import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './Modetoggle'

function Navbar() {
  return (
   <nav className='flex items-center justify-between max-w-2xl mx-auto px-5 py-6'>
    <Link  href={'/'} className='text-3xl'>
    Chohan <span className='font-bold text-blue-500 '>Blog</span>
    </Link>
    <ModeToggle/>
   </nav>
  )
}

export default Navbar
