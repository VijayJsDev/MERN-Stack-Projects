import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db/connection.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const mmrlUsersCollection = db.collection("mmrlUsers");

    const existingUser = await mmrlUsersCollection.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ message: "Email exists Already." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: email,
      password: hashedPassword,
    };
    console.log(newUser);

    const createdUser = await mmrlUsersCollection.insertOne(newUser);
    const authToken = jwt.sign(
      { email: createdUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res
      .status(201)
      .json({ message: "User Created!", user: createdUser, token: authToken });
  } catch (error) {
    console.error(error);
    next(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const mmrlUsersCollection = db.collection("mmrlUsers");

    const user = await mmrlUsersCollection.findOne({ email: email });
    if (!user) {
      res
        .status(401)
        .json({ message: "User Not Found. Authentication failed." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(422).json({
        message: "Invalid Credentials.",
        errors: { credentials: "Invalid Email or Password entered" },
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
