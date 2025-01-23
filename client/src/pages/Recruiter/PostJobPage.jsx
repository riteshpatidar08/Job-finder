import React, { useEffect } from 'react';
import { Button, Box } from '@mantine/core';
import { CirclePlus } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import JobDrawerForm from '../../components/JobDrawerForm';
import { DataTable } from 'mantine-datatable';
import { getJobsByCreator } from '../../redux/Slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Ellipsis } from 'lucide-react';
import { Menu } from '@mantine/core';
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
      <div className='m-10'>
      <DataTable
        withTableBorder
        borderRadius="sm"
       
        striped
        highlightOnHover
        // provide data
        records={jobsCreator}
        // define columns
        columns={[
          { accessor: 'title' },

          { accessor: 'companyName' },
          {
            accessor: 'isActive',
            title: 'Status',
            render: (data) => (
              <div
                style={{ backgroundColor: data.isActive ? 'green' : 'red' ,width:'80px' }}
                className="px-4 py-1 text-center rounded-full"
              >
                {data.isActive ? 'Active' : 'Inactive'}
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
            render: () => (
              <Menu shadow="md" width={150}>
                <Menu.Target>
                  <Ellipsis />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>View Applicants</Menu.Item>
                  <Menu.Item color="red">Deactivate Job</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ),
          },
        ]}
        // execute this callback when a row is clicked
      />
      </div>
    </div>
  );
}

export default PostJobPage;
