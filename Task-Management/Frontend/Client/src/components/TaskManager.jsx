import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";

const TaskManagement = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Not Started",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setTaskData({
          title: "",
          description: "",
          dueDate: "",
          priority: "Low",
          status: "Not Started",
        });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        console.error("Error submitting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">
        Task Management
      </h1>
      <div className="flex justify-end items-center mb-4">
        <BsPerson className="text-2xl text-gray-600" />
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:border-indigo-500"
        />

        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-700">
          Description:
        </label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full h-20 focus:outline-none focus:border-indigo-500"
        ></textarea>

        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-700">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:border-indigo-500"
        />

        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-700">
          Priority:
        </label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:border-indigo-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-700">
          Status:
        </label>
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="border p-2 rounded w-full focus:outline-none focus:border-indigo-500"
        >
          <option value="Not Started">Not Started</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Task
      </button>
      <br></br>
      <Link
        to="/"
        className="bg-green-700 text-white px-4 py-2 rounded inline-block"
      >
        Return to Home
      </Link>
      {submitted && (
        <div className="mt-4 flex items-center text-green-500">
          <MdDone className="text-2xl mr-2" />
          Task submitted successfully!
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
