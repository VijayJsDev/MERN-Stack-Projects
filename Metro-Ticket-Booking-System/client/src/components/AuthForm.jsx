import React from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router-dom";

function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post">
      <div>
        <h1>{isLogin ? "Login" : "Create A New User"}</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password"  required />
      </div>
      <button disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
        {isLogin ? "Create New User" : "Login"}
      </Link>
    </Form>
  );
}

export default AuthForm;
