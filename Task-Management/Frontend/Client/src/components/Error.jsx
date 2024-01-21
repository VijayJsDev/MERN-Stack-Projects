import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const ErrorComponent = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-500 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center">
          <FaExclamationCircle className="text-4xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">Error While Fetching Data.</h2>
            
            <p>{message}</p>
          </div>
        </div>
        <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block ml-20"
      >
        Return to Home
      </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
