// SignupForm.js
import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle response as needed
      console.log(response);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email or Phone:</label>
      <input type="text" name="emailOrPhone" onChange={handleChange} />

      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />

      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
