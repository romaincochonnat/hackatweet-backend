var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweet");
const { checkBody } = require("../modules/checkBody");
// const uid2 = require("uid2");
// const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  User.findOne({ token: req.body.token }).then((data) => {
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

router.delete("/", (req, res) => {
  Tweet.deleteOne({ content: req.body.content }).then((data) => {
    if (data) {
      res.json({ result: true, message: "tweet deleted" });
    } else {
      res.json({ result: false, error: "tweet not deleted" });
    }
  });
});

router.post("/like", (req, res) => {
  Tweet.updateOne({ content: req.body.content }, { $inc: { nblike: 1 } }).then(
    (data) => {
      if (data) {
        res.json({ result: true, message: "tweet liked" });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});
router.post("/unlike", (req, res) => {
  Tweet.updateOne({ content: req.body.content }, { $inc: { nblike: -1 } }).then(
    (data) => {
      if (data) {
        res.json({ result: true, message: "tweet unliked" });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

router.get("/alltweet", (req, res) => {
  Tweet.find()
    .populate("user")
    .then((data) => {
      if (data) {
        res.json({ result: true, tweets: data });
      } else {
        res.json({ result: false, error: "No tweet found" });
      }
    });
});

router.post("/nblike", (req, res) => {
  Tweet.findOne({ content: req.body.content })
    .populate("user")
    .then((data) => {
      if (data) {
        res.json({ result: true, nblike: data.nblike });
        console.log(data.nblike);
      } else {
        res.json({ result: false, error: "No tweet found" });
      }
    });
});

module.exports = router;
