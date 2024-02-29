import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  async function loginHandler(e) {
    e.preventDefault();

    if (email === "") {
      setEmailError("Email Field Cannot Be Empty");
      return;
    }
    if (password === "") {
      setPasswordError("Password Field cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        //navigate away
        setMsg(
          <>
            <MdDone></MdDone>
            <p style={{ color: "green" }}>Login Successfull!</p>
          </>
        );
        setInterval(() => {
          navigate("/ticket-booking");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error While Login", error);
      setError("An Error Occured While Login Process!");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="example123@gmail.com"
            value={email}
            onChange={emailChangeHandler}
            onBlur={() =>
              !email.trim() && setEmailError("Email Field Cannot Be Empty.")
            }
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={() =>
              !password.trim() &&
              setPasswordError("Password Field Cannot Be Empty.")
            }
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
      {msg && <div>{msg}</div>}
      {error && <div>{error}</div>}
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
