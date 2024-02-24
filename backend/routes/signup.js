import express from "express";
import bcrypt from "bcrypt";

import db from "../db/connection.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const existingUser = await db.collection("mmrlUsers").findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email Is Already Registered.");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newDocument = {
      username,
      email,
      password: hashPassword,
    };
    console.log(`New doc:${newDocument}`)
    const result = await db.collection("mmrlSignup").insertOne(newDocument);
    console.log(result);
    res.status(201).send({ message: "User successfully created", user: newDocument });;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error While Adding The User");
  }
});

export default router;
