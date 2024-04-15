const express = require("express");
const authorize = require("../middlewares/authMiddle");
const Account = require("../models/account.model");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authorize, async (req, res) => {
  const acc = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: acc.balance,
  });
});

accountRouter.post("/transfer", authorize, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to    , amount } = req.body;
  const acc = await Account.findOne({ userId: req.userId }).session(session);
  if (!acc || acc.balance < amount) {
    await session.abortTransaction();
    res.status(411).json({
      msg: "insufficient balance ",
    });
  }
  const Toacc = await Account.findOne({ userId: to }).session(session);
  if (!Toacc) {
    await session.abortTransaction();
    res.status(411).json({
      msg: "invalid To account",
    });
  }
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json("Transfer successfull ");
});

module.exports = accountRouter;
