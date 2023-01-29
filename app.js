const express = require("express");
const app = express();
const PORT = 3000;

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index"
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    page_name: "about"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
