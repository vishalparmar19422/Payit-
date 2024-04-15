const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes.js");
const accountRouter = require("./accountRoutes.js");

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
