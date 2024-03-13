import React, { useEffect, useState } from "react";

const ConfirmedTicket = () => {
  const [bookingId, setBookingId] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(100);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch metro booking details from local storage
    const storedBookingDetails = localStorage.getItem("bookingDetails");
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }

    // Generate a random booking ID
    const newBookingId = Math.floor(Math.random() * 1000000);
    setBookingId(newBookingId);

    // Store the booking time and details in local storage
    const currentTime = new Date().toLocaleString();
    setBookingTime(currentTime);

    const bookingData = {
      id: newBookingId,
      time: currentTime,
      details: bookingDetails
    };

    localStorage.setItem("confirmedBooking", JSON.stringify(bookingData));

    // Fetch token balance from local storage
    const storedTokenBalance = localStorage.getItem("tokenBalance");
    if (storedTokenBalance) {
      setTokenBalance(parseFloat(storedTokenBalance));
    }
  }, []);

  return (
    <div>
      <h2>Confirmed Ticket</h2>
      <p className="big-font">Confirmed!</p>
      <p>Booking ID: {bookingId}</p>
      <p>Booking Time: {bookingTime}</p>
      <p>Booking Details:</p>
      {bookingDetails ? (
        <div>
          <p>Origin: {bookingDetails.origin}</p>
          <p>Destination: {bookingDetails.destination}</p>
          <p>Price: ${bookingDetails.totalPrice}</p>
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
      <p>Remaining Token Balance: ${tokenBalance}</p>
    </div>
  );
};

export default ConfirmedTicket;
