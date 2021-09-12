const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const express = require("express");
import webPush from "web-push";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

webPush.setVapidDetails(
  "https://localhost:4000/",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 */

let VAPID_PUBLIC_KEY =
  "BAYDa5mNl7otYaplT47ygBWqdC7GLD-yF2c1yfJm_N3BwyRDRDhqfj_aLBh2z_SZmsBpa779B4mv0BZ75IrdoS0";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("http://localhost:4000/vapidPublicKey", function (req, res) {
  res.send(VAPID_PUBLIC_KEY);
});

app.post("http://localhost:4000/subscribe", function (req, res) {
  const subscription = req.body;
  res.sendStatus(201).json({});
  const payload = JSON.stringify({ title: "Push test" });

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
