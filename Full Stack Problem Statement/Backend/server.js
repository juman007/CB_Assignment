import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 4000;

import userRoute from "./routes/productsRoutes.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);

// Connect to MongoDB and start the server
mongoose
   .connect("mongodb://127.0.0.1:27017/assignment")
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is running at http://localhost:${PORT}`);
      });
   })
   .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
   });
