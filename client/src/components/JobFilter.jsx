import React from 'react';

const JobFilter = () => {
  return (
    <div className="bg-gray-alpha-2 shadow-lg rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

    
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Location</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => console.log('Location: New York', e.target.checked)}
            />
        Jaipur
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => console.log('Location: San Francisco', e.target.checked)}
            />
        Pune
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => console.log('Location: Chicago', e.target.checked)}
            />
         Bangalore
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => console.log('Location: Seattle', e.target.checked)}
            />
            Seattle
          </label>
        </div>
      </div>

    
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Experience</h3>
        <div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            className="w-full"
            onChange={(e) => console.log('Experience:', e.target.value)}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>0 years</span>
            <span>20+ years</span>
          </div>
        </div>
      </div>

    
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Salary Range</h3>
        <div>
          <input
            type="range"
            min="30000"
            max="200000"
            step="5000"
            className="w-full"
            onChange={(e) => console.log('Salary Range:', e.target.value)}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>$30,000</span>
            <span>$200,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
