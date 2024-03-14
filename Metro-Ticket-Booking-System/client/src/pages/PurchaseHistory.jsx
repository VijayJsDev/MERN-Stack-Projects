import React, { useState, useEffect } from "react";

const PurchaseHistory = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const storedBookingDetails = localStorage.getItem("confirmedBooking");
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }
  }, []);

  return (
    <div>
      <h2>Purchase History</h2>
      {bookingDetails ? (
        <div>
          <p>Booking ID: {bookingDetails.id}</p>
          <p>Booking Time: {bookingDetails.time}</p>
          {/* <p>Booking Details:</p>
          <p>Origin: {bookingDetails.details.origin}</p>
          <p>Destination: {bookingDetails.details.destination}</p>
          <p>Price: ${bookingDetails.details.totalPrice}</p> */}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default PurchaseHistory;
