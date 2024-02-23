import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  function updateForm(value){
    return setForm((prev) => {
        return {...prev, ...value};
    });
  };

  async function formSubmitHandler(e){
    e.preventDefault();
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
            onChange={(e) => updateFormForm({name: e.target.value})}
          />
          {form.name === "" ? <p style={{color: 'red'}}>Username cannot be Empty</p> : ""} 

        </div>
        <div>
          <label>Enter Your Email Address</label>
          <input
            type="email"
            placeholder="example123@gmail.com"
            value={form.email}
            onChange={(e) => updateForm({email: e.target.value})}
          />
          {form.email === "" ? <p style={{color: 'red'}}>email cannot be Empty</p> : ""} 
        </div>
        <div>
          <label>Enter Your Password</label>
          <input
            type="password"
            placeholder="enter your password here"
            value={form.password}
            onChange={(e) => updateForm({password: e.target.value})}
          />
          {form.password === "" ? <p style={{color: 'red'}}>Password cannot be Empty</p> : ""} 
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
