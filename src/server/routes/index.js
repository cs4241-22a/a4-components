const router = require("express").Router();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

router.use("/api", bodyParser.json(), morgan("tiny"), require("./api"));

module.exports = router;
