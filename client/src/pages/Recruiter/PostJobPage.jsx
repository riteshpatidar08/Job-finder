import React from 'react'
import { Button } from '@mantine/core';
import { CirclePlus } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import JobDrawerForm from '../../components/JobDrawerForm';
function PostJobPage() {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className='flex justify-end px-5 mt-10'>
    <Button leftSection={<CirclePlus size={16}/>} onClick={open} variant="light">Create Job</Button>
    <JobDrawerForm opened={opened} close={close}/>
    </div>
  )
}

export default PostJobPage
