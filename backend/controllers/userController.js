const asyncHandler = require('express-async-handler') // handles all the async related errors in express
const User = require('../model/userModel') //user modal
const generateToken = require('../config/generateToken') // created a jwt token

const registerUser = asyncHandler( async(req, res) => { // create the new user
  const {name, email, password, pic = process.env.DEFAULT_PROFILE_PIC } = req.body;

  if(!name || !email || !password){
    res.status(400);
    throw new Error("Please enter the fields!");
  }

  const userExists = await User.findOne({email})
  if (userExists){
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }else
    {
      res.status(400);
      throw new Error("Failed to create the user");
    }
});


const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  console.log(email, password)
  if(!email || !password){
    res.status(400);
    throw new Error("Please enter all the details");
  }

  const user = await User.findOne({email});
  console.log("user", user)
  if(user && (await user.matchPassword(password)))
  {
     res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
})

module.exports = {registerUser, authUser};