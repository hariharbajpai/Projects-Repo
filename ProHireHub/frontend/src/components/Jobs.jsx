import React from 'react';
import Navbar from './shared/navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobsArray = [1, 2, 3]; // Sample data - replace with actual jobs data

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter sidebar - hidden on mobile when horizontal scrolling */}
          <div className="w-full lg:w-1/4 sticky top-4 self-start">
            <FilterCard />
          </div>
          
          {/* Jobs list */}
          <div className="flex-1 w-full">
            {jobsArray.length <= 0 ? (
              <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">No jobs found</span>
              </div>
            ) : (
              <div className="relative w-full">
                {/* Responsive layout - vertical on mobile, horizontal on larger screens */}
                <div className="block md:hidden space-y-4">
                  {jobsArray.map((item, index) => (
                    <div key={index}>
                      <Job job={item} />
                    </div>
                  ))}
                </div>

                {/* Horizontal scroll container for medium+ screens */}
                <div className="hidden md:block overflow-x-auto pb-4 hide-scrollbar">
                  <div className="flex gap-4" style={{ minWidth: `${jobsArray.length * 300}px` }}>
                    {jobsArray.map((item, index) => (
                      <div key={index} className="flex-shrink-0 w-72 md:w-80">
                        <Job job={item} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom scrollbar styling */}
                <style jsx>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    height: 8px;
                  }
                  .hide-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                  }
                  .hide-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                  }
                  .hide-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;