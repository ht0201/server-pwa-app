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
  "BBYv_6CDFrsQlljHZQd4SlcZNNt-V8fKNRHNmqe6tWJxV2yLzBg0jl8-FVPYWzz4hixZgdodBzh1WYf-QYHYTKo";

let VAPID_PRIVATE_KEY = "gJXE0oxNZL24kTbudnBRdvBBY5WsDhSSSBq58DM_V60";

webPush.setVapidDetails(
  "mailto:t.hoang201@@gmail.com/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/vapidPublicKey", function (req, res) {
  res.send(VAPID_PUBLIC_KEY);
});

app.post("/subscribe", function (req, res) {
  const payload = JSON.stringify({ title: "Push test" });

  const subscription = req.body;
  //   res.sendStatus(201).json({});

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
