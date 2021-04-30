const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const User =  require("./models/user");
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


// The following code will be refactored into separate files after testing is completed

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
  rating: Number, // to save array
  date: String,
  likes: String,
  review: String
};

// app model with apps collection
const Review = mongoose.model("Review", reviewSchema);

// Review schema to be embedded in app/book/movie schema as list
// Main documents need server side scripting to retrieve linked review documents

// mongoose user schema
/*const userSchema = {
  email: String,
  wishlist: [{
    type: String
  }], // array of wishlist IDs
  lastVisited: [{
    type: String
  }], // array of visited IDs
};*/

// app model with apps collection
//const User = mongoose.model("User", userSchema);

//auth, added by omar
app.use(require("express-session")({
  secret:"Any normal Word",//decode or encode session
      resave: false,          
      saveUninitialized:false    
  }));

  passport.serializeUser(User.serializeUser());       //session encoding
  passport.deserializeUser(User.deserializeUser());   //session decoding
  passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded({ extended:true }))
app.use(passport.initialize());
app.use(passport.session());
//

// the main page
app.get("/", (req, res) => {

  // fetch all movie documents from movie collection and pass to categories EJS
  Movie.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      // In EJS, use foundItems array and tap into attributes to display in frontend
      res.render("categories", {
        movies: foundItems
      });
    }
  });
});
//auth by omar
//registration
app.get("/signin", (req, res) => {
  res.render("signin");
});
//
app.post("/signin",passport.authenticate("local",{
  successRedirect:"/",//
  failureRedirect:"/signin"}),
  function (req, res){

  });
//
app.get("/signup", (req, res) => {
  res.render("signup");
});
//
app.post("/signup",(req,res)=>{
    
  User.register(new User({username: req.body.username}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("signup");
      }
      else if(req.body.cpassword != req.body.password){
        res.render("signup");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/signin");//
  })    
  })
})

app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/signin");
});
//
// listen on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
