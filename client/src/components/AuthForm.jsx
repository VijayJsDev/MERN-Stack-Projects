import React from "react";
import { Form } from "react-router-dom";

function AuthForm() {
  return (
    <Form>
      <div>
        <h1>Authentication</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button>Submit</button>
    </Form>
  );
}

export default AuthForm;
