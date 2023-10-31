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
  const [isHoveringArr, setIsHoveringArr] = useState(Array(15).fill().map(() => Array(20).fill(false)));
  const [isClickedArr, setIsClickedArr] = useState(Array(15).fill().map(() => Array(20).fill(false)));
  const handleHover = (x, y) => {
    const temp = isHoveringArr.slice();
    temp[y][x] = !temp[y][x];
    setIsHoveringArr(temp);
  };
  const handleClick = (x, y) => {
    const temp = isClickedArr.slice();
    temp[y][x] = !temp[y][x];
    setIsClickedArr(temp);
  };
  const arr = Array.from(Array(15), () => Array(20).fill(null));
  
  return (
    <div className='w-fit h-fit grid grid-rows-{15} grid-cols-20 border border-gray-300 border-opacity-25'>
        {
          arr.map((row, y) => (
            row.map((col, x) => (
              <Coordinate 
                x={x}
                y={y} 
                isHovering={isHoveringArr[y][x]}  
                isClicked={isClickedArr[y][x]}     
                handleHover={() => handleHover(x, y)}
                handleClick={() => handleClick(x, y)}
              />
            ))
          ))
            }
      </div>
  )
}

function Coordinate({x, y, isHovering, isClicked, handleHover, handleClick}) {
  
  return (
    <>
    <div onMouseOver={handleHover} onMouseOut={handleHover} 
    onClick={handleClick} 
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
