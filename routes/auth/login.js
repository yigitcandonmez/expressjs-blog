const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      User.findOne({ name: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(
            null,
            false,
            req.flash("message", "Kullanıcı adı bulunamadı.")
          );
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(
              null,
              user,
              req.flash("message", "Giriş başarıyla gerçekleşti.")
            );
          } else {
            return done(null, false, req.flash("message", "Parola yanlış."));
          }
        });
      });
    }
  )
);

router.get("/", (req, res, next) => {
  res.render("login", { messages: req.flash("message") });
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    successFlash: true,
  })(req, res, next);
});

module.exports = router;
