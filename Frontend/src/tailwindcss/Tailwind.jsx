import React from 'react'
import { NavLink } from 'react-router-dom'
const Tailwind = () => {
  return (
    <>
      <div className='bg-red-100 text-amber-900 h-[700px] -mb-4 flex  text-justify gap-2'>
        <div className='bg-red-50 w-[300px]   items-start'>
          <div className=' bg-slate-400 text-2xl p-4 text-center'>Hello  </div>
          <p className='items-start'>
            <ul className='list-none text-4xl mx-5 my-4 justify-start flex flex-col gap-3' >
              <li className=''><NavLink>Home  </NavLink> </li>
              <li className=''><NavLink>Contact  </NavLink> </li>
              <li className=''><NavLink>product  </NavLink> </li>
              <li className=''><NavLink>users  </NavLink> </li>

            </ul>
          </p>
        </div>
        <div className='bg-white w-[1000px]'>
          <div className='bg-gray-400'>
            <h1 className='text-2xl p-4 text-start'>welcome , user</h1>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-orange-600 gap-2 p-8 transition delay-150 duration-1000 ease-in-out hover:translate-y-20 motion-reduce:hover:transform-none z-50'>
              <h1>block A</h1>
            </div>
            <div className='bg-[#5a5f89] text-teal-300'>
              <h2 className='animate-pulse'>block B</h2>
            </div>
            <div className='bg-[#8d7e8d] text-teal-300 '>
              <h2 className=' ml-16 size-14'>block C</h2>
            </div>
            <div className='bg-[#748962] text-teal-300 p-8 '>
              <h2 className='translate-z-12 rotate-x-0 bg-sky-300/75 backface-hidden'>block D</h2>
              <h2 className='translate-x-5'>block D</h2>
              <h2 className='translate-x-5'>block D</h2>
            </div>
            <div className='bg-[#a48ebb] text-teal-300 '>
              <h2 className='rotate-12 ml-44 mt-8 skew-x-2 text-3xl'>block E</h2>
            </div>
            <div className='bg-[#a34042] text-teal-300 '>
              <h2 className=''>block F</h2>
            </div>


          </div>

        </div>
        <div>
          <h1>here are your utils </h1>
        </div>


      </div>
    </>
  )
}

export default Tailwind