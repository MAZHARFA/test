const jwt = require("jsonwebtoken");
require('dotenv').config();


const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(`////////>>>>kkkdewed `, authorization);

  if (!authorization) {
    return res.status(401).json({ Error: "Token not found" });
  }

  // Correctly extract token from "Bearer <token>"
  const token = authorization.split(" ")[1];

  console.log("tokennnnn",token);//debug

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};


//function generte json web token

const generateToken = (userData) => {
  //Generate a jwt token using userdata

  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
 
};

module.exports = { jwtAuthMiddleware, generateToken };


