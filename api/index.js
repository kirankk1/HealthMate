import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import myMedicineRoutes from "./routes/myMedicineRoute.js";
import cookieParser from "cookie-parser";
// import path from "path";
import cors from 'cors';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });




app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/myMedicines", myMedicineRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
