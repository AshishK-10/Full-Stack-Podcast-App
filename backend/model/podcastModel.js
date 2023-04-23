const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const podcastSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  artist: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  file: {type: String, required: true},
  description: {type: String, required: true},
  views: {type: Number, default: 0},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Podcast', podcastSchema);