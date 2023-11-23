'use client';
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react';

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
  const [linesArr, setLinesArr] = useState([]);
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
  useEffect(() => {
    setLinesArr(handleLines(isClickedArr));
    /* for (let x = 0; x < coord[0].length; x++) {
      for (let y = 0; y < coord.length; y++) {
        if (coord[y][x] === true) {
          points.push([x, y]);
          nrPoints++;
        }
      }
    } */
  }, [isClickedArr]);
  const arr = Array.from(Array(15), () => Array(20).fill(null));
  
  return (
    <div className='relative w-fit h-fit grid grid-rows-{15} grid-cols-20 border border-gray-300 border-opacity-25'>
        {
          arr.map((row, y) => (
            row.map((col, x) => (
              <Coordinate 
                isHovering={isHoveringArr[y][x]}  
                isClicked={isClickedArr[y][x]}     
                handleHover={() => handleHover(x, y)}
                handleClick={() => handleClick(x, y)}
              />
            ))
          ))
          }
          {linesArr}
      </div>
  )
}

function divideConquer(points) { //if want recursive parameter has to be points arr not coord 
  //divide points by x until only 5 points left
  if (points.length > 5) { // bis > 5? aber wird immer halbiert also dann evt. am ende kleiner 5
    points = points[0];
    let upper = [];
    let lower = [];
    lower = points.filter((point, index) => index <= points.length / 2); //violate const?
    upper = points.filter((point, index) => index > points.length / 2);
    //merge und recursive call?
  }
  
  
  //merge convex hull
  
  //brute force convex hull with 5 points


}

function handleLines(isClickedArr) {
  //isClickedArr = isClickedArr[0];
  console.log('-> handel lines')
  let linesArr = [];
  let prevX = -1, prevY = -1;
  for (let x = 0; x < isClickedArr[0].length; x++) {
    for (let y = 0; y < isClickedArr.length; y++) {

      if (isClickedArr[y][x] === false) continue;
      if (prevX > 0 && prevY > 0) {
        linesArr.push(<Line x1={prevX} y1={prevY} x2={x} y2={y} />);
      }
      prevX = x;
      prevY = y;
    }
  }
  console.log('-> handle lines arrLength: '+linesArr.length);
  return linesArr;
}
 
function Line({x1, y1, x2, y2}) {
  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  const xMid = (x1 + x2) / 2;
  const yMid = (y1 + y2) / 2;
  const salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
  const salopeInDegrees = (salopeInRadian * 180) / Math.PI;
  const transformValue = `rotate(${salopeInDegrees}deg)`;
  //width equals distance time w-1 (.25rem)
  // .25 * 8 = eine einehit
  // + .25 * 4 um geraden start im mittelpunkt vom punkt zu haben
  return (
    <>
       
      <div style={{
        width: (distance * 0.25 * 8)  + 'rem',
        top: ((yMid * .25 * 8) + .25 * 3.5) + 'rem',
        left: (((xMid - (distance / 2)) * .25 * 8) + .25 * 3.5) + 'rem',
        transform: transformValue
      }} 
        className={
          `absolute 
          h-1
          bg-slate-300`}></div>
    </>
  )
}

function Coordinate({isHovering, isClicked, handleHover, handleClick}) {
  
  return (
    <>
    <div onMouseOver={handleHover} onMouseOut={handleHover} 
    onClick={handleClick} 
    className=' w-8 h-8 relative'>
      <div className='w-full h-full flex flex-col justify-center '>
        <div className='bg-gray-300 w-8 h-0.5 opacity-25'></div>
      </div>
      <div className='w-full h-full flex flex-row justify-center absolute inset-0'>
        <div className='bg-gray-300  w-0.5 h-8 opacity-25'></div>
      </div>
      {isHovering && <Circle isClicked={isClicked}/> || isClicked && <Circle isClicked={isClicked}/>}
    </div>
    </>
  )
}

function Circle({isClicked}) {
  let color = isClicked ? 'rgb(47	129	247)' : "rgb(209 213 219)";
  return (
    <div className=' w-4 h-4 absolute inset-2 rounded-full z-10'
    style={{backgroundColor: color}}></div>
  )
}
