'use client';
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  return (
    <>
    <div className='w-screen h-screen flex justify-center place-items-center'>
      <Board/>
    </div>
      
      
    </>
  )
}

function Board() {
  return (
    <div className='w-fit h-fit grid grid-rows-{15} grid-cols-20 border border-gray-300 border-opacity-25'>
        {
          Array(300)
            .fill(true)
            .map(() => {
              return <Coordinate/>
            })
        }
      </div>
  )
}

function Coordinate() {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
    <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} 
    className=' w-8 h-8 relative opacity-25'>
      <div className='w-full h-full flex flex-col justify-center '>
        <div className='bg-gray-300 w-8 h-0.5'></div>
      </div>
      <div className='w-full h-full flex flex-row justify-center absolute inset-0'>
        <div className='bg-gray-300  w-0.5 h-8 '></div>
      </div>
      {isHovering && <div className='bg-gray-300 w-4 h-4 absolute inset-2 rounded-full'></div>}
    </div>
    </>
  )
}
