const asyncHandler = require('express-async-handler') // handles all the async related errors in express
const Podcast = require('../model/podcastModel')
const User = require('../model/userModel')

//fetch all the podcasts
const getAllPodcasts = asyncHandler(async(req, res)=>{
  let podcasts;
  const keyword = req.query.val ? {
    name: { $regex: req.query.val, $options: "i"}
  }
  : {};

  podcasts = await Podcast.find(keyword).sort({views: -1});

  if(podcasts)
  {
  res.status(200).send(podcasts);
  }
  else{
  res.status(400);
  throw new Error("No podcast is present");
}
})

//fetch single podcast based on id
const getPodcast = asyncHandler(async (req, res) => {
  const {p_id} = req.params;
  if(!p_id)
  {
    res.status(400);
    throw new Error("Please enter the podcast id!");
  }

  let podcast = await Podcast.findById(p_id);
  if(podcast){
    let v = podcast.views + 1;
    //incrementing the views count
    podcast = await Podcast.findByIdAndUpdate(p_id, {views: v}).populate("artist", "-password");

    res.status(201).json({
      _id: podcast._id,
      name: podcast.name,
      type: podcast.type,
      artist: podcast.artist,
      file: podcast.file,
      description: podcast.description,
      views: podcast.views,
      likes: podcast.likes,
    });
  }else{
      res.status(400);
      throw new Error("Failed to find the podcast with given id");
    }
})

//create a podcast
const createPodcast = asyncHandler(async (req, res)=>{

 let { name, type, artist, file, description } = req.body;

 if(!name || !type || !artist || !file || !description){
  res.status(400);
  throw new Error("Please enter the fields!");
}

 let views = 0;
 let likes = [];

 const podcast = await Podcast.create({
  name,
  type,
  artist,
  file,
  description,
  views,
  likes
 })

 if(podcast){

  res.status(201).json({
    _id: podcast._id,
    name: podcast.name,
    type: podcast.type,
    artist: podcast.artist,
    file: podcast.file,
    description: podcast.description,
    views: podcast.views,
    likes: podcast.likes,
  });
 }else{
    res.status(400);
    throw new Error("Failed to create podcast");
  }
});

//like and unlike the podcasts
const likedPodcast = asyncHandler(async (req, res) => {
  const {p_id, u_id, choice} = req.body;
  if(!p_id || !u_id || choice < 0 || choice > 1)
  {
    res.status(400);
    throw new Error("Enter all the details!");
  }

  let podcast = await Podcast.findById(p_id);
  if(podcast)
  {
    // remove the like
    if(choice === 0)
    {
      await Podcast.findByIdAndUpdate(p_id ,  { $pull: { "likes": u_id }});
    }
    // add the liked user
    else{
      await Podcast.updateOne({ _id: p_id }, { $push: { "likes": u_id }});
    }
    podcast = await Podcast.findById(p_id);
    if(podcast)
    {
      res.status(201).json({
        _id: podcast._id,
        name: podcast.name,
        type: podcast.type,
        artist: podcast.artist,
        file: podcast.file,
        description: podcast.description,
        views: podcast.views,
        likes: podcast.likes,
      });
    }else{
          res.status(400);
          throw new Error("Failed to update likes");
      }
  }
})

module.exports = {createPodcast, getPodcast, getAllPodcasts, likedPodcast}
