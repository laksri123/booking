import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { sendMail } from "../helper/sendMail.js";
// import { startSession } from "mongoose";
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });

    await newUser.save();
    sendMail(
      email,
      "Welcome to our website",
      `thanku ${username} for regsotering us`
    );
    res.status(200).send("user has been created");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure flag for production
        sameSite: "none", // For cross-site cookie sharing if needed
      })
      .status(200)
      .json({ message: "User has been logged out." });
  } catch (err) {
    next(err);
  }
};

export const check = async (req, res, next) => {
  try {
    console.log("In");
    sendMail(
      "akashmishra15703@gmail.com",
      "Welcome to our website",
      `thanku Akash for regsotering us`
    );
    res.json({ msg: "Ok" });
    console.log("Sent Successfully");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
