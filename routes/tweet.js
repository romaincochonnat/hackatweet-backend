var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweet");
const { checkBody } = require("../modules/checkBody");
// const uid2 = require("uid2");
// const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
    User.findOne({ token: req.body.token }).then(data => {
        console.log(data)
        if (data) {
            const newTweet = new Tweet({
                content: req.body.content,
                user: data._id
            })
            newTweet.save()

          res.json({ result: true, data });
        } else {
          res.json({ result: false, error: 'User not found' });
        }

      });
    // recup l'orbject du user grâce au token
    // Utiliser les informations (_id) de l'user pour mettre dans tweet


//   if (!checkBody(req.body, ["firstname", "username", "nblike"])) {
//     res.json({ result: true });
//     return;
//     }
//     const newTweet = new Tweet({
//         firstname: req.body.firstname,
//         username: req.body.username,
//         content: req.body.content,
//         nblike: 0,
//         })
//             newTweet.save().then((newDoc) => {
//                 res.json({ result: true, token: newDoc.token });
        
//             });
        });
        


module.exports = router;