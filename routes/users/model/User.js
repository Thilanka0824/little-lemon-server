const mongoose = require("mongoose");

//-----------------User Schema-----------------
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
