import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
    });

    const user = await newUser.save();
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json("User not found");
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json("Invalid password");
    if (validPassword) {
      const token = jwt.sign({user:user._id},process.env.JWT_SECRET);
      res.cookie("user",token) 
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    }
 
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
