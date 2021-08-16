const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const env = require("dotenv");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userSchema");
const Post = require("./models/blogPost");

// Flash Middlewares
app.use(cookieParser("passport"));
app.use(
  session({
    cookie: { maxAge: 600000 },
    resave: true,
    secret: "passport",
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(function (req, res, next) {
  res.locals.message = req.flash();

  //Passport Flash
  res.locals.user = req.user;
  next();
});

// Mongo DB
const mongoDB = process.env.MONGODB;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Succesfull Connection"))
  .catch((error) => errorHandler.error(error));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Router
const auth = require("./routes/auth");
const post = require("./routes/post");
app.use("/auth", auth);
app.use("/post", post);

// Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/post", express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).limit(5).exec();
    res.render("index", { posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).send("hata");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
