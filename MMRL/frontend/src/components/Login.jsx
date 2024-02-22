import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import axios from "axios";
import classes from './LoginPage.module.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formSubmitHandler =  (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      navigate('/auth');
    } catch (err) {
      throw new Error("form not Submitted", err);
    }
  };
  return (
    <>
      <div>
        <section className={classes.formSection}>
          <h1>Login</h1>
          <form onSubmit={formSubmitHandler}>
            <div className={classes.formInputs}>
              <SiGmail />
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter Your Email Address"
                className={classes.inputFields}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.formInputs}>
              <RiLockPasswordFill />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className={classes.inputFields}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            New User? Signup Now!<Link to="/signup">Signup</Link>
          </p>
        </section>
      </div>
    </>
  );
}

export default Login;
