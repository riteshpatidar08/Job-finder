import React, { useEffect } from 'react';
import { Button, Box } from '@mantine/core';
import { CirclePlus } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import JobDrawerForm from '../../components/JobDrawerForm';
import { DataTable } from 'mantine-datatable';
import { getJobsByCreator } from '../../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
function PostJobPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { jobsCreator } = useSelector((state) => state.job);
  console.log(jobsCreator);
  const id = localStorage.getItem('id');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobsByCreator(id));
  }, []);
  return (
    <div className="mr-5">
      <div className="flex justify-end mr-5">
        <Button
          leftSection={<CirclePlus size={16} />}
          onClick={open}
          variant="light"
        >
          Create Job
        </Button>

        <JobDrawerForm opened={opened} close={close} />
      </div>
      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={jobsCreator}
        // define columns
        columns={[
          { accessor: 'title' },

          { accessor: 'companyName' },
          {
            accessor: 'Applicants',
            render: (data) => (<span>{data.applicants.length}</span>),
          }
        ]}
        // execute this callback when a row is clicked
      />
    </div>
  );
}

export default PostJobPage;
