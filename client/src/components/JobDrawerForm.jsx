import { Drawer, Button, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextInput,
  MultiSelect,
  Text,
  Select,
  Textarea,
  Group,
} from '@mantine/core';
function JobDrawerForm({ opened, close }) {
  const { register, handleSubmit, watch } = useForm();
  const [value, setValue] = useState([]);
  const [selectExperience, setSelectExperience] = useState(null);
  const [min, setMin] = useState(null);
  const [max , setMax] = useState(null);
  console.log(value, selectExperience);
  const employmentOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
  ];
  const experienceOptions = ['0-1 years', '1-2 years', '2-3 years', '4+ years'];
  const onSubmit = (data) => {
    console.log(data);
    const jobPayload = {...data , employment : value , experience : selectExperience , salaryRange : { min , max} , createdBy : localStorage.getItem('id')}
    console.log(jobPayload)
  };

  console.log(watch('employement'));

  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Create Job"
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Job Title"
              placeholder="Enter job title"
              {...register('title')}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              {...register('email')}
            />
            <TextInput
              label="Phone Number"
              placeholder="Enter Phone"
              {...register('phoneNumber')}
            />
            <TextInput
              label="Company Name"
              placeholder="Enter Company Name"
              {...register('companyName')}
            />
            <TextInput
              label="Location"
              placeholder="Enter Location"
              {...register('location')}
            />
            <MultiSelect
              label="Employement"
              placeholder="Select Employement type"
              data={employmentOptions}
              name="employement"
              onChange={setValue}
              value={value}
            />
            <Select
              label="Experience"
              placeholder="Select Experience"
              data={experienceOptions}
              name="experience"
              value={selectExperience}
              onChange={setSelectExperience}
            />
            <Textarea
              label="Job Description"
              placeholder="Enter Job Description"
              {...register('jobDescription')}
            />

            <Text fz="sm">Salary</Text>
            <Group>
              <NumberInput
                placeholder="Enter min Salary"
                name="min"
               value={min} 
               onChange={setMin}
              />
              <NumberInput
                placeholder="Enter max Salary"
                name="max"
                value={max}
                onChange={setMax}
               
              />
            </Group>
            <Button type="submit" mt={10} variant="light">
              Create Job
            </Button>
          </form>
        </div>
      </Drawer>
    </>
  );
}

export default JobDrawerForm;
