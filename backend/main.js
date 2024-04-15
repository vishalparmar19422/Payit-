const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectToDb = require("./db/db.js");
const User = require("./models/user.model.js");
const router = require("./routes/routes.js");

const app = express();
dotenv.config();
app.use(cors());  
app.use(express.json());
ConnectToDb();
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("listening to port " + process.env.PORT);
});
