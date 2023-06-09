// handles all the async related errors in express
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel') //user model
const Podcast = require('../model/podcastModel') // podcast model
const generateToken = require('../config/generateToken') // created a jwt token

// create the new user
const registerUser = asyncHandler( async(req, res) => {
  let {name, email, password, pic = process.env.DEFAULT_PROFILE_PIC } = req.body;
  if(pic === "")
   pic = process.env.DEFAULT_PROFILE_PIC;
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

// authorize the user
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("Please enter all the details");
  }

  const user = await User.findOne({email});
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
  else{
    res.status(400);
    throw new Error("email or password is incorrect");
  }
})


//api/user?search="ashish"
const allUsers = asyncHandler(async (req, res)=>{
  const keyword = req.query.search ? {
    $or: [ //creates query to fetch name or email starting with searched key
      { name: { $regex: req.query.search, $options: "i"} },
      { email: { $regex: req.query.search, $options: "i"} },
    ]
  }
  : {};

  // returns all users except current user
  const users = await User.find(keyword).find({ _id: { $ne: req.user_id } });
  res.send(users);

});


const podcastsByArtist = asyncHandler(async (req, res)=> {
 const {u_id} = req.params;
 const podcasts = await Podcast.find({artist: u_id});
 const user = await User.findById(u_id, "-password");
 if(podcasts)
 {
  res.status(200).json({
    artist: user,
    podcasts: podcasts
  })
 }else{
  res.status(400);
    throw new Error("Unable to fetch podcasts");
 }
});


module.exports = {registerUser, authUser, allUsers, podcastsByArtist};
