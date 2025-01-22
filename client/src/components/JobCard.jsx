import React from 'react';
import {  Group, Divider } from '@mantine/core';
import { Briefcase, IndianRupee, MapPin } from 'lucide-react';
import { getToken } from '../utils/getToken';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applyJob } from '../redux/Slices/jobSlice';
import { useNavigate } from 'react-router-dom';
function JobCard({ job }) {
  const navigate = useNavigate() 
  const dispatch = useDispatch()
  const token = getToken();
  const userId = localStorage.getItem('id')
const handleApplyNow = (jobId) => {
  const data = {userId, jobId}
  if(token){
   dispatch(applyJob(data))
  }else {
    navigate('/login')
  }
}
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

  return (
    <div className="w-2/4 relative  bg-gray-alpha-2 p-4 rounded-lg ">
      <div className="flex flex-col gap-2">
        <h1 className="text-red font-semibold text-md">{job.title}</h1>
        <h3 className="text-sm">{job.companyName}</h3>
        <Group>
          <h3 className="text-xs">
            <MapPin className="inline-block mr-2" size={16} />
            {job.location}
          </h3>{' '}
          <Divider orientation="vertical" />
          <h3 className="text-xs">
            <Briefcase className="inline-block mr-2" size={16} />
            {job.experience}
          </h3>
        </Group>
        <span className="text-sm absolute top-2 right-3 font-bold">
          {getTimeDifference(job.postedDate)}
        </span>
        <button
        
          onClick= {()=>handleApplyNow(job._id)}
          className=" text-center rounded-md px-10 py-2 bg-red text-white"
        >
          {token ? 'Apply Now' : 'Login to Apply'}
        </button>{' '}
      </div>
    </div>
  );
}

export default JobCard;
