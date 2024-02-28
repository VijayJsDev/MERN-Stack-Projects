import React from "react";
import { Link } from "react-router-dom";

function Signup() {

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5050/signup", {
      
    })
  }

  return (
    <>
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" placeholder="Enter Your Full Name" />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder="example123@gmail.com" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password" />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
        <p>Existing User? <Link to="/login">Login</Link></p>
      </div>
    </>
  );
}

export default Signup;
