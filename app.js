const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//create an express app
const app = express();

//to be able to use css and js files
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

//connect to database
// const mongoAtlasUri =
//   "mongodb+srv://user:test12345@cluster0.a2fvo.mongodb.net/playstore?retryWrites=true&w=majority";
// mongoose
//   .connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Mongoose is connected"))
//   .catch((error) => {
//     console.log(error);
//   });

// local community Server for testing
mongoose.connect("mongodb://localhost:27017/playstoreDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose movie Schema
const movieSchema = {
  title: String,
  mainImage: String,
  year: String,
  duration: String,
  price: String,
  genre: String,
  video: String,
  desc: String,
  producer: String,
  director: String,
  writer: String,
  more: String,
  quality: String,
  audioLang: String,
  subtitles: String,
  group: String
};

// movie model with movies collection
const Movie = mongoose.model("Movie", movieSchema);

// mongoose book Schema
const bookSchema = {
  title: String,
  mainImage: String,
  creator: String,
  date: String,
  genre: String,
  price: String,
  desc: String,
  more: String,
  publisher: String,
  pubOn: String,
  pages: String,
  isbn: String,
  features: String,
  lang: String,
  bestFor: String,
  group: String
};

// book model with books collection
const Book = mongoose.model("Book", bookSchema);

// mongoose book Schema
const appSchema = {
  title: String,
  genre: String,
  video: String,
  images: [{
    type: String
  }], // to save array
  price: String,
  desc: String,
  more: String,
  updated: String,
  size: String,
  installs: String,
  version: String,
  requires: String,
  content: String,
  elements: String,
  products: String,
  permission: String,
  offeredBy: String,
  dev: String,
  group: String
};

// app model with apps collection
const Application = mongoose.model("Application", appSchema);

// mongoose review Schema (schema to be connected to main schemas)
const reviewSchema = {
  refID: String,
  name: String,
  profile: String,
  rating: [{
    type: String
  }], // to save array
  date: String,
  likes: String,
  review: String,
};

// app model with apps collection
const Review = mongoose.model("Review", reviewSchema);

// Review schema to be embedded in app/book/movie schema as list
// Needs server side code to retrieve linked document


// mongoose user schema
const userSchema = {
  email: String,
  wishlist: [{
    type: String
  }], // array of wishlist IDs
  lastVisited: [{
    type: String
  }], // array of visited IDs
};

// app model with apps collection
const User = mongoose.model("User", Schema);

// the main page
app.get("/", (req, res) => {

  // fetch all movie documents from movie collection and pass to categories EJS
  Movie.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render("categories", {
        movies: foundItems
      });
    }
  });
});

// listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
