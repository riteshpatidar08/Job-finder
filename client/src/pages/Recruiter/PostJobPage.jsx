import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { CirclePlus } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import JobDrawerForm from '../../components/JobDrawerForm';
import { DataTable } from 'mantine-datatable';
import { getJobsByCreator } from '../../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Ellipsis } from 'lucide-react';
import { Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function PostJobPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { jobsCreator } = useSelector((state) => state.job);
  const id = localStorage.getItem('id');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleViewApplicants = (job) => {
    const { _id: id } = job;
    navigate(`/recruiter/post-job/${id}`);
  };

  useEffect(() => {
    dispatch(getJobsByCreator(id));
  }, [dispatch, id]);

  // Calculate data for current page
  const paginatedData = jobsCreator.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="mr-5">
      <div className="flex justify-between items-center px-5">
  
        <h1 className="text-2xl font-semibold">Post Jobs</h1>

      
        <Button
          leftSection={<CirclePlus size={16} />}
          onClick={open}
          variant="light"
        >
          Create Job
        </Button>
      </div>

    
      <JobDrawerForm opened={opened} close={close} />

      {/* Data Table */}
      <div className="m-10">
        <DataTable
          withTableBorder
          borderRadius="sm"
          striped
          highlightOnHover
          records={paginatedData}
          columns={[
            { accessor: 'title' },
            { accessor: 'companyName' },
            {
              accessor: 'isActive',
              title: 'Status',
              render: (data) => (
                <div className="flex items-center">
                
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      data.isActive ? 'bg-green-500' : 'bg-red'
                    }`}
                  />
                  
                  <span>{data.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              ),
            },
            {
              accessor: 'Applicants',
              render: (data) => <span>{data.applicants.length}</span>,
            },
            {
              accessor: 'actions',
              title: 'Actions',
              render: (job) => (
                <Menu shadow="md" width={150}>
                  <Menu.Target>
                    <Ellipsis />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => handleViewApplicants(job)}>
                      View Applicants
                    </Menu.Item>
                    <Menu.Item color="red">Deactivate Job</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ),
            },
          ]}
          totalRecords={jobsCreator.length}
          recordsPerPage={rowsPerPage}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}

export default PostJobPage;
