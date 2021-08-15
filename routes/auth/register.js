const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const User = require("../../models/userSchema");
const errorHandler = require("../../middleware/errorHandler");
const userFunction = require("../../middleware/userFunction");

router.get("/", (req, res, next) => {
  res.render("register");
  next();
});

router.post("/", userFunction.createUser);
router.get("/:uniqueString", async (req, res) => {
  const { uniqueString } = req.params;
  const userType = { userType: "validUser" };
  const user = await User.findOneAndUpdate({ token: uniqueString }, userType, {
    returnOriginal: false,
  });
  if (user) {
    req.flash("flashSuccess", "Hesabınız aktive edildi.");
    return res.redirect("/");
  } else {
    res.json("Kullanıcı bulunamadı");
  }
});

module.exports = router;
