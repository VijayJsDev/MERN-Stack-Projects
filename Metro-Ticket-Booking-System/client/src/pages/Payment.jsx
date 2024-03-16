import React, { useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";

function Payment() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentModeIsClicked, setPaymentModeIsClicked] = useState(false);

  useEffect(() => {
    const storedBookingDetails = localStorage.getItem("bookingDetails");
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }
  }, []);

  const handlePaymentModeClick = () => {
    setPaymentModeIsClicked(!paymentModeIsClicked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;
    if (name === "cardno" && value.length > 16) return;
    if ((name === "month" || name === "year") && value.length > 2) return;
    if (name === "cvv" && value.length > 3) return;
  };

  return (
    <>
      <header>Hello {bookingDetails?.user || "Guest"}!</header>
      <div>
        {bookingDetails ? (
          <div>
            <h1>Confirm Booking Details</h1>
            <p>Origin: {bookingDetails.origin}</p>
            <p>Destination: {bookingDetails.destination}</p>
            <p>Price: ${bookingDetails.price}</p>
            <p>Quantity: {bookingDetails.quantity}</p>
          </div>
        ) : (
          <p>No Payment Details Found.</p>
        )}
      </div>
      <h1>Payment Modes</h1>
      <h5 onClick={handlePaymentModeClick}>Pay Via Debit Card</h5>
      {paymentModeIsClicked && (
        <Form method="post">
          <div>
            <label>Card No:</label>
            <input
              type="text"
              name="cardno"
              placeholder="Enter 16 Digits Card No"
              maxLength="16"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              name="expirymm"
              placeholder="MM"
              maxLength="2"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="expiryyy"
              placeholder="YY"
              maxLength="2"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="001"
              maxLength="3"
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Pay ${bookingDetails.price}</button>
        </Form>
      )}
    </>
  );
}

export default Payment;
export async function action({ request }) {
  const data = await request.formData();
  const formData = {
    cardNo: data.get("cardno") || "",
    expiryMM: data.get("expirymm") || "",
    expiryYY: data.get("expiryyy") || "",
    cvv: data.get("cvv") || "",
    phoneNumber: data.get("phoneNumber") || "",
  };

  // Ensure phone number is in E.164 format
  const formattedPhoneNumber = `${formData.phoneNumber}`;

  const response = await fetch("http://localhost:5050/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    // Prompt user for OTP
    const otp = prompt("Enter OTP:");
    // Send OTP and phoneNumber to server for verification
    const otpResponse = await fetch("http://localhost:5050/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, phoneNumber: formattedPhoneNumber }), // Pass formatted phone number
    });

    if (otpResponse.ok) {
      // Redirect to confirmed ticket page if OTP verification is successful
      return redirect("/confirmed-ticket");
    } else {
      console.error("Invalid OTP. Payment failed.");
      return;
    }
  } else if (response.status === 400) {
    const errorData = await response.json();
    console.error(errorData);
    return;
  } else {
    console.error("An error occurred:", response.statusText);
  }
}
