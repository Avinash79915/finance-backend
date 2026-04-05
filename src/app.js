import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import recordRoutes from "./routes/record.routes.js";
import summaryRoutes from "./routes/summary.routes.js";
dotenv.config();

const app = express();
app.use(cors());      
app.use(express.json()); // middleware to parse incoming JSON requests
app.use("/api", recordRoutes);  
app.use("/api", userRoutes);  
app.use("/api", summaryRoutes);

app.get("/", (req, res) => {
  res.send("server is runningnnnnnnnnnnnnn");
});

export default app;