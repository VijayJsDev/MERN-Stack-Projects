import React from "react";
import { Form, NavLink, redirect, useRouteLoaderData } from "react-router-dom";
import './MainNavigation.css';
import { FaTrain } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoTicket } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header>
      <h1><FaTrain></FaTrain>MMRL</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/"><IoHomeOutline></IoHomeOutline>Home</NavLink>
          </li>
          {token && (
            <li>
              <NavLink to="/book-tickets"><IoTicket></IoTicket>Tickets For Metro!!</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/purchase-history"><FaHistory></FaHistory> Purchase History</NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink to="/auth?mode=login"><IoLogInOutline></IoLogInOutline>Authentication</NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button><IoLogOutOutline></IoLogOutOutline>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
