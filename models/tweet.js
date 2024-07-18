const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  content: String,
  nblike: {type: Number, default: 0},
  date: Date,
  // hashtag: Array,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;