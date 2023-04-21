const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  pic: {type: String, default: process.env.DEFAULT_PROFILE_PIC},
},
{
  timestamps: true,
})


userSchema.pre('save', async function(next){
  if(!this.isModified('password'))
   return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.matchPassword = async function (entered_password){
  return await bcrypt.compare(entered_password, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;