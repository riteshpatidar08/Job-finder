import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <header>
        <h1>Job <span>finder</span></h1>

        <div>
            <Link>Jobs</Link>
            <button>Login</button>
            <button>Register</button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
