import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";

const LoginForm = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [userNotFound, setUserNotFound] = useState(false);
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

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
        setSignUpSuccess(true);
        setTimeout(() => {
          navigate("/tasks"); // Redirect 
        }, 3000);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        className="w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="emailOrPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Email or Phone:
          </label>
          <input
            type="text"
            id="emailOrPhone"
            name="emailOrPhone"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        {userNotFound && (
          <div className="text-red-500 mb-4">
            User not found.{" "}
            <Link to="/login" className="text-blue-500">Go back to login</Link>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>

      <Link to="/" className="text-blue-500 mt-4">Return To Homepage</Link>

      {isSignUpSuccess && (
        <h2 className="bg-green-500 text-white p-4 rounded mt-4">
          <TiTickOutline className="inline-block mr-2" /> Login Successful! Redirecting in a few seconds...
        </h2>
      )}
    </div>
  );
};

export default LoginForm;
