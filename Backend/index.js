import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import taskmodel from "./model/taskmodel.js";
import dotenv from "dotenv" ;
import taskrouter from "./routes/task.js";
import userrouter from "./routes/user.js";

const app = express();
//const server = http.createServer(app);

const port = 8000;
  
dotenv.config();

const dburl =  "mongodb://127.0.0.1:27017/TodoList"

// app.use(cors({
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }))
app.use(cors())
app.use(express.json());

async function connectDatabase() {
  try {
    await mongoose.connect(dburl);
    console.log("Database is connected.");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

connectDatabase();

app.use("/auth",userrouter)
app.use("/task",taskrouter)

app.listen(port, async () => {
  console.log("Server has started");
});
