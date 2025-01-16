import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { register, handleSubmit } = useForm();
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'recruiter') {
      navigate('/');
    }
  }, [role]);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(LoginForm(data));
  };
  return (
    <div>
      <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input className="text-black" {...register('email')} />
        <label>Password</label>
        <input className="text-black" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
