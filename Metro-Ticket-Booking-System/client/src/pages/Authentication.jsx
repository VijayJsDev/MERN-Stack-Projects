import React from "react";
import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

function Authentication() {
  return <AuthForm />;
}

export default Authentication;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported Mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:5050/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if(!response.ok){
    throw json({message: 'Could Not Authenticate User.'},{status: 500})
  }
  const resData = await response.json();
  const token = resData.token;
  const user = resData.email

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('user', user);

  return redirect('/');
}
