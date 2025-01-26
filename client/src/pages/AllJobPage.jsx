import React, { useEffect, useState } from 'react';
import { getJob } from '../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import { Pagination } from '@mantine/core';

function AllJobPage() {
  const dispatch = useDispatch();
  const { jobs, totalPages } = useSelector((state) => state.job);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    dispatch(getJob(activePage));
  }, [activePage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl text-white font-bold">Job Listings</h1>
        <p className="text-sm font-medium text-white">See All Jobs Available</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} width="w-full" />)
        ) : (
          <p className="text-white col-span-full text-center">No jobs found</p>
        )}
      </div>

      <div className="mt-8">
        <Pagination
          color="red"
          total={totalPages}
          value={activePage}
          onChange={setPage}
        />
      </div>
    </div>
  );
}

export default AllJobPage;
