const express = require("express");
const User = require("../models/user.model.js");
const userRoute = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authorize = require("../middlewares/authMiddle.js");
const Account = require("../models/account.model.js");
dotenv.config();

const signupBody = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string(),
});

userRoute.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json("Invalid inputs");
  }
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json("User already exists");
  }

  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  const userId = user._id;
  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.json({
    msg: "user created successfully",
    token,
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

userRoute.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});
const updateUser = zod.object({
  email: zod.string().email().optional(),
  username: zod.string().optional(),
  password: zod.string().optional(),
});

userRoute.put("/", authorize, async (req, res) => {
  const { success } = updateUser.safeParse(req.body);
  if (!success) {
    res.status(411).json("error while updating user");
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});
userRoute.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    username: {
      $regex: filter,
    },
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      email: user.email,
      _id: user._id,
    })),
  });
});

module.exports = userRoute;
