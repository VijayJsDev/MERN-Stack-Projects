import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
const SignupForm = () => {
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle response as needed
      console.log(response);
      setSignUpSuccess(true);
      setTimeout(() => {
        navigate("/login"); // Redirect
      }, 3000);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up for an Account</h2>

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="emailOrPhone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Signup
        </button>
      </form>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
      >
        Return to Home
      </Link>
      {isSignUpSuccess && (
        <h2 className="bg-green-500 text-white p-4 rounded mt-4">
          <TiTickOutline className="inline-block mr-2" /> Login Successful!
          Redirecting in a few seconds...
        </h2>
      )}
    </div>
  );
};

export default SignupForm;
