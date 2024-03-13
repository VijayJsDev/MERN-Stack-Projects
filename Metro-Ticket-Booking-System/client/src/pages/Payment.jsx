import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [tokenBalance, setTokenBalance] = useState(100);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch metro booking details from local storage
    const storedBookingDetails = localStorage.getItem("bookingData");
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }

    // Fetch token balance from local storage
    const storedTokenBalance = localStorage.getItem("tokenBalance");
    if (storedTokenBalance) {
      setTokenBalance(parseFloat(storedTokenBalance));
    }
  }, []);

  const handleContinue = () => {
    if (!bookingDetails) {
      console.error("No booking details found.");
      return;
    }

    const price = bookingDetails.totalPrice;

    if (tokenBalance < price) {
      console.error("Insufficient balance to proceed with payment.");
      return;
    }

    const remainingBalance = tokenBalance - price;

    // Update the token balance in local storage
    localStorage.setItem("tokenBalance", remainingBalance.toString());
    navigate('/confirmed-ticket');
    // Optionally, you can redirect the user to a success page or perform any other action
    console.log("Payment successful. Remaining balance:", remainingBalance);

  };

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Token Balance: ${tokenBalance}</p>
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
      <button onClick={handleContinue}>Continue with stored value pass</button>
    </div>
  );
};

export default Payment;
