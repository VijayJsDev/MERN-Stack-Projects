import React from "react";
import MainNavigation from "./MainNavigation";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <MainNavigation />
      <h1>Madurai Metro Rail Limited</h1>
      <p>Book Your Metro Tickets And Enjoy The Ride!</p>
      <h1>Get Started</h1>
      <Link to="/signup">SignUp Now!!</Link>
    </>
  );
}

export default Home;
