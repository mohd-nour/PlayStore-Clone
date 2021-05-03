const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { cwd, resourceUsage } = require("process");
var ObjectId = require("mongodb").ObjectID;
const User = require("./models/user");

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
app.use(
  require("express-session")({
    secret: "Any normal Word", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
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

app.get("/", async (req, res) => {
  const topMovies = await Movie.find({
    group: "Top-Selling Movies",
  });
  const newMovies = await Movie.find({
    group: "New rental movies",
  });
  const recMovies = await Movie.find({
    group: "Recommended For You",
  });
  const actionMovies = await Movie.find({
    group: "Superhero movies",
  });

  return res.render("categories", {
    topMovies: topMovies,
    newMovies: newMovies,
    recMovies: recMovies,
    actionMovies: actionMovies,
  });
});

app.get("/seemoremov/:listName", (req, res) => {
  const listName = req.params.listName;
  // finding all documents in movies collection
  Movie.find(
    {
      group: listName,
    },
    function (err, movies) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemoremov", {
        listTitle: listName,
        movies: movies,
      });
    }
  );
});

app.get("/books", async (req, res) => {
  const topBooks = await Book.find({
    group: "Top-selling eBooks",
  });
  const bussBooks = await Book.find({
    group: "Business & Investing",
  });
  const dealBooks = await Book.find({
    group: "Deals on eBooks",
  });
  const litBooks = await Book.find({
    group: "Fiction & Literature",
  });

  return res.render("bookCategories", {
    topBooks: topBooks,
    bussBooks: bussBooks,
    dealBooks: dealBooks,
    litBooks: litBooks,
  });
});

app.get("/seemorebooks/:listName", (req, res) => {
  const listName = req.params.listName;
  // finding all documents in movies collection
  Book.find(
    {
      group: listName,
    },
    function (err, books) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemorebooks", {
        listTitle: listName,
        books: books,
      });
    }
  );
});

app.get("/apps", async (req, res) => {
  const newApps = await Application.find({
    group: "New & Updated Games",
  });
  const recApps = await Application.find({
    group: "Recommended For You",
  });
  const upApps = await Application.find({
    group: "Just Updated",
  });
  const sciApps = await Application.find({
    group: "Discover Science",
  });

  return res.render("appCategories", {
    newApps: newApps,
    recApps: recApps,
    upApps: upApps,
    sciApps: sciApps,
  });
});

app.get("/seemoreapps/:listName", (req, res) => {
  const listName = req.params.listName;
  // finding all documents in movies collection
  Application.find(
    {
      group: listName,
    },
    function (err, apps) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemoreapps", {
        listTitle: listName,
        books: apps,
      });
    }
  );
});

app.get("/test", (req, res) => {
  res.render("wishlist");
});

//get selected-app item
app.get("/apps/:id", (req, res) => {
  const id = req.params.id;
  Application.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      Review.findOne({
        type: "app",
      })
        .then((appReview) => {
          res.render("pages/app", {
            app: result,
            review: appReview,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get selected movie
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      Review.findOne({
        type: "movie",
      })
        .then((movReview) => {
          res.render("pages/movie", {
            movie: result,
            review: movReview,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  Book.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      Review.findOne({
        type: "book",
      })
        .then((bookReview) => {
          res.render("pages/book", {
            book: result,
            review: bookReview,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
  function (req, res) {}
);
app.get("/signup", (req, res) => {
  res.render("signup");
});
//
app.post("/signup", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("signup");
      } else if (req.body.cpassword != req.body.password) {
        res.render("signup");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/signin"); //
      });
    }
  );
});

app.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});
app.get("/upload", (req, res) => {
  res.render("upload");
});
app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

app.get("/uploadReview", () => {
  let rawdata = fs.readFileSync(__dirname + "/data_files/reviews2.json");
  let data = JSON.parse(rawdata);
  console.log("started ...");
  data.forEach((review) => {
    let rev = Review(review);
    rev.save();
  });
  console.log("Finished ...");
});

// listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
//dhsajsnsak
