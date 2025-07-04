import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
const JobDescription = () => {
  const isApplied = false;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div >
          <h1 className='font-bold text-xl'>Frontend Developer</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">12  Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">part time </Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> LPA</Badge>
          </div>
        </div>
        <Button disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Discription</h1>
      <div className='m-4'>
        <h1 className='font-bold m-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
        <h1 className='font-bold m-1'>Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
        <h1 className='font-bold m-1'>Discription: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
        <h1 className='font-bold m-1'>Expreience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
        <h1 className='font-bold m-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12Lpa</span></h1>
        <h1 className='font-bold m-1'>Total Applicaton: <span className='pl-4 font-normal text-gray-800'>5</span></h1>
        <h1 className='font-bold m-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>17-06-25</span></h1>
      </div>
    </div>
  )
}

export default JobDescription
