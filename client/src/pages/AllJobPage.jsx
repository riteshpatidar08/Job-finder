import React, { useEffect, useState, useCallback } from 'react';
import { getJob } from '../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import { Pagination } from '@mantine/core';
import { debounce } from 'lodash';
function AllJobPage() {
  const dispatch = useDispatch();
  const { jobs, totalPages } = useSelector((state) => state.job);
  const [activePage, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const fetchData = useCallback(
    debounce((activePage , query) => {
      dispatch(getJob({ activePage, query }));
    }, 1000),
    []
  );

  useEffect(() => {
    fetchData(activePage,query);
  }, [activePage, query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  console.log(query);

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-white font-bold">Job Listings</h1>
        <p className="text-sm font-medium text-white">See All Jobs Available</p>
      </div>
      <div className="mb-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search jobs, companies..."
          value={query}
          onChange={handleSearch}
          className="w-full h-16 mb-5  px-4 py-2 border-2 border-gray-300 rounded-full text-gray-700 focus:outline-none focus:border-red-500"
        />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} width="w-full" />)
        ) : (
          <p className="text-white col-span-full text-center">No jobs found</p>
        )}
      </div>

      {/* Pagination */}
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
