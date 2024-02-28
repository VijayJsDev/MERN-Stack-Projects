import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    </>
  )
}

export default Navbar