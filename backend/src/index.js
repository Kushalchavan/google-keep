import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { connectDb } from "./db/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectDb();
});
