import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { MdDone } from "react-icons/md";

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
      } else {
        console.error("Error submitting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-end items-center mb-4">
        <BsPerson className="text-2xl" />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <label className="block text-sm font-semibold mt-4 mb-2">
          Description:
        </label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        ></textarea>

        <label className="block text-sm font-semibold mt-4 mb-2">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <label className="block text-sm font-semibold mt-4 mb-2">
          Priority:
        </label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block text-sm font-semibold mt-4 mb-2">Status:</label>
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
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
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
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
