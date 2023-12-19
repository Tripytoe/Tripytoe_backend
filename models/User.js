const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  profile: {
    type: String,
  },
  googleId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  mobile_no: {
    type: Number,
  },
  whatsapp_status: {
    type: Boolean,
    default: false,
  },
  whatsapp_no: {
    type: Number,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
