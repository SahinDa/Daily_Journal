
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose= require('mongoose');

const homeStartingContent = "List of All Your's Journal  : ";
const dailyJournal="Daily journaling is the act of thinking about your life and writing it down each day. No more, no less. It's surprisingly simple, profoundly powerful and yet hardly anyone does it. I've spoken with many people who scoff at the idea of daily journaling being surprisingly simple."
const contactContent =["Sahin Dafader","sahindafader1919gmail.com","https://github.com/SahinDa","https://www.linkedin.com/in/sahin-dafader-384670203/"];
const importanceDailyJournal=["1. Daily journaling gives you the chance to discover new lessons from past experiences.","2. Daily journaling gives you proof of real progress.","3. Daily journaling gives you evidence of identity transformation."];
const whatToWrite=[ "1.What happened today?","2.How do I feel today?",
"3.How did I sleep last night?","4.What can I be grateful for today?","5.What did I learn today?","6.What is holding me back?",
"7.Who do I need to talk to?","8.What decisions did I make?"]
const whoCreate=["It is a solo Created website Created by Sahin Dafader "]



const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Connecting Database  Mongodb Atlas
// use this to connect local db mongodb://localhost:27017
mongoose.connect("mongodb+srv://MyDreamPlace:Mongodbatlas@cluster0.n6ktkzl.mongodb.net/blogDB", {useNewUrlParser: true});
//Creating a post schema
const postSchema = {
 title: String,
 content: String
};

//creating a model
const Post = mongoose.model("Post", postSchema);


app.get("/",function(req,res){
  Post.find({}, function(err, posts){
   res.render("home", {homeStartingContent: homeStartingContent, posts: posts });
 })
})
app.get("/about",function(req,res){
  res.render("about",{dailyJournal:dailyJournal,importanceDailyJournal : importanceDailyJournal,whatToWrite :whatToWrite,whoCreate :whoCreate})
})
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose")
})
app.get("/posts/:postId", function(req, res){
const requestedPostId = req.params.postId;
      Post.findOne({_id: requestedPostId}, function(err, post){
     res.render("post", {title: post.title, content: post.content});
   });
})

app.post("/",function(req,res){
  const post = new Post ({
  title: req.body.postTitle,
  content: req.body.postBody
   });
   post.save(function(err){
  if (!err){
    res.redirect("/");
  }
});
})

app.post("/delete",function(req,res){
  const checkedPostId=req.body.checkbox;
  Post.findByIdAndRemove(checkedPostId,function(err){
    if(!err){
      //console.log("Successfully Deleted checked item.");
      res.redirect("/");
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
