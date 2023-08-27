import express from "express";
import cors from "cors";
import { createServer } from "http";
import pool from "./config/db";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = createServer(app);

const PORT = process.env.PORT || 5000;

import("./config/passport");

import userRouter from "./routes/user";
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
