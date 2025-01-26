import React, { useEffect, useState } from 'react';
import { getJob } from '../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mantine/core';
import Hero from './../components/HeroSection';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

function Homepage() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const { jobs, totalPages } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob(activePage));
  }, [activePage]);

  return (
    <div>
      <Hero />
      <div className="flex gap-4 p-4">
     
        <div className="w-1/4"></div>

      
        <div className="w-2/4 p-4">
          <h1 className="font-bold text-xl mb-4">See Latest Job Posts</h1>
          <div className="flex flex-col gap-4">
            {jobs.length > 0 &&
              jobs.map((job) => <JobCard width= 'w-full' key={job.id} job={job} />)}
          </div>
          <Link
            to="/all-jobs"
            className="font-semibold hover:underline-offset-2 hover:underline text-red-500 text-sm mt-4 block"
          >
            See more
          </Link>
        </div>

        
        <div className="w-1/4 p-4">
          <div className="sticky top-10 bg-gray-100 p-4 shadow-md rounded-md">
            <h2 className="font-bold text-lg mb-2">Sponsored</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-alpha-2 p-3 shadow rounded-md">
                <h3 className="font-semibold">Ad Title 1</h3>
                <p className="text-sm text-gray-600">
                  Discover amazing career opportunities with us!
                </p>
              </div>
              <div className="bg-gray-alpha-2 p-3 shadow rounded-md">
                <h3 className="font-semibold">Ad Title 2</h3>
                <p className="text-sm text-gray-600">
                  Join our job finder community today!
                </p>
              </div>
              <div className="bg-gray-alpha-2 p-3 shadow rounded-md">
                <h3 className="font-semibold">Ad Title 3</h3>
                <p className="text-sm text-gray-600">
                  Explore new horizons with our latest job updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
