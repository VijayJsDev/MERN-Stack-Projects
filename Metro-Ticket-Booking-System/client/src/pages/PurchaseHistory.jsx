// Assuming you're making this request from a React component
import React, { useEffect, useState } from "react";
import './PurchaseHistory.css';

function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const userEmail = localStorage.getItem("user");
        const response = await fetch(`http://localhost:5050/purchase-history?email=${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch purchase history");
        }

        const data = await response.json();
        setPurchaseHistory(data.purchaseHistory);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2>Purchase History</h2>
      <ul>
        {purchaseHistory.map((booking, index) => (
          <li id="lis" key={index}>
            <p>Origin: {booking.origin}</p>
            <p>Destination: {booking.destination}</p>
            <p>Price: ${booking.price}</p>
            <p>Quantity: {booking.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchaseHistory;
