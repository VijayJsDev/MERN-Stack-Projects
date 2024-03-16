import React, { useState } from "react";
import metroData from "./MetroData";
import { Form, redirect, useActionData } from "react-router-dom";
import "./BookTickets.css";

function BookTickets() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const originChangeHandler = (e) => {
    setOrigin(e.target.value);
  };

  const destinationChangeHandler = (e) => {
    setDestination(e.target.value);
    const selectedPlace = metroData.find(
      (place) => place.name === e.target.value
    );
    if (selectedPlace) {
      setPrice(selectedPlace.price);
      setTotalPrice(selectedPlace.price * quantity);
    }
  };

  const quantityChangeHandler = (e) => {
    let newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 6) {
      newQuantity = 6;
    }
    setQuantity(newQuantity);
    setTotalPrice(price * newQuantity);
  };

  const ticketSubmissionHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        <h1>MMRL Ticket Booking</h1>
        <Form method="post" className="form">
          <div>
            <label>Choose Origin</label>
            <select
              value={origin}
              onChange={originChangeHandler}
              name="originName"
            >
              {metroData.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          <label>Choose Destination</label>
          <select
            value={destination}
            onChange={destinationChangeHandler}
            name="destinationName"
          >
            {metroData.map((place) => (
              <option key={place.id} value={place.name}>
                {place.name}
              </option>
            ))}
          </select>
          {origin === destination ? (
            <p>Origin And Destination Can't Be Same</p>
          ) : (
            ""
          )}
          <div>
            <label>Price Of Each Ticket</label>
            <input type="text" value={price} readOnly name="priceName" />
          </div>
          <input type="hidden" name="price" value={price} />
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              min="1"
              max="6"
              onChange={quantityChangeHandler}
              name="quantityName"
            />
            <p>Maximum Of 6 Tickets Can Be Booked!</p>
          </div>
          <div>
            <h3 id='total-price'>Total Price: ${totalPrice}</h3>
          </div>
          <div>
            <button>Book Ticket</button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default BookTickets;

export async function action({ request }) {
  const formData = await request.formData();
  const retrievedData = {
    origin: formData.get("originName"),
    destination: formData.get("destinationName"),
    price: formData.get("priceName"),
    quantity: formData.get("quantityName"),
    user: localStorage.getItem("user"),
  };
  localStorage.setItem("bookingDetails", JSON.stringify(retrievedData));

  const response = await fetch("http://localhost:5050/bookTickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(retrievedData),
  });
  if (!response.ok) {
    return response;
  }

  const resData = await response.json();
  return redirect("/payment");
}
