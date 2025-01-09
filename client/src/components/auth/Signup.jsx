import React from 'react';
import { useForm } from 'react-hook-form';
function Signup() {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const selectedRole = watch('role');
  console.log(selectedRole);
  console.log({ ...register('phoneNumber') });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          {...register('name')}
          type="text"
          className="border border-blue-400"
        />
        <label>Email</label>
        <input
          {...register('email')}
          type="email"
          className="border border-blue-400"
        />
        <label>Phone Number</label>
        <input
          {...register('phoneNumber')}
          type="number"
          className="border border-blue-400"
        />
        <label>Are you a ?</label>
        <label>Jobseeker</label>
        <input type="radio" {...register('role')} value="jobseeker" />
        <label>Recruiter</label>
        <input type="radio" {...register('role')} value="recruiter" />

        {selectedRole === 'jobseeker' && (
          <>
            <h1>Education</h1>
            <label>Degree</label>
            <input
              className="border border-blue-400"
              type="text"
              {...register('degree')}
            />
          </>
        )}
        <button type="submit" className="px-10 bg-blue-500 py-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
