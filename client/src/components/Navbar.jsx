import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <header
        className="bg-gray-alpha-2 sticky top-0 z-10 p-3 bg-opacity-50 backdrop-blur-sm 
   m-3 rounded-lg flex justify-between items-center h-16"
      >
        <h1 className="text-white ml-2 text-xl font-bold">
          Job<span className="text-red">finder</span>
        </h1>

        <div className="text-white  items-center flex gap-5">
          <Link className="text-md font-semibold">Jobs</Link>
          <button className="btn hover:bg-red transition-all duration-200 ease-in-out">
            Login
          </button>
          <button className="btn bg-red">Register</button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
