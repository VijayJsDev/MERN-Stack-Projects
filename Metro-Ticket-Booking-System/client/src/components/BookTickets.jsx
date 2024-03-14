// BookTickets.js
import React, { useState } from "react";
import metroData from "./MetroData";
import { useNavigate } from "react-router-dom";

const BookTickets = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigate();

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    const selectedPlace = metroData.find(
      (place) => place.name === event.target.value
    );
    if (selectedPlace) {
      setPrice(selectedPlace.price);
      setTotalPrice(selectedPlace.price * quantity);
    }
  };

  const handleQuantityChange = (event) => {
    let newQuantity = parseInt(event.target.value);
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 6) {
      newQuantity = 6;
    }
    setQuantity(newQuantity);
    setTotalPrice(price * newQuantity);
  };
  

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTotalPriceChange = () => {
    setTotalPrice(price * newQuantity);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(
      "bookingData",
      JSON.stringify({ origin, destination, quantity, totalPrice })
    );
    navigation("/payment");
  };

  // Check if origin and destination are the same
  const isDisabled = origin === destination;

  return (
    <div>
      <h2>Book Tickets</h2>
      <div>
        <label>Origin:</label>
        <select value={origin} onChange={handleOriginChange}>
          <option value="">Select Origin</option>
          {metroData.map((place) => (
            <option key={place.id} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Destination:</label>
        <select value={destination} onChange={handleDestinationChange}>
          <option value="">Select Destination</option>
          {metroData.map((place) => (
            <option key={place.id} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          max="6"
          onChange={handleQuantityChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={handlePriceChange}  disabled/>
      </div>
      <div>
        <label>Total Price:</label>
        <span>${totalPrice}</span>
      </div>
      {origin === destination && (
        <p>Origin and destination can't be the same.</p>
      )}
      <button onClick={handleSubmit} disabled={isDisabled}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default BookTickets;
