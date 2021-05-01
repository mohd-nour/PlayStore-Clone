const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { cwd } = require("process");
var ObjectId = require("mongodb").ObjectID;

//create an express app
const app = express();

//to be able to use css and js files
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

//connect to database
const mongoAtlasUri =
  "mongodb+srv://user:test12345@cluster0.a2fvo.mongodb.net/playstore?retryWrites=true&w=majority";
mongoose
  .connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose is connected"))
  .catch((error) => {
    console.log(error);
  });

// local community Server for testing
// mongoose.connect("mongodb://localhost:27017/playstoreDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// The following code will be refactored into separate files after testing is completed

// mongoose movie Schema
const movieSchema = {
  title: String,
  mainImage: String,
  yearProduced: String,
  duration: String,
  price: String,
  genre: [
    {
      type: String,
    },
  ],
  video: String,
  description: String,
  actors: String,
  producers: String,
  director: String,
  quality: String,
  audioLanguage: String,
  subtitles: String,
  group: [
    {
      type: String,
    },
  ],
};

// movie model with movies collection
const Movie = mongoose.model("Movie", movieSchema);

// mongoose book Schema
const bookSchema = {
  title: String,
  mainImage: String,
  creator: String,
  date: String,
  genre: [
    {
      type: String,
    },
  ],
  price: String,
  description: String,
  more: String,
  publisher: String,
  pubOn: String,
  pages: String,
  isbn: String,
  features: String,
  bestFor: String,
  language: String,
  group: String,
};

// book model with books collection
const Book = mongoose.model("Book", bookSchema);

// mongoose app Schema
const appSchema = {
  title: String,
  mainImage: String,
  genre: [
    {
      type: String,
    },
  ],
  video: String,
  images: [
    {
      type: String,
    },
  ],
  description: String,
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
  developer: String,
  group: [
    {
      type: String,
    },
  ],
};

// app model with apps collection
const Application = mongoose.model("Application", appSchema);

// mongoose review Schema (schema to be connected to main schemas)
const reviewSchema = {
  type: {
    type: "String",
  },
  totalScore: {
    type: "String",
  },
  total: {
    type: "String",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
};

// app model with apps collection
const Review = mongoose.model("Review", reviewSchema);

// the main page
app.get("/", (req, res) => {
  // fetch all movie documents from movie collection and pass to categories EJS
  Movie.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      // In EJS, use foundItems array and tap into attributes to display in frontend
      res.render("categories", {
        movies: foundItems,
      });
    }
  });
});

app.get("/seemoremov", function (req, res) {
  // finding all documents in movies collection
  Movie.find({}, function (err, movies) {
    // passing array of movies documents to seemoremov.ejs
    res.render("seemoremov", {
      movies: movies,
    });
  });
});

//get selected-app item
app.get("/apps/:id", (req, res) => {
  const id = req.params.id;
  Application.findById({ _id: ObjectId(id) })
    .then((result) => {
      Review.findOne({ type: "app" })
        .then((appReview) => {
          res.render("app", { app: result, review: appReview });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
