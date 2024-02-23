import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <nav>
            <NavLink to="/">MMRL</NavLink>
            <NavLink to="signup">Signup!</NavLink>
        </nav>
    </div>
  )
}

export default Navbar;