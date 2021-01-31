//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const homeStartingContent = "Read the latest technology news and interesting research breakthroughs on Bloggers Hunt. Discover recent technology news articles on topics such as Nanotechnology, Artificial Intelligence, Biotechnology, Graphene, Green Tech, Battery Tech, Computer Tech, Engineering, and Fuel-cell Tech featuring research out of MIT, Cal Tech, Yale, Georgia Tech, Karlsruhe Tech, Vienna Tech, and Michigan Technological University.";
const aboutContent = "Bloggers Hunt offers the best intelligent, informed science and technology coverage and analysis you can find on a daily basis, sourcing a huge range of great writers and excellent research institutes. It was founded by Nirdesh Kumar Saini. The idea was to link to the most thought-provoking, well researched online items in the world of science and technology.";
const contactContent = "To connect with the Bloggers Hunt, Please fill the form given below. We will reach you shortly";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connecting project to the database with the help of mongoose //

mongoose.connect("mongodb+srv://admin-Nirdesh:Nirdesh123@cluster0.zaq81.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// creating postSchema //

const postSchema = {
    title: String,
    content: String
};

// Rendering Home Page to the user //

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

    Post.find({}, function(err, posts){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
  });

// compose post //

app.get('/compose', function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  });

// post request //

app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          title: post.title,
          content: post.content
        });
      });
    });

// about page //

app.get('/about', function(req, res){
    res.render("about", {aboutContent: aboutContent });
});

// contact page //

app.get('/contact', function(req, res){
    res.render("contact", {contactContent: contactContent });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}

app.listen(port, function(){
    console.log("Server Started successfully");
});