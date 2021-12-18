const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  twitterId: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);
user.createIndexes();
module.exports = user;
