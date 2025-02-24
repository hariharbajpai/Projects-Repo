import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    // const [query, setQuery] = useState("");
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const searchJobHandler = () => {
    //     dispatch(setSearchedQuery(query));
    //     navigate("/browse");
    // }

    return (
        <div className='text-center py-12 bg-gradient-to-r from-gray-50 to-gray-100'>
            <div className='flex flex-col gap-6 my-10 max-w-4xl mx-auto px-4'>
                <span className='mx-auto px-6 py-2 rounded-full bg-white text-[#F83002] font-medium shadow-sm'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-bold text-gray-900'>
                    Search, Apply & <br /> Get Your{' '}
                    <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>
                <div className='flex w-full md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-6 pr-2 rounded-full items-center gap-4 mx-auto bg-white'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        // onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3 text-gray-700 placeholder-gray-400'
                    />
                    {/* <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5A2CAD] transition-colors duration-300"
                    >
                        <Search className='h-5 w-5 text-white' />
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;