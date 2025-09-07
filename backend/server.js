import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routes/routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials : true
}));

app.use(cookieParser()); // cookies
app.use(express.json()); // json fromat

// Routes
app.use("/api", Routes);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});
