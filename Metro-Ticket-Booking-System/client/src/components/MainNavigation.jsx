import React from "react";
import { Form, NavLink, redirect, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {token && (
            <li>
              <NavLink to="/book-tickets">Tickets For Metro!!</NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink to="/auth?mode=login">Authentication</NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
