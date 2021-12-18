const express = require("express");
const router = express.Router();
const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;
const User = require("./models/User");
const session = require("express-session");
router.use(passport.initialize());
router.use(passport.session());

router.use(
  session({ secret: "request token", resave: true, saveUninitialized: true })
);

passport.use(
  new Strategy(
    {
      consumerKey: "0SUBZzr5Q6qB3InTPs742TaXZ",
      consumerSecret: "BEnpnvzTuDCgOXv7EsSEt4gTnnAFdEc03AubERhhUbRr45m68q",
      callbackURL: "http://localhost:5000/api/twitter/return",
      // userProfileURL:
      //   "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      // passReqT oCallback: true,
    },
    function (token, tokenSecret, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

//ROUTE 1: Fetch all notes : GET "api/notes/fetchallnotes".  login Req.
// router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth", passport.authenticate("twitter"));

router.get(
  "/return",
  passport.authenticate("twitter", {
    failureRedirect: "/",
  }),
  async (req, res) => {
    res.send(req.user);
  }
);

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

// router.get(
//   "/return",
//   passport.authenticate("twitter", {
//     failureRedirect: "/",
//   })
// );

module.exports = router;
