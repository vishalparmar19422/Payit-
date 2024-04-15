

const mongoose = require("mongoose");
const ConnectToDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to data base" + error);
    throw error;
  }
};
module.exports = ConnectToDb;
