import React, { useEffect, useState } from 'react';
import { getJob } from '../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mantine/core';
function Homepage() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const { jobs, totalPages } = useSelector((state) => state.job);
  console.log(jobs);

  useEffect(() => {
    dispatch(getJob(activePage));
  }, [activePage]);

  return (
    <div>
      homepage
      <Pagination color="red" total={totalPages} value={activePage} onChange={setPage} />
    </div>
  );
}

export default Homepage;
