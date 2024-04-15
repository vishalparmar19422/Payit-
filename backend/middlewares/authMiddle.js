const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;

    const token = tokenString.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("errro in authorization");
    throw error;
  }
};

module.exports = authorize;
