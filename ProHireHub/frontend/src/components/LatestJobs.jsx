import React from 'react'
import LatestJobCards from './LatestJobCards';

const randomJobs = [1,2,3,4];
const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {randomJobs.map((item, index) => (
          <LatestJobCards key={index} />  // Added key prop here
        ))}
      </div>
    </div>
  )
}

export default LatestJobs