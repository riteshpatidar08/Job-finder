import React, { useEffect, useState } from 'react';
import { Card, Group, Divider, Skeleton } from '@mantine/core';
import { Briefcase, IndianRupee, MapPin } from 'lucide-react';
import { getToken } from '../utils/getToken';
import { useDispatch, useSelector } from 'react-redux';
import { applyJob } from '../redux/Slices/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";

function JobCard({ job, width = 'w-2/4' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('id');
  const { loading } = useSelector((state) => state.job);

  const handleApplyNow = (jobId) => {
    const data = { userId, jobId };
    if (token) {
      dispatch(applyJob(data));
    } else {
      navigate('/login');
    }
  };

  function getTimeDifference(postedDate) {
    const currentDate = new Date();
    const postedDates = new Date(postedDate);
    const difference = currentDate - postedDates;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days === 0) {
      return `Posted today`;
    } else if (days === 1) {
      return `Posted Yesterday`;
    } else {
      return `Posted ${days} ago`;
    }
  }

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (loading || isLoading) {
    return (
      <Card className={`${width} bg-gray-alpha-2 p-4 rounded-lg relative`}>
        <Skeleton height={12} width={200} mt={6} />
        <Skeleton height={12} width={150} mt={6} />
        <Skeleton height={12} width={300} mt={6} />
        <Skeleton height={40} mt={10} />
      </Card>
    );
  }

  console.log(job)

  return (
    <motion.div className={`${width} bg-gray-alpha-2 drop-shadow-lg p-4 rounded-lg relative`}>
      <div className="flex flex-col gap-2">
        <h1 className="text-red font-semibold text-md">{job.title}</h1>
        <h3 className="text-sm">{job.companyName}</h3>
        <Group>
          <h3 className="text-xs">
            <MapPin className="inline-block mr-2" size={16} />
            {job.location}
          </h3>
          <Divider orientation="vertical" />
          <h3 className="text-xs">
            <Briefcase className="inline-block mr-2" size={16} />
            {job.experience}
          </h3>
          <Divider orientation="vertical" />
          <h3 className="text-xs">
            <IndianRupee className="inline-block mr-2" size={14} />
            {job.salaryRange.min} - {job.salaryRange.max}
          </h3>
        </Group>
        <span className="text-sm absolute top-2 right-3 font-bold">
          {getTimeDifference(job.postedDate)}
        </span>
          <div className="mt-4  flex gap-1 text-xs">
          {job.requirement?.map((requirement, index) => (
            <p key={index} className="flex items-start">
              <span className="mr-[2px] text-red-500">•</span>
              {requirement}
            </p>
          ))}
        </div>
        <button
          onClick={() => handleApplyNow(job._id)}
          className="text-center rounded-md mt-4 px-10 py-2 bg-red text-white transition-transform transform hover:border hover:border-red-600 duration-200 ease-out hover:bg-opacity-0"
        >
          {token ? 'Apply Now' : 'Login to Apply'}
        </button>
        
      
      </div>
    </motion.div>
  );
}

export default JobCard;
