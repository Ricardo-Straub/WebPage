import Image from 'next/image'

export default function Home() {
  return (
    <>
    <div className='w-fit bg-white grid grid-rows-{11} grid-cols-11'>
      {
        Array(121)
          .fill(true)
          .map(() => {
            return <Coordinate/>
          })
      }
    </div>
    </>
  )
}

function Coordinate() {
  return (
    <>
    <div className='bg-black w-8 h-8 relative'>
      <div className='w-full h-full flex flex-col justify-center '>
        <div className='bg-gray-300 w-8 h-px'></div>
      </div>
      <div className='w-full h-full flex flex-row justify-center absolute inset-0'>
        <div className='bg-gray-300  w-px h-8'></div>
      </div>
    </div>
    </>
  )
}