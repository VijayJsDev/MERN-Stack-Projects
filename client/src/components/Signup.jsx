import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { MdDone } from "react-icons/md";

function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigation = useNavigation();

  let buttonText =
    navigation.state === "submitting"
      ? "Submitting Data"
      : navigation.state === "idle"
      ? "Submit Data"
      : "";

  const handleFullnameChange = (e) => {
    setFullName(e.target.value);
    setNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const passwordChangeHanlder = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Oops! Password Not Matching, Check Again!");
    } else {
      setConfirmPasswordError("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address");
      return; // Stop further execution
    }

    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match");
      return;
    }

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
        setMessage(
          <>
            <MdDone></MdDone>{" "}
            <p style={{ color: "green" }}>Submitted Successfully!</p>
          </>
        );

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login");
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
              onChange={handleFullnameChange}
              onBlur={() =>
                !fullname.trim() && setNameError("Name Field Cannot Be Empty.")
              }
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="example123@gmail.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                if (!email.trim()) {
                  setEmailError("Email Field Should Not Be Empty!");
                } else {
                  setEmailError("");
                }
              }}
              // onBlur={() => !email.trim() ? setEmailError("Email Field Should Not Be Empty" ) && !email.includes('@') ? <p style={{color: 'red'}}>Enter A Valid Email.</p> : ""}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={passwordChangeHanlder}
              onBlur={() =>
                !password.trim() &&
                setPasswordError("Password Field Cannot Be Empty.")
              }
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={() =>
                !confirmPassword.trim()
                  ? setConfirmPasswordError(
                      "Confirm Password Field Cannot Be Empty!"
                    )
                  : setConfirmPasswordError("")
              }
            />
            {confirmPasswordError && (
              <p style={{ color: "red" }}>{confirmPasswordError}</p>
            )}
          </div>
          <div>
            <button type="submit">{buttonText}</button>
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
