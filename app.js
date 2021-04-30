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
  yearProduced: String,
  duration: String,
  price: String,
  genre: [{
    type: String
  }],
  video: String,
  description: String,
  actors: String,
  producers: String,
  director: String,
  quality: String,
  audioLanguage: String,
  subtitles: String,
  group: [{
    type: String
  }]
};

// movie model with movies collection
const Movie = mongoose.model("Movie", movieSchema);

// Test movie object
const movie1 = new Movie({
  title: "The Shallows",
  mainImage: "https://play-lh.googleusercontent.com/RlzFjXfaYgU2yqhbnY6AE3N4puRb53S2AdFTo8A7NlCgn2cqfWcN0atfdRagHipHR6aA=w200-h300-rw",
  yearProduced: "2016",
  duration: "86 minutes",
  price: "LBP 16,000 Buy",
  genre: ["Drama"],
  video: "https://play.google.com/video/lava/web/player/yt:movie:wYboAQqILJY?autoplay=1&embed=play",
  description: "In the taut thriller, when Nancy (Blake Lively) is surfing on a secluded beach, she finds herself on the feeding ground of a great white shark. Though she is stranded only 200 yards from shore, survival proves to be the ultimate test of wills, requiring all of Nancys ingenuity, resourcefulness, and fortitude.",
  actors: "Blake Lively, scar Jaenada",
  producers: "Lynn Harris, Matti Leshem",
  director: "scar Jaenada",
  quality: "78%",
  audioLanguage: "English [5.1]",
  subtitles: "Chinese (Simplified), Chinese (Traditional), Czech, Danish, Dutch, English (United Kingdom) [CC], English [CC], Finnish, Greek, Hungarian, Icelandic, Norwegian, Polish, Portuguese (Portugal), Slovak, Slovenian, Spanish (Latin America), Swedish, Thai, Turkish, Ukrainian",
  group: ["Recommended For You", "Thrilling movies", "Superhero movies"]
});

// movie1.save();

// mongoose book Schema
const bookSchema = {
  title: String,
  mainImage: String,
  creator: String,
  date: String,
  genre: [{
    type: String
  }],
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
  group: String
};

// book model with books collection
const Book = mongoose.model("Book", bookSchema);

// Test book object
const book1 = new Book({
  title: "Blackbird",
  mainImage: "https://books.google.com/books/publisher/content/images/frontcover/y-JuDwAAQBAJ?fife=w200-h300",
  creator: "Sam Humphries",
  date: "Oct 2018",
  genre: ["Sam Humphries"],
  price: "Free ebook",
  description: "An all-new ongoing series from fan-favorite writer SAM HUMPHRIES (Harley Quinn, Nightwing) and red-hot artist JEN BARTEL! In this neo-noir fantasy, Nina Rodriguez is positive that a secret magic world ruled by ruthless cabals is hiding just beneath the veneer of Los Angeles. The problem: everyone thinks shes crazy. The bigger problem: she's not crazy she's right. Can she unravel the mystery before the Great Beast catches up with her?",
  more: "Smartphones and TabletsInstall the Google Play Books app for Android and iPad/iPhone. It syncs automatically with your account and allows you to read online or offline wherever you are.Laptops and ComputersYou can read books purchased on Google Play using your computer's web browser.eReaders and other devicesTo read on e-ink devices like the Sony eReader or Barnes & Noble Nook, you'll need to download a file and transfer it to your device. Please follow the detailed Help center instructions to transfer the files to supported eReaders.",
  publisher: "Image Comics",
  pubOn: "Oct 3, 2018",
  pages: "32",
  isbn: "Original pages",
  features: "Android 3.0+ tablet",
  bestFor: "English",
  language: "Comics & Graphic Novels / Fantasy",
  group: "Self-Help eBooks"
});

// book1.save()

// mongoose app Schema
const appSchema = {
  title: String,
  mainImage: String,
  genre: [{
    type: String
  }],
  video: String,
  images: [{
    type: String
  }],
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
  group: [{
    type: String
  }]
};

// app model with apps collection
const Application = mongoose.model("Application", appSchema);

// Test app object
const app1 = new Application({
  title: "Family Farm Adventure",
  mainImage: "https://play-lh.googleusercontent.com/kFwF8Y2Ve0YRodzWIVWvz15lwfoZMPvTcJRcReO_hKyqVzTHDe9VCBU4SyxnsbOn2A=s180",
  genre: ["Century Games Pte. Ltd.", "Simulation"],
  video: "https://www.youtube.com/embed/-UwX0HkFQyI?ps=play&vq=large&rel=0&autohide=1&showinfo=0",
  images: [],
  description: "Family Farm Adventure is an exciting game of exploration and farming! Pack your bags and roll up your sleeves. Start your journey in Family Farm Adventure!Family Farm Adventure features:- Explorations. Explore a mysterious wild tropical island with the fearless photographer Felicia and archaeologist Toby on their quest to solve every puzzle.- Decorations. Decorate your flower farm! Restore the houses, decorations, and centerpieces that are essential for the Festival of Flowers. Celebrate this event with everyone.- Farming. Farm on a tropical island. Harvest crops, raise animals, and prepare food.- Adventures. Complete challenging quests and take part in the adventures of Felicia as she travels through mysterious islands.- People and Animals. Meet friendly and unique people, as well as quirky wild animals.- Treasures. Collect rare sets of treasures and ancient artifacts, then trade them to get rich.Enjoying Family Farm Adventure? Join our Facebook Fan Page: https://www.facebook.com/FamilyFarmAdventure",
  more: "New maps!- Visit the Icicle Maze & The OasisNew: Daily Tasks!- Check out the daily tasks for more things you can do! These tasks will bring more fun to your game and will give you some rewards along the way!Gameplay experience optimizations- Never worry about your Gems anymore! A Gems confirmation panel has been added.- Re-arranging your farm is more convenient than ever! The Edit mode has been optimized for a smoother gaming experience!",
  updated: "April 26, 2021",
  size: "147M",
  installs: "1,000,000+",
  version: "1.4.210",
  requires: "5.0 and up",
  content: "EveryoneLearn more",
  elements: "In-Game Purchases",
  products: "$0.99 - $99.99 per item",
  permission: "View details",
  offeredBy: "Flag as inappropriate",
  developer: "Century Games Pte. Ltd.",
  group: ["New & Updated Games", "Recommended For You"]
});

// app1.save()

// mongoose review Schema (schema to be connected to main schemas)
const reviewSchema = {
  refID: String,
  totalScore: String,

  name: String,
  profile: String,
  stars: Number, // to save array
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
