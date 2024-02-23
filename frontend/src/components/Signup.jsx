import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      response = await fetch("http://localhost:5050/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email Is Already Registered");
      } else {
        setError("An error occurred while signing up. Please try again later.");
      }
    } finally {
      setForm({ username: "", email: "", password: "" });
      navigate("/");
    }
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <h1>Signup Now!</h1>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="My Name is..."
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
          {form.username === "" ? (
            <p style={{ color: "red" }}>Username cannot be Empty</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label>Enter Your Email Address</label>
          <input
            type="email"
            placeholder="example123@gmail.com"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          {form.email === "" ? (
            <p style={{ color: "red" }}>email cannot be Empty</p>
          ) : (
            ""
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label>Enter Your Password</label>
          <input
            type="password"
            placeholder="enter your password here"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          {form.password === "" ? (
            <p style={{ color: "red" }}>Password cannot be Empty</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <input type="submit" value="Confirm Signup" />
        </div>
      </form>
      <p>
        Registered User?<Link to="/login"> Login Now! </Link>
      </p>
    </div>
  );
}

export default Signup;
