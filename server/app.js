require('dotenv').config();
const express = require('express'), app = express();
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');

const {router: authRouter, requireAuth} = require("./routes/auth");
const gamesRouter = require("./routes/games");

mongoose.connect(process.env.MONGO_DB_URL).then(
    () => {console.log("Connected to MongoDB")},
)

app.use(cors());
app.use(helmet());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_DB_URL})
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", authRouter);
app.use("/games", requireAuth, gamesRouter);
app.use("/static/css", express.static("public/static/css"));
app.use("/robots.txt", express.static("public/robots.txt"));
app.use("/", requireAuth, express.static("public"));

app.listen(process.env.PORT);


