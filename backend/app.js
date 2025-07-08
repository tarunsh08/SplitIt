import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", expenseRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Split Paying App API is running");
});

export default app;
