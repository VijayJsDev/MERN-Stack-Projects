import express from 'express';
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import session from 'express-session';
const PORT = process.env.PORT || 5050

const app = express();
app.use(cors());
app.use(bodyParser());
app.use(session({secret: process.env.SESSION_SECRET}))
//MongoDB


const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged Your Deployment. You Successfully connected to MongoDB!!"
  );
} catch (err) {
  console.error(err);
}

let db = client.db("mmrl");
let signupCollection = db.collection("mmrlSignup");


const router = express.Router();

app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
      const existingUser = await signupCollection.findOne({ email: email });

      if (existingUser) {
          return res.status(400).json({ message: "Email Already in Use!!" });
      } else {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = { fullname, email, password: hashedPassword };
          const insertedUser = await signupCollection.insertOne(newUser);
          
          req.session.user_id = insertedUser.insertedId;

          return res.status(201).json({ message: "Signup Successfull!!" });
      }
  } catch (error) {
      console.error("Error during signup: ", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
    console.log(`Backend Express Server Is Running On PORT ${PORT}`)
})