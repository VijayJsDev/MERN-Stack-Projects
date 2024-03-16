import React from "react";
import { Link } from "react-router-dom";
import './ConfirmedTicket.css';

function ConfirmedTicket() {
  return (
    <>
      <div className="container">
        <h1>Your Ticket Booking Confirmed</h1>
        <p>Ticeket Is Valid Upto 2 Hours From Now!</p>
        <Link to="/" id="link-button">Return To Home</Link>
      </div>
    </>
  );
}

export default ConfirmedTicket;
