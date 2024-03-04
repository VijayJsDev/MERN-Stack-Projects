import React from "react";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
