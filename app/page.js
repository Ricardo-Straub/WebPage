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

//use state in parent Board instead of Coordinate in order to calculate Convex hull
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
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
    <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} 
    onClick={() => setIsClicked(prev => !prev)} 
    className=' w-8 h-8 relative opacity-25'>
      <div className='w-full h-full flex flex-col justify-center '>
        <div className='bg-gray-300 w-8 h-0.5'></div>
      </div>
      <div className='w-full h-full flex flex-row justify-center absolute inset-0'>
        <div className='bg-gray-300  w-0.5 h-8 '></div>
      </div>
      {isHovering && <Circle isClicked={isClicked}/> || isClicked && <Circle isClicked={isClicked}/>}
    </div>
    </>
  )
}

function Circle({isClicked}) {
  let color = isClicked ? 'rgb(21 111 235)' : "rgb(209 213 219)";
  return (
    <div className=' w-4 h-4 absolute inset-2 rounded-full'
    style={{backgroundColor: color}}></div>
  )
}
