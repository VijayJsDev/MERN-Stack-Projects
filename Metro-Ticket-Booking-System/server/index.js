import json from "body-parser";
import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";

//authRoutes
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(json()); // Use json() middleware from body-parser
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});
