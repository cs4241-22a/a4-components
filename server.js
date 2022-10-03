require("dotenv").config();
const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const connectEnsureLogin = require("connect-ensure-login");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");

const sslOptions = {
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/files.craftsteamg.com/fullchain.pem"
  ),
  key: fs.readFileSync(
    "/etc/letsencrypt/live/files.craftsteamg.com/privkey.pem"
  ),
};

app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const UserSchema = new Schema({
  username: String,
  _id: String,
  purchases: [
    {
      item_name: String,
      item_quantity: Number,
      item_cost: Number,
      payment_method: String,
    },
  ],
});
const User = mongoose.model("Person", UserSchema);

mongoose.set("debug", false);
mongoose.connect(process.env.db_url);

var GitHubStrategy = require("passport-github").Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.github_id,
      clientSecret: process.env.github_secret,
      callbackURL: "https://files.craftsteamg.com:4000/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const username = profile.username;
      const id = profile.id;
      let user = await User.findById(id);
      if (user === null) {
        user = new User({ _id: id, username: username, purchases: [] });
        await user.save();
      }
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error.html" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get(
  "/data",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const user = await User.findById(request.user._id);
    response.json(user.purchases);
    response.end();
  }
);

app.post(
  "/submit",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const body = request.body;
    const user = await User.findById(request.user._id);
    user.purchases.push({
      item_name: body.item_name,
      item_quantity: body.item_quantity,
      item_cost: body.item_cost,
      payment_method: body.payment_method,
    });
    await user.save();
    response.end();
  }
);

app.post(
  "/decrease",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const body = request.body;
    const user = await User.findById(request.user._id);
    const purchase = user.purchases.find(
      (listing) => listing._id.toString() === body.id
    );
    if (purchase !== undefined) {
      purchase.item_quantity = parseInt(purchase.item_quantity) - 1;
      if (purchase.item_quantity <= 0) {
        user.purchases.remove(purchase);
      }
    }
    await user.save();
    response.end();
  }
);

app.get("/login", connectEnsureLogin.ensureLoggedOut(), (request, response) => {
  response.sendFile(__dirname + "/public/login.html");
});

app.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use(connectEnsureLogin.ensureLoggedIn(), express.static("dist"));
https.createServer(sslOptions, app).listen(process.env.port);
