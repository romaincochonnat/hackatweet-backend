var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweet");
const { checkBody } = require("../modules/checkBody");
// const uid2 = require("uid2");
// const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  User.findOne({ token: req.body.token }).then((data) => {
    console.log(data);
    if (data) {
      const newTweet = new Tweet({
        content: req.body.content,
        user: data._id,
      });
      newTweet.save();
      res.json({ result: true, newTweet: newTweet });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.get("/alltweet", (req, res) => {
  Tweet.find().then((data) => {
    console.log(data);
    if (data) {
      res.json({ result: true, tweets: data });
    } else {
      res.json({ result: false, error: "No tweet found" });
    }
  });
});

module.exports = router;
