import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Signup</NavLink>
                </li>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Login</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation