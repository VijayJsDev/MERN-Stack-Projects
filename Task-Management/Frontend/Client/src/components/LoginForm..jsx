// LoginForm.js
import React, { useState } from "react";
import { redirect } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [userNotFound, setUserNotFound] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Successful login
        // Redirect to another page or perform other actions
        console.log("Login Successful");
        redirect("/signup");
      } else if (response.status === 404) {
        // User not found
        setUserNotFound(true);
      } else {
        // Handle other error scenarios
        console.error("Login error:", result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email or Phone:</label>
      <input type="text" name="emailOrPhone" onChange={handleChange} />

      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />

      {userNotFound && (
        <div>
          User not found.{" "}
          <button onClick={() => redirect("/login")}>
            Go back to login
          </button>
        </div>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
