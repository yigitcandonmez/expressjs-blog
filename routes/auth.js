const express = require("express");
const router = express.Router();

const login = require("./auth/login");
const register = require("./auth/register");
const list = require("./auth/list");

// errorHandler
const errorHandler = require("../middleware/errorHandler");

router.get("/", checkAuthentication, function (req, res) {
  //do something only if user is authenticated
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    res.send("Authentication");
    next();
  } else {
    res.redirect("/auth/login");
  }
}

router.use("/login", login);
router.use("/admin", (req, res) => {
  res.render("admin");
});
router.use("/register", register);
router.use("/list", list);
router.use("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
