import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password, confirmPassword }),
      });

      if (response.ok) {
        // If response is successful, reset form fields and set success message
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage("Signup successful");

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // If response is not successful, parse error message from response body
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (err) {
      console.error("error while submitting", err);
      setMessage("An error occurred while processing your request");
    }
  }

  return (
    <>
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="example123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
        {message && <div>{message}</div>}
        <p>
          Existing User? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
