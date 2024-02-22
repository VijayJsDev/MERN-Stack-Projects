import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccessful, setSignupSuccessful] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        email,
        password,
      });
      navigate('/');
    } catch (error) {
      throw new Error("form not Submitted", error);
    }
  };

  return (
    <div>
      <section className={classes.formSection}>
        <h1>Signup Now!!</h1>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.formInputs}>
            <FaRegUserCircle />
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className={classes.inputFields}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
          <button type="submit">Signup</button>
        </form>
        <p>
          Already Had An Account?<Link to="/login">Login Now!</Link>
        </p>
      </section>
    </div>
  );
}

export default SignUp;
