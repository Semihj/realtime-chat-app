import { app, httpServer } from "./socket/socket.js";
import express from "express";
import authRouter from "./controllers/auth.js";
import messageRouter from "./controllers/message.js";
import userRouter from "./controllers/user.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);


httpServer.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
  
  })