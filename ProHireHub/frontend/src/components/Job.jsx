import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysAgo === 0) return "Today";
        if (daysAgo === 1) return "Yesterday";
        return `${daysAgo} days ago`;
    };

    return (
        <div className='p-4 md:p-5 rounded-md shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200 w-full max-w-2xl mx-auto'>
            {/* Header with date and bookmark */}
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt)}
                </p>
                <Button
                    variant="outline"
                    className="rounded-full hover:bg-gray-100"
                    size="icon"
                    aria-label="Save job"
                >
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>

            {/* Company info */}
            <div className='flex items-center gap-3 my-3'>
                <div className="p-1 sm:p-2 rounded-full border border-gray-200">
                    <Avatar className="w-10 h-10 sm:w-14 sm:h-14">
                        <AvatarImage
                            src={job?.company?.logo || '/default-logo.png'}
                            alt={job?.company?.name || 'Company'}
                            className="object-contain"
                        />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-medium text-base sm:text-lg'>
                        {job?.company?.name || "Company Name"}
                    </h1>
                    <p className='text-xs sm:text-sm text-gray-500'>
                        {job?.location || "Location"}
                    </p>
                </div>
            </div>

            {/* Job details */}
            <div className='mt-3'>
                <h1 className='font-bold text-lg sm:text-xl my-1 line-clamp-1'>
                    {job?.title || "Job Title"}
                </h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2'>
                    {job?.description || "Job description"}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-3'>
                {job?.openings && (
                    <Badge className='text-blue-700 font-medium text-xs sm:text-sm' variant="ghost">
                        {job.openings} Position{job.openings > 1 ? 's' : ''}
                    </Badge>
                )}
                {job?.jobType && job.jobType !== '' && (
                    <Badge className='text-[#F83002] font-medium text-xs sm:text-sm' variant="ghost">
                        {job.jobType}
                    </Badge>
                )}
                {job?.salary && job.salary !== '' && (
                    <Badge className='text-[#7209b7] font-medium text-xs sm:text-sm' variant="ghost">
                        {job.salary} LPA
                    </Badge>
                )}
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-2 mt-4'>
                <Button
                    onClick={() => job?._id && navigate(`/description/${job._id}`)}
                    disabled={!job?._id}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    View Details
                </Button>
                <Button
                    className="bg-[#7209b7] hover:bg-[#5e0a9a] w-full sm:w-auto"
                    aria-label="Save for later"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
