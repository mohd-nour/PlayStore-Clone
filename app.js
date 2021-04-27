const express = require("express");
const mongoose = require("mongoose");

//create an express app
const app = express();

//connect to database
const mongoAtlasUri =
  "mongodb+srv://user:test12345@cluster0.a2fvo.mongodb.net/playstore?retryWrites=true&w=majority";
mongoose
  .connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose is connected"))
  .catch((error) => {
    console.log(error);
  });

//to be able to use css and js files
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

//the main page
app.get("/", (req, res) => {
  res.render("categories");
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
