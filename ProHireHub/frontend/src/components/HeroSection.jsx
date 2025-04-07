import React from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className='text-center py-8 sm:py-12 md:py-16 bg-gradient-to-r from-gray-50 to-gray-100'>
            <div className='flex flex-col gap-4 sm:gap-6 my-6 sm:my-8 md:my-10 max-w-4xl mx-auto px-4 sm:px-6'>
                {/* Badge */}
                <span className='mx-auto px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-white text-[#F83002] font-medium text-sm sm:text-base shadow-sm'>
                    No. 1 Job Hunt Website
                </span>
                
                {/* Main Heading */}
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900'>
                    Search, Apply & <br className='hidden sm:block' /> Get Your{' '}
                    <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                
                {/* Description */}
                <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
                    Find your perfect job opportunity from thousands of listings across top companies worldwide.
                </p>
                
                {/* Search Bar */}
                <div className='flex w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] shadow-sm sm:shadow-md border border-gray-200 pl-4 sm:pl-6 pr-2 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full py-2 sm:py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400'
                    />
                    <Button 
                        className='rounded-r-full p-2 sm:p-3'
                        aria-label="Search jobs"
                    >
                        <Search className='w-4 h-4 sm:w-5 sm:h-5' />
                    </Button>
                </div>
                
                {/* Popular Searches (Optional) */}
                <div className='flex flex-wrap justify-center gap-2 mt-2 sm:mt-4'>
                    {['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UX Designer'].map((tag, index) => (
                        <span 
                            key={index}
                            className='text-xs sm:text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition'
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;