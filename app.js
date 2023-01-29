const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");

const app = express();
const PORT = 3000;

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
mongoose

// ROUTES
app.use("/", pageRoute);

// DATABASE CONNECTION
mongoose.connect(
  "mongodb://127.0.0.1:27017/smartEdu",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) console.log(err);
    console.log("Database connected");
  }
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
