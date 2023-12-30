// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const isDateValid = (() => {
    let date = req.params.date;

    return !isNaN(new Date(date))
      ? new Date(date)
      : !isNaN(new Date(Number(date)))
      ? new Date(Number(date))
      : false;
  })();

  if (!isDateValid) {
    res.json({
      error: "Invalid Date",
    });
  }

  res.json({
    unix: Math.floor(isDateValid.getTime()),
    utc: isDateValid.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
