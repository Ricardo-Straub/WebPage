import Image from 'next/image'

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
    <div className='w-fit h-fit grid grid-rows-{10} grid-cols-12 border border-gray-300 border-opacity-25'>
        {
          Array(120)
            .fill(true)
            .map(() => {
              return <Coordinate/>
            })
        }
      </div>
  )
}

function Coordinate() {
  return (
    <>
    <div className=' w-8 h-8 relative opacity-25'>
      <div className='w-full h-full flex flex-col justify-center '>
        <div className='bg-gray-300 w-8 h-0.5'></div>
      </div>
      <div className='w-full h-full flex flex-row justify-center absolute inset-0'>
        <div className='bg-gray-300  w-0.5 h-8 '></div>
      </div>
    </div>
    </>
  )
}