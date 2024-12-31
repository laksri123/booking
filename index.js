import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotel.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongodb");
});
const corsOptions = {
  origin: "https://gleaming-parfait-57f067.netlify.app", // Allow only this origin
  methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
  credentials: true, // Allow cookies and credentials
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("connedted to port!!");
});
// pLabrS8hCKeu4sJs
