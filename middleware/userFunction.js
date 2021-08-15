const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const randString = () => {
    const len = 8;
    let randStr = "";
    for (let i = 0; i < len; i++) {
      const ch = Math.floor(Math.random() * 10 + 1);
      randStr += ch;
    }

    return randStr;
  };

  const uniqueString = randString();

  const hashedPwd = await bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) throw err;
      var user = new User({
        email: email,
        name: username,
        password: hash,
        token: uniqueString,
      });
      user
        .save()
        .then(() => {
          req.flash("flashSuccess", "Hesap başarıyla oluşturuldu.");
          res.redirect("/auth/login");
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
          errorHandler.error(error);
        });
    });
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  const mailOptions = {
    from: "muratcandonmez123@gmail.com",
    to: req.body.email,
    subject: "Real Life Roleplay",
    text: `Press http://localhost:3000/auth/register/${uniqueString} here to verify your email. -Zeiko`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.userList = async (req, res, next) => {
  try {
    const userList = await User.find();
    res.send(userList);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
