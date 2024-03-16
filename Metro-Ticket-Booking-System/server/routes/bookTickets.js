import express from "express";
import db from "../db/connection.js";
import twilio from "twilio";

const router = express.Router();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const verifySid = process.env.VERIFYSID;

const client = twilio(accountSid, authToken);

async function sendOTP(phoneNumber) {
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "sms" });
    return verification;
  } catch (error) {
    throw new Error("Error sending OTP: " + error.message);
  }
}

async function verifyOTP(phoneNumber, otpCode) {
  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });
    return verificationCheck;
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
}

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
router.post("/payment", async (req, res) => {
  const { cardNo, expiryMM, expiryYY, cvv } = req.body;
  let phoneNumber = process.env.MYPHONENUMBER;
  const dummyCardNo = "1234567890123456";
  const dummyExpiryMM = "12";
  const dummyExpiryYY = "25";
  const dummyCvv = "123";

  let paymentMethod = "";

  if (
    cardNo === dummyCardNo &&
    expiryMM === dummyExpiryMM &&
    expiryYY === dummyExpiryYY &&
    cvv === dummyCvv
  ) {
    paymentMethod = "card";
  } else {
    return res.status(400).json({ message: "Invalid payment details." });
  }

  try {
    await sendOTP(`+91${phoneNumber}`);
    res.status(200).json({ message: `OTP sent to ${phoneNumber}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP." });
  }
});

router.post("/verify", async (req, res) => {
  const { otp, phoneNumber } = req.body;

  try {
    // Ensure phoneNumber is in the correct format
    const formattedPhoneNumber = `+91${phoneNumber}`;

    const verification_check = await verifyOTP(formattedPhoneNumber, otp); // Pass formatted phone number
    if (verification_check.status === "approved") {
      // OTP verification successful
      res.status(200).json({ message: "OTP verification successful." });
    } else {
      // OTP verification failed
      res.status(400).json({ message: "Invalid OTP. Payment failed." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP." });
  }
});
router.get("/purchase-history", async (req, res) => {
  try {
    const userEmail = req.query.email;

    // Assuming you're using MongoDB
    const collection = db.collection("mmrlUsers");

    // Check if the user exists
    const user = await collection.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the user's purchase history
    const purchaseHistory = user.bookings || [];

    return res.status(200).json({ purchaseHistory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
