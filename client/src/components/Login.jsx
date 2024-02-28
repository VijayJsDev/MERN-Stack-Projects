import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" placeholder="example123@gmail.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Your Password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
      <p>
        New User?<Link to="/signup">Sign Up</Link>
      </p>
      <p>
        <Link to="/">Return To Home</Link>
      </p>
    </div>
  );
}

export default Login;
