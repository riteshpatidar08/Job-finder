import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
function Navbar() {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);
  console.log(role);
  console.log(location);
  return (
    <div>
      <header
        className="h-16 m-3 bg-opacity-50 backdrop-blur-lg rounded-lg  drop-shadow-md px-4 sticky z-10 top-0 flex bg-dark-gray-1 items-center justify-between"
      >
        <Link to="/" className="text-white ml-2 text-xl font-bold">
          Job<span className="text-red">finder</span>
        </Link>
        <div className="flex items-center gap-4 justify-between">
          <Link
            to="/"
            className="text-sm hover:bg-red p-2 transition-all ease-linear duration-300 rounded-lg text-white"
          >
            Jobs
          </Link>

          {role === 'recruiter' && (
            <>
              <Link
                className="text-sm hover:bg-red p-2 transition-all ease-linear duration-300 rounded-lg text-white"
                to="/recruiter/post-job"
              >
                Post a Job
              </Link>
            </>
          )}

          {role === null &&
            location.pathname !== '/signup' &&
            location.pathname !== '/login' && (
              <div className="flex gap-5">
                <Link
                  to="/login"
                  className="btn hover:bg-red transition-all duration-200 ease-in-out"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn bg-red">
                  Register
                </Link>
              </div>
            )}

          {location.pathname === '/signup' && (
            <span className="text-white">
              Already Registered?
              <Link className="text-red hover:underline" to="/login">
                Login{' '}
              </Link>
            </span>
          )}

          {role && <ProfileDropdown role={role} />}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
