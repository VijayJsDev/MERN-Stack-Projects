import { MongoClient, ServerApiVersion } from "mongodb";

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

export default db;
