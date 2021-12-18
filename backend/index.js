const express = require("express");
const cors = require("cors");
const passport = require("passport");
const Strategy = require("passport-twitter");
const connectToMongo = require("./db");
connectToMongo();
const app = express();
const port = 5000;
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
// avalible routes
app.use("/api/twitter/", require("./routes/twitter"));

// app.get("/api/twitter/return", async (req, res) => {
//   try {
//     console.log(res);
//     console.log(req);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error " });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
