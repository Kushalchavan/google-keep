import express from "express";
import {
  getUserInfo,
  loginUser,
  signupUser,
} from "../controller/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
router.get("/user", verifyJwt, getUserInfo);

export default router;
