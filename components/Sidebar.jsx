import Link from 'next/link'
import React from 'react'
import {BsRobot} from 'react-icons/bs'
import {AiOutlineLineChart} from 'react-icons/ai'

const Sidebar = ({children}) => {
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-orange-500 hover:bg-orange-100 p-3 rounded-lg inline-block'>
              <BsRobot size={35}/>
            </div>
          </Link>
          <span className='border-b-[2px] border-gray-500 w-full p-2'></span>
          <Link href='/linechart'>
            <div className='bg-gray-600 hover:bg-black text-white cursor-pointer my-5 p-3 rounded-lg inline-block'>
              <AiOutlineLineChart size={35}/>
            </div>
          </Link>
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  )
}

export default Sidebar