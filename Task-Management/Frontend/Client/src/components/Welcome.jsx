import React from "react";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <>
      <button>
        <Link to="/signup">Signup Page</Link>
      </button>
      <button>
        <Link to="/login">Login Page</Link>
      </button>
    </>
  );
}

export default Welcome;
