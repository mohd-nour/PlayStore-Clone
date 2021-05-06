const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const nodemailer = require("nodemailer");
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
  .then(() => console.log("Connection to MongoDB established"))
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
  rating: Number,
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
  rating: Number,
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
  rating: Number,
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
  //isLoggedIn,

  const linkArr = [
    "Top-Selling Movies",
    "Business & Investing",
    "Top-selling eBooks",
    "Superhero movies",
  ];

  const topMovies = await Movie.find({
    group: "Top-Selling Movies",
  });
  const bussBooks = await Book.find({
    group: "Business & Investing",
  });
  const topBooks = await Book.find({
    group: "Top-selling eBooks",
  });
  const actionMovies = await Movie.find({
    group: "Superhero movies",
  });

  return res.render("entertainment", {
    topMovies: topMovies,
    bussBooks: bussBooks,
    topBooks: topBooks,
    actionMovies: actionMovies,
    linkArr: linkArr,
  });
});

app.get("/movies", async (req, res) => {
  //isLoggedIn,

  const linkArr = [
    "Top-Selling Movies",
    "New rental movies",
    "Recommended For You",
    "Superhero movies",
  ];

  const linkArr2 = ["Top charts", "New releases"];

  const linkType = "seemoremov";

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

  return res.render("movieCategories", {
    topMovies: topMovies,
    newMovies: newMovies,
    recMovies: recMovies,
    actionMovies: actionMovies,
    linkArr: linkArr,
    linkType: linkType,
    linkArr2: linkArr2,
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
  const linkArr = [
    "Top-selling eBooks",
    "Business & Investing",
    "Deals on eBooks",
    "Fiction & Literature",
  ];

  const linkArr2 = ["Top charts", "New releases"];

  const linkType = "seemorebooks";

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
    linkArr: linkArr,
    linkType: linkType,
    linkArr2: linkArr2,
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

app.get("/searchmoreMovies/:searchStr", (req, res) => {
  const searchStr = req.params.searchStr;

  const regex = new RegExp(escapeRegex(searchStr), "gi");

  // finding all documents in movies collection
  Movie.find(
    {
      $or: [
        {
          title: regex,
        },
        {
          description: regex,
        },
      ],
    },
    function (err, movies) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemoremov", {
        listTitle: "Movies",
        movies: movies,
      });
    }
  );
});

app.get("/searchmoreBooks/:searchStr", (req, res) => {
  const searchStr = req.params.searchStr;

  const regex = new RegExp(escapeRegex(searchStr), "gi");

  // finding all documents in movies collection
  Book.find(
    {
      $or: [
        {
          title: regex,
        },
        {
          description: regex,
        },
      ],
    },
    function (err, books) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemorebooks", {
        listTitle: "Books",
        books: books,
      });
    }
  );
});

app.get("/apps", async (req, res) => {
  const linkArr = [
    "New & Updated Games",
    "Recommended For You",
    "Just Updated",
    "Discover Science",
  ];

  const linkArr2 = ["Top charts", "New releases"];

  const linkType = "seemoreapps";

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
    linkArr: linkArr,
    linkType: linkType,
    linkArr2: linkArr2,
  });
});

app.get("/seemoreApps/:listName", (req, res) => {
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
        apps: apps,
      });
    }
  );
});

app.get("/searchmoreapps/:searchStr", (req, res) => {
  const searchStr = req.params.searchStr;

  const regex = new RegExp(escapeRegex(searchStr), "gi");

  // finding all documents in movies collection
  Application.find(
    {
      $or: [
        {
          title: regex,
        },
        {
          description: regex,
        },
      ],
    },
    function (err, apps) {
      // passing array of movies documents to seemoremov.ejs
      res.render("seemoreapps", {
        listTitle: "Apps",
        apps: apps,
      });
    }
  );
});

app.get("/test", (req, res) => {
  res.render("wishlist");
});

// Fuzzy search functionality
app.get("/search", async (req, res) => {
  const searchStr = req.query.searchStr;

  const regex = new RegExp(escapeRegex(searchStr), "gi");

  const linkArr = ["Movies", "Books", "Apps"];

  const appSearch = await Application.find({
    $or: [
      {
        title: regex,
      },
      {
        description: regex,
      },
    ],
  });
  const bookSearch = await Book.find({
    $or: [
      {
        title: regex,
      },
      {
        description: regex,
      },
    ],
  });
  const movieSearch = await Movie.find({
    $or: [
      {
        title: regex,
      },
      {
        description: regex,
      },
    ],
  });

  return res.render("searchResults", {
    appSearch: appSearch,
    bookSearch: bookSearch,
    movieSearch: movieSearch,
    searchStr: searchStr,
    linkArr: linkArr,
  });
});

//get selected-app item
app.get("/apps/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Application.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      var timestamp = new Date().getTime();
      User.updateOne(
        { _id: req.user._id },
        { $push: { lastVisited: { itemId: id, time: timestamp } } }
      )
        .then((res) => {
          console.log("updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      Review.findOne({
        type: "app",
      })
        .then((appReview) => {
          Application.find({
            group: result.group[0],
          })
            .then((finalRes) => {
              res.render("pages/app", {
                app: result,
                review: appReview,
                similar: finalRes,
              });
            })
            .catch((err) => {
              console.log(err);
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
app.get("/movies/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Movie.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      var timestamp = new Date().getTime();
      User.updateOne(
        { _id: req.user._id },
        { $push: { lastVisited: { itemId: id, time: timestamp } } }
      )
        .then((res) => {
          console.log("updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      Review.findOne({
        type: "movie",
      })
        .then((movReview) => {
          Movie.find({
            group: result.group[0],
          })
            .then((finalRes) => {
              res.render("pages/movie", {
                movie: result,
                review: movReview,
                similar: finalRes,
              });
            })
            .catch((err) => {
              console.log(err);
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

app.get("/books/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;
  Book.findById({
    _id: ObjectId(id),
  })
    .then((result) => {
      var timestamp = new Date().getTime();
      User.updateOne(
        { _id: req.user._id },
        { $push: { lastVisited: { itemId: id, time: timestamp } } }
      )
        .then((res) => {
          console.log("updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      Review.findOne({
        type: "book",
      })
        .then((bookReview) => {
          Book.find({
            group: result.group,
          }).then((finalRes) => {
            res.render("pages/book", {
              book: result,
              review: bookReview,
              similar: finalRes,
            });
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
    },
    passport.authenticate("local")(req, res, function () {
      res.redirect("/signin"); //
      //var usern = req.body.username;
    })
  );
});

app.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});
app.get("/upload", (req, res) => {
  res.render("upload");
});
app.post("/sendemail", isLoggedIn, (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gpstore084@gmail.com",
      pass: "playstore@480",
    },
  });

  var mailOptions = {
    from: "gpstore084@gmail.com",
    to: req.user.username,
    subject: "Cloned Playstore News and Offers",
    text:
      "Starting from now, you will start receiving emails about new releases and offers related to our website. \nYou can stop us from sending such emails whenever you want",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
});
app.post("/stopsendemail", isLoggedIn, (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gpstore084@gmail.com",
      pass: "playstore@480",
    },
  });

  var mailOptions = {
    from: "gpstore084@gmail.com",
    to: req.user.username,
    subject: "Cloned Playstore News and Offers",
    text:
      "You will no longer receive emails about new releases and offers related to our website. \nThe feature has been stopped.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
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

app.get("/lastvisited", isLoggedIn, async (req, res) => {
  User.find({ _id: req.user._id })
    .then(async (result) => {
      var values = req.user.lastVisited.sort((a, b) =>
        a.time < b.time ? 1 : b.time < a.time ? -1 : 0
      );
      const ids = values.map((a) => a.itemId);
      var finalItems = [];
      if (ids.length > 25) {
        ids = ids.slice(0, 26);
      }
      for (var i = 0; i < ids.length; i++) {
        console.log("I am here");
        await Book.findOne({ _id: ids[i] }).then((bookresult) => {
          if (bookresult) {
            finalItems.push(bookresult);
          }
        });
        await Movie.findOne({ _id: ids[i] }).then((movieresult) => {
          if (movieresult) {
            finalItems.push(movieresult);
          }
        });
        await Application.findOne({ _id: ids[i] }).then((appresult) => {
          if (appresult) {
            finalItems.push(appresult);
          }
        });
      }
      console.log(finalItems);
      res.render("lastvisited", { items: finalItems });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/uploadReview", () => {
//   console.log("started ...");
//   console.log("Finished ...");
// });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
