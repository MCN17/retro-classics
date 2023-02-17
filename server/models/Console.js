const mongoose = require("mongoose");

const { Schema } = mongoose;

const consoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Console = mongoose.model("Console", consoleSchema);

module.exports = Console;