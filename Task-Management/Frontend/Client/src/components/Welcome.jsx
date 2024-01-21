import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="text-gray-600 mb-8">
        Your go-to platform for efficient task management.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        <Link to="/signup">Signup Page</Link>
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/login">Login Page</Link>
      </button>
    </div>
  );
}

export default Welcome;
