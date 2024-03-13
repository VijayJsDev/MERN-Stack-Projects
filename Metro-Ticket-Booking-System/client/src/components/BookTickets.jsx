// BookTickets.js
import React, { useState } from "react";
import metroData from "./MetroData";

const BookTickets = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleQuantityChange = (event) => {
    let newQuantity = parseInt(event.target.value);
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 6) {
      newQuantity = 6;
    }
    setQuantity(newQuantity);
  };

  const totalPrice = metroData.find((place) => place.name === destination)?.price * quantity;

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
        <input type="number" value={quantity} min="1" max="6" onChange={handleQuantityChange} />
      </div>
      {origin === destination && <p>Origin and destination can't be the same.</p>}
      {totalPrice && (
        <p>
          Total Price: ${totalPrice}
        </p>
      )}
    </div>
  );
};

export default BookTickets;
