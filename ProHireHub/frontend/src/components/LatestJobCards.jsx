import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-4 sm:p-5 rounded-md shadow-sm sm:shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow duration-200'
        >
            {/* Company Info */}
            <div className='mb-2 sm:mb-3'>
                <h1 className='font-medium text-base sm:text-lg'>{job?.company?.name}</h1>
                <p className='text-xs sm:text-sm text-gray-500'>India</p>
            </div>
            
            {/* Job Title & Description */}
            <div className='mb-3 sm:mb-4'>
                <h1 className='font-bold text-base sm:text-lg my-1 sm:my-2 line-clamp-1'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3'>
                    {job?.description}
                </p>
            </div>
            
            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-3 sm:mt-4'>
                <Badge className='text-blue-700 font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-medium text-xs sm:text-sm' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards