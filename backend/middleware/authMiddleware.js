const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const { decode } = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next)=> {
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
  {
    try {
      token = req.headers.authorization.split(" ")[1]; // 0: bearer 1: token
       // decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if(!token)
  {
    res.status(401);
    throw new Error("Not authorized");
  }
})

module.exports = { protect };