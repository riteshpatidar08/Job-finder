import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MailIcon, Lock } from 'lucide-react';
import {Loader} from '@mantine/core'
function Login() {
  const { register, handleSubmit } = useForm();
  const { role , loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'recruiter' || role ==='jobseeker') {
      navigate('/');
    }

  
  }, [role]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(LoginForm(data));
  };

  return (
    <div className="p-6 bg-dark-gray-1 text-white container max-h-[500px] overflow-y-scroll shadow-md max-w-xl mx-auto mt-16 rounded-xl">
      <div className="flex flex-col gap-1 my-6">
        <h1 className="text-sm font-semibold">
          Welcome back to <span className="text-red">JobFinder</span>
        </h1>
        <p className="text-sm font-medium text-gray-alpha">
          Please log in to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <div className="relative">
            <MailIcon className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full pl-10 border bg-input-field drop-shadow-md rounded-full px-3 py-2 
              border-gray-300 
               focus:outline-none"
              placeholder="Your Email"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full pl-10 border bg-input-field drop-shadow-md rounded-full px-3 py-2 
              border-gray-300 
               focus:outline-none"
              placeholder="Your Password"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="rememberMe" {...register('rememberMe')} />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <p className="text-[11px] font-normal">
          By clicking Login, you agree to the{' '}
          <span className="text-red">Terms and Conditions</span> &{' '}
          <span className="text-red">Privacy Policy</span> of JobFinder.com
        </p>

        <button
          type="submit"
          className="w-full font-semibold tracking-wide  bg-red text-white py-2 rounded-full"
        >
         {loading ? <Loader size={16} color="white"/> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
