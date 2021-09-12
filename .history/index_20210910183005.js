const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const express = require("express");
const webPush = require("web-push");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

let VAPID_PUBLIC_KEY =
  "BLasgMQ8HXhD5llc0p-RARMUHjarOEv84CQh2acwoX8CzjsmqCB-mDcYBx1Yv-YE9WwmfPphdDe9xEbW0pMU81w";

let VAPID_PRIVATE_KEY = "MO-_dc9xsL1t0M4YP9tyuiDSP_y397CX9GuXwfWuLsk";

webPush.setVapidDetails(
  "mailto:t.hoang201@@gmail.com/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
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

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/vapidPublicKey", function (req, res) {
  console.log(res);
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
