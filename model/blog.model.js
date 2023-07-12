const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    username: String,
    content: String,
  }],
  userID:String
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;


// "username": "aman",
//     "title": "Be absent",
//     "content": " satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would for their mid-day sleep.",
// 		"category" : "Entertainment",
// 		"date" : "2020-06-01"