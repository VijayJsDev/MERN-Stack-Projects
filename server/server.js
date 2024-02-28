import express from 'express';
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from 'cors';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 5050

const app = express();
app.use(cors());
app.use(bodyParser());

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
    const newUser = req.body;
    const insertOneUser = signupCollection.insertOne(newUser);
})
app.listen(PORT, () => {
    console.log(`Backend Express Server Is Running On PORT ${PORT}`)
})