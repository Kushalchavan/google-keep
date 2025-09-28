import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/db.js";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/note", noteRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectDb();
});
