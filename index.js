import  express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotel.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const connect = async  () => {
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    throw(error);
  }
};

 mongoose.connection.on("disconnected", () =>{
   console.log("disconnected from mongodb");
 })
app.use(cookieParser());
app.use(cors());
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
})
// pLabrS8hCKeu4sJs