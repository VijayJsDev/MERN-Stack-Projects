import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.post("/bookTickets", async (req, res, next) => {
  const { origin, destination, price, quantity, user } = req.body;

  try {
    const collection = db.collection("mmrlUsers");

    // Check if the user exists
    const userCheck = await collection.findOne({ email: user });
    if (!userCheck) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user document with booking details
    const result = await collection.updateOne(
      { email: user },
      { $push: { bookings: { origin, destination, price, quantity } } }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ message: "Booking details added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add booking details" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
