import React from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css';
import { SignupForm } from '../../redux/Slices/authSlice';
import {useDispatch} from 'react-redux' ;
function Signup() {
  const { register, handleSubmit, watch } = useForm();
const dispatch = useDispatch() ;
  const onSubmit = (data) => {
  const formData = new FormData() ;
  formData.append("name",data.name) ;
  formData.append("email",data.email) ;
  formData.append("phoneNumber",data.phoneNumber) ;
  formData.append('password',data.password) ;
  formData.append("role",data.role) ;

  if(data.role === 'jobseeker'){
    formData.append('jobseeker', JSON.stringify({
      education : [
        {
          degree : data.degree,
          institution : data.institution ,
          year : data.year
        }
      ],
      experiance : [
        {
          companyName : data.companyName ,
          designation : data.designation,
          duration : data.duration

        }
      ],
      skills : data.skills.split(','),
      resume : data.resume[0]
    }))
  }

  if(data.role === 'recruiter'){
    form.append('recruiter', JSON.stringify({
      companyName : data.companyName ,
      companyWebsite : data.companyWebsite
    }))
  }


    dispatch(SignupForm(formData))

  };

  const selectedRole = watch('role');
  console.log(selectedRole);
  console.log({ ...register('phoneNumber') });

  return (
    <div>
      <div className="p-6 container max-h-[500px]   overflow-y-scroll shadow-md max-w-2xl mx-auto bg-dark-gray-1 mt-20 rounded-xl">
        <div className="flex flex-col gap-1 my-6">
          <h1 className="text-sm text-white tracking-medium font-semibold">
            Create your <span className="text-red">JobFinder</span> profile
          </h1>
          <p className="text-sm font-medium text-gray-alpha">
            Search & apply to jobs from India's No.1 Job Site
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-white"
        >
          <div className="grid grid-cols-2 text-sm md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Name <span className="text-bright-red">*</span>
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full tex-sm bg-input-field focus:border-red-500 outline-none rounded-full border border-gray-300  px-3 py-2"
                placeholder="What is your name ?"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Email <span className="text-bright-red">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Password <span className="text-bright-red">*</span>
              </label>
              <input
                type="password"
                {...register('password')}
                className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                placeholder="Your Password"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number <span className="text-bright-red">*</span>
              </label>
              <input
                type="text"
                {...register('phoneNumber')}
                className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                placeholder="Your Phone Number"
              />
            </div>
          </div>

          <div className="text-sm">
            <label className="block text-gray-700 mb-2">
              Are you a ? <span className="text-bright-red">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('role')}
                  value="jobseeker"
                  className="mr-2"
                />
                Job Seeker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('role')}
                  value="recruiter"
                  className="mr-2"
                />
                Recruiter
              </label>
            </div>
          </div>

          <div className="text-sm">
            {selectedRole === 'jobseeker' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Job Seeker Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 space-y-1">
                  <div>
                    <label className="block text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      {...register('degree')}
                      className="w-full bg-input-field border border-gray-300 rounded-full px-3 py-2"
                      placeholder="Your Degree"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      {...register('institution')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Your Institution"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Year</label>
                    <input
                      type="number"
                      {...register('year')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Year of Graduation"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      {...register('company')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Duration (Years)
                    </label>
                    <input
                      type="number"
                      {...register('duration')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Duration"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      {...register('designation')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Job Role"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Skills</label>
                    <input
                      type="text"
                      {...register('skills')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="E.g., JavaScript, React"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Resume <span className="text-bright-red">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('resume')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Resume Link"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedRole === 'recruiter' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Recruiter Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      className="w-full bg-input-field border border-gray-300 rounded-full px-3 py-2"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="text"
                      {...register('companyWebsite')}
                      className="w-full border bg-input-field border-gray-300 rounded-full px-3 py-2"
                      placeholder="Company Website"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] font-normal">
            By clicking Register, you agree to the{' '}
            <span className="text-red">Terms and Conditions</span> &{' '}
            <span className="text-red">Privacy Policy</span> of JobFinder.com
          </p>
          <button
            type="submit"
            className="w-full bg-red text-white py-2 rounded-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
