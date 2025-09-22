import User from "../model/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user ", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    res.status(200).json({ id: user._id, user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing user ", error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user info ", error: error.message });
  }
};
