import React from "react";
import MainNavigation from "./MainNavigation";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../store/counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <MainNavigation />
      <h1>Madurai Metro Rail Limited</h1>
      <p>Book Your Metro Tickets And Enjoy The Ride!</p>
      <h1>Get Started</h1>
      <Link to="/signup">SignUp Now!!</Link>
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </>
  );
}

export default Home;
