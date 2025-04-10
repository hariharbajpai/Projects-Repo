import React from 'react';
import Navbar from './shared/navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobsArray = [1, 2, 3]; // Sample data - replace with actual jobs data

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter sidebar - hidden on small screens if needed */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>
          
          {/* Jobs list */}
          <div className="flex-1">
            {jobsArray.length <= 0 ? (
              <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">No jobs found</span>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                {jobsArray.map((item, index) => (
                  <Job key={index} job={item} /> // Make sure to pass the job prop
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;