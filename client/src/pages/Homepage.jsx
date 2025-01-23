import React, { useEffect, useState } from 'react';
import { getJob } from '../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mantine/core';
import Hero from './../components/HeroSection';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mantine/core';
function Homepage() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const { jobs, totalPages } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob(activePage));
  }, [activePage]);

  console.log(jobs);
  return (
    <div>
      <Hero />

      <div className="flex">
        <div className="w-1/4 "></div>
        <div className="w-3/4  p-4 ">
          <h1 className="font-bold text-xl">See Latest Job Posts</h1>
          <div className="flex flex-col gap-4 mt-4 p-6">
            {jobs.length > 0 &&
              jobs.slice(0, 6).map((job) => <JobCard job={job} />)}
          </div>
          <Link to='/all-jobs' className="font-semibold hover:underline-offset-2  hover:underline text-red text-sm">
            See more
          </Link>
        </div>
      </div>

      <Pagination
        color="red"
        total={totalPages}
        value={activePage}
        onChange={setPage}
      />
    </div>
  );
}

export default Homepage;
