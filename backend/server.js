import express from "express";
import cors from "cors";
import signup from "./routes/signup.js";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/signup", signup);

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
