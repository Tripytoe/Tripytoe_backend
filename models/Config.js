const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConfigSchema = new Schema({
  profile_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Config", ConfigSchema);
