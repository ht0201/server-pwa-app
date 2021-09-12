const bodyParser = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 */
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

let VAPID_PUBLIC_KEY =
  "BNjG5LYLWqs_UYNe5SfI9pYBT28f3AXsHtpdo5RYgAK3bojf_4p5eahl_Q63_hVs7vxQLTaH7aKT0OBLN_B4eS8";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/vapidPublicKey", function (req, res) {
  res.send(VAPID_PUBLIC_KEY);
});

app.post("/subscribe", function (req, res) {
  const subscription = req.body;
  res.sendStatus(201).json({});
  const payload = JSON.stringify({ title: "Push test" });

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
