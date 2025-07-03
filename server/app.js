import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import User from "./models/user.models.js";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(userRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB is Connected"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
