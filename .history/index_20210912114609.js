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
  "BGfOuB77WPqcWtWsLLc6jKt6zLKsWD0t6gXu60bdcb0qXWKlXpOeo61J8pa4_JoFuhN1PhtsqOmp0M3gvRYmdIE";

let VAPID_PRIVATE_KEY = "qoSv1EAKstNI-OUjRxFT_CG_tTEkz1HFtwCBJY7zteI";

webPush.setVapidDetails(
  "mailto:t.hoang201@@gmail.com/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/vapidPublicKey", function (req, res) {
  res.send(VAPID_PUBLIC_KEY);
});

app.post("http://localhost:4000/subscribe", function (req, res) {
  const payload = JSON.stringify({ title: "Push test" });
  const subscription = req.body;
  res.sendStatus(201).json({});

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
